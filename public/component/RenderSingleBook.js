import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import bookImage from "../assets/book.jpg";
import { customFetch } from "../util/customFetch";
import { useGlobalContext } from "../contextapi/useGlobalContext";
const { width } = Dimensions.get("window");

const RenderSingleBook = ({
  Annee,
  codeL,
  nbexp,
  nom,
  prenom,
  qtedisp,
  titre,
}) => {
  const { triggerRefresh } = useGlobalContext();
  const removeBook = async () => {
    try {
      await customFetch.delete(`/api/books/${codeL}`);
      console.log("book has been deleted");
      triggerRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{titre}</Text>
      <Image source={bookImage} style={styles.image} />
      <Text style={styles.author}>{`${prenom} ${nom}`}</Text>
      <Text style={styles.year}>Year: {Annee}</Text>
      <Text style={styles.details}>Number of Copies: {qtedisp}</Text>
      <Text style={styles.details}>Number of Copies Available: {nbexp}</Text>
      <TouchableOpacity onPress={removeBook} style={styles.button}>
        <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
          delete
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1f1f1f",
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    width: width - 40,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f0f0f0",
    marginBottom: 10,
  },
  image: {
    marginRight: 20,
    paddingVertical: 30,
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 5,
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: "#dcdcdc",
    marginBottom: 10,
  },
  year: {
    fontSize: 14,
    color: "#a8a8a8",
  },
  details: {
    fontSize: 12,
    color: "#a8a8a8",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#d9534f", // Red color for a danger action
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    elevation: 3, // Adds shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  text: {
    color: "#fff", // White color for the text
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RenderSingleBook;
