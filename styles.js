import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  pageTitle: {
    fontFamily: "Helvetica",
    fontSize: 35,
    fontWeight: "bold",
    color: "#000050",
    margin: 20,
  },
  articleGallery: {
    marginTop: 10,
    marginBottom: 20,
  },
  articleGalleryImage: {
    width: 360,
    height: 240,
    borderRadius: 20,
    alignSelf: "center",
  },
  articleGalleryTitle: {
    marginTop: 10,
    fontFamily: "Helvetica",
    fontSize: 30,
    fontWeight: "bold",
    color: "#000050",
    alignSelf: "center",
  },
  articleGalleryInfo: {
    marginTop: 10,
    fontFamily: "Helvetica",
    fontSize: 15,
    fontStyle: "italic",
    color: "#000050",
    alignSelf: "center",
  },
  articleContainer: {
    padding: 20,
  },
  articleContent: {
    fontFamily: "Helvetica",
    fontSize: 18,
    color: "#000050",
    marginTop: 20,
  },
});

export default styles;