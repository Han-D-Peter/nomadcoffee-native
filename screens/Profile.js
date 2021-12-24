import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React from "react";
import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-web";
import { myNameVar } from "../apollo";

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
  const getQueryValue = data["seeProfile"];

  return (
    <>
      {loading ? null : (
        <View
          style={{
            backgroundColor: "black",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>{getQueryValue.email}</Text>
          <Text style={{ color: "white" }}>{getQueryValue.name}</Text>
          <Text style={{ color: "white" }}>{getQueryValue.location}</Text>
        </View>
      )}
    </>
  );
}
