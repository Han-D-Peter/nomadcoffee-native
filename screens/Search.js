import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import {
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useForm } from "react-hook-form";
import DismissKeyboard from "../components/DismissKeyboard";
import styled from "styled-components/native";
import CoffeeShop from "../components/CoffeeShop";

const SEARCH_SHOPS = gql`
  query searchShops($keyword: String!) {
    searchShops(keyword: $keyword) {
      id
      name
      user {
        username
      }
      categories {
        name
      }
    }
  }
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: ${props => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
`;

export default function Search({ navigation }) {
  const numColumns = 1;
  const { width } = useWindowDimensions();
  const { setValue, register, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_SHOPS);
  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };

  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(0, 0, 0, 0.8)"
      placeholder="Search shop"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={text => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
      minLength: 3,
    });
  }, []);

  const renderItem = ({ item: shop }) => (
    <TouchableOpacity>
      <CoffeeShop {...shop} />
    </TouchableOpacity>
  );

  return (
    <DismissKeyboard>
      <View
        style={{
          width: "100%",
          backgroundColor: "black",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchShops !== undefined ? (
          data?.searchShops?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              style={{ width: "100%" }}
              data={data?.searchShops}
              keyExtractor={shop => "" + shop.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
