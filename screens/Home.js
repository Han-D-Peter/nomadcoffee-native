import { useReactiveVar } from "@apollo/client";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { myNameVar, tokenVar } from "../apollo";

export default function Home() {
  const myName = useReactiveVar(myNameVar);
  const token = useReactiveVar(tokenVar);

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={() => console.log(myName, token)}>
        <Text style={{ color: "white" }}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}
