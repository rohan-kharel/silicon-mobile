import { Text, SafeAreaView, StyleSheet, Image, View, Feather} from 'react-native';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <Text>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Image style={styles.logo} source={require("../assets/logo-light.png")} />
            <Text style={styles.logoText}>The Silicon</Text>
        </View>
    </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    alignItems: "center",
  },
  logo: {
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
    width: 100,
    height: 100,
  },
  logoText: {
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
    fontFamily: 'Helvetica',
    fontSize: 30,
    fontWeight: 'bold',
    color: "#000050",
  }
});
