import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ActivityIndicator } from "react-native-web";
import { myNameVar } from "../apollo";
import { logUserOut } from "../apollo";

const PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      username
      email
      name
      location
      avatarURL
      githubUsername
    }
  }
`;

export default function Profile() {
  const myName = useReactiveVar(myNameVar);
  const { data, loading } = useQuery(PROFILE_QUERY, {
    variables: {
      username: myName,
    },
  });
  const getQueryData = data["seeProfile"];

  return (
    <>
      {loading ? null : (
        <>
          <View
            style={{
              backgroundColor: "black",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              resizeMode="cover"
              source={{ uri: getQueryData.avatarURL }}
            />
            <Text style={{ color: "white" }}>{getQueryData.username}</Text>
            <Text style={{ color: "white" }}>{getQueryData.email}</Text>
            <Text style={{ color: "white" }}>{getQueryData.name}</Text>
          </View>
          <TouchableOpacity onPress={logUserOut}>
            <View>
              <Text>log out</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </>
  );
}
