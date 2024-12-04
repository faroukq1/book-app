import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import RenderSingleBook from "../component/RenderSingleBook";
const RenderBooks = ({ books }) => {
  return (
    <ScrollView>
      {books.map((book, index) => {
        return <RenderSingleBook {...book} key={index} />;
      })}
    </ScrollView>
  );
};

export default RenderBooks;
