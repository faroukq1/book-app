import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect } from "react";
import RenderBooks from "../component/RenderBooks";
import { useGlobalContext } from "../contextapi/useGlobalContext";

const BookScreen = () => {
  const { books, triggerRefresh, refrech } = useGlobalContext();

  useEffect(() => {
    triggerRefresh();
  }, [refrech]);

  return (
    <View style={styles.container}>
      <Button title="Refresh Books" onPress={triggerRefresh} />
      {books.length === 0 ? (
        <Text style={styles.text}>There are no books</Text>
      ) : (
        <RenderBooks books={books} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flex: 1,
    flexDirection: "column-reverse",
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#E0E0E0",
    fontSize: 24,
  },
});

export default BookScreen;
