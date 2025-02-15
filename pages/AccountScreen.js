import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail, deleteUser, updateEmail, updatePassword } from '../firebaseConfig';
import { db, collection, getDocs, doc, getDoc, updateDoc, deleteDoc, query, where } from '../firebaseConfig';
import Header from '../components/Header.js';
import ScreenWrapper from '../components/ScreenWrapper.js';
import { signOut } from 'firebase/auth';

function AccountScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      getName().then(setName);
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      Alert.alert('Login Successful', `Welcome ${userCredential.user.email}`);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      Alert.alert('Logout Successful');
    } catch (error) {
      Alert.alert('Logout Failed', error.message);
    }
  };

  const handleEditAccount = async () => {
    try {
      if (newEmail) {
        await updateEmail(auth.currentUser, newEmail);
        setEmail(newEmail);
      }
      if (newPassword) {
        await updatePassword(auth.currentUser, newPassword);
      }
      setIsEditing(false);
      Alert.alert('Account Updated', 'Your account details have been updated.');
    } catch (error) {
      Alert.alert('Update Failed', error.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Password Reset', 'Password reset email sent.');
    } catch (error) {
      Alert.alert('Password Reset Failed', error.message);
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account? Deleting your account will also delete all of your comments. This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const userId = auth.currentUser.uid;
              const userRef = doc(db, "users", userId);

              // Get the user's data to find the username
              const userSnap = await getDoc(userRef);
              if (!userSnap.exists()) {
                alert('User not found.');
                return;
              }
              const userData = userSnap.data();
              const username = userData.name;

              // Delete all comments made by the user
              const articlesSnapshot = await getDocs(collection(db, "articles"));
              for (const articleDoc of articlesSnapshot.docs) {
                const commentsQuery = query(collection(db, `articles/${articleDoc.id}/comments`), where("authorName", "==", username));
                const commentsSnapshot = await getDocs(commentsQuery);
                for (const commentDoc of commentsSnapshot.docs) {
                  await deleteDoc(commentDoc.ref);
                }
              }

              // Delete the user
              await deleteUser(auth.currentUser);
              setUser(null);
              Alert.alert('Account Deleted', 'Your account has been deleted.');
            } catch (error) {
              Alert.alert('Account Deletion Failed', error.message);
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  async function getName() {
    const userID = auth.currentUser.uid;
    const Name = await getDoc(doc(db, 'users', userID));
    return Name.data().name;
  }

  return (
    <ScreenWrapper>
      <Header />
      <View style={styles.container}>
        {user ? (
          <>
            <Text style={styles.welcomeText}>Welcome, {name}</Text>

            {isEditing ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="New Email"
                  value={newEmail}
                  onChangeText={setNewEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholder="New Password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleEditAccount}>
                  <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setIsEditing(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.subHeading}>Account details</Text>
                <Text style={styles.accountDetails}>Name: {name}</Text>
                <Text style={styles.accountDetails}>Email: {user.email}</Text>
                <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
                  <Text style={styles.buttonText}>Edit account details</Text>
                </TouchableOpacity>

                <Text style={styles.subHeading}>Account options</Text>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                  <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
                  <Text style={styles.buttonText}>Forgot password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.badButton} onPress={handleDeleteAccount}>
                  <Text style={styles.badButtonText}>Delete account</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        ) : (
          <>
            <Text style={styles.welcomeText}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  welcomeText: {
    fontFamily: "Helvetica",
    fontSize: 30,
    fontWeight: "bold",
    color: "#000050",
    marginBottom: 20,
  },
  subHeading: {
    fontFamily: "Helvetica",
    fontSize: 25,
    fontWeight: "bold",
    color: "#000050",
    marginBottom: 10,
  },
  smallText: {
    fontFamily: "Helvetica",
    fontSize: 20,
    color: "#000000",
    margin: 20,
  },
  accountDetails: {
    fontFamily: "Helvetica",
    fontSize: 18,
    color: "#000000",
    marginBottom: 10,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#000050",
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  badButton: {
    backgroundColor: "#C41E3A",
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  badButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default AccountScreen;