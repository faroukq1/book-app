import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { customFetch } from "../util/customFetch";
import { useGlobalContext } from "../contextapi/useGlobalContext";

const HomeScreen = () => {
  const [codeA, setCodeA] = useState("");
  const [titre, setTitre] = useState("");
  const [annee, setAnnee] = useState("");
  const [nbexp, setNbexp] = useState("");
  const [qtedisp, setQtedisp] = useState("");
  const [message, setMessage] = useState("");
  const [authors, setAuthors] = useState([]);
  const { triggerRefresh } = useGlobalContext();
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await customFetch("/api/autors");
        const data = response.data;
        console.log(data[0].nom);
        setAuthors(data);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setMessage("Failed to load authors.");
      }
    };

    fetchAuthors();
  }, []);

  const handleAddBook = async () => {
    try {
      const response = await customFetch.post("/api/books", {
        codeA: parseInt(codeA),
        titre,
        annee: parseInt(annee),
        nbexp: parseInt(nbexp),
        qtedisp: parseInt(qtedisp),
      });
      if (response.status === 201) {
        setMessage(response.data.message);
        // Clear input fields after successful submission
        setCodeA("");
        setTitre("");
        setAnnee("");
        setNbexp("");
        setQtedisp("");
      } else {
        setMessage(`Error: ${response.data.message}`);
      }
      triggerRefresh();
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Book</Text>
      <Picker
        selectedValue={codeA}
        style={styles.input}
        onValueChange={(itemValue) => setCodeA(itemValue)}
      >
        <Picker.Item label="Select Author" value="" />
        {authors.map(({ codeA, nom }) => (
          <Picker.Item key={codeA} label={`${nom}`} value={codeA} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={titre}
        onChangeText={setTitre}
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={annee}
        onChangeText={setAnnee}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Copies"
        value={nbexp}
        onChangeText={setNbexp}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity Available"
        value={qtedisp}
        onChangeText={setQtedisp}
        keyboardType="numeric"
      />
      <Button title="Add Book" onPress={handleAddBook} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#121212",
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    color: "#f0f0f0",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#333333",
    color: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  message: {
    marginTop: 20,
    color: "#d9534f", // Red color for error messages
    fontSize: 16,
  },
});

export default HomeScreen;
