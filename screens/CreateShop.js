import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const CREATE_COFFEE_SHOP = gql`
  mutation createCoffeeShop(
    $name: String!
    $categories: String!
    $longitude: String!
    $latitude: String!
  ) {
    createCoffeeShop(
      name: $name
      categories: $categories
      longitude: $longitude
      latitude: $latitude
    ) {
      id
      name
    }
  }
`;

const Container = styled.View``;

const Name = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px 7px;
  border-radius: 4px;
  color: white;
  margin-bottom: ${props => (props.lastOne ? "15" : 8)}px;
`;

const Category = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px 7px;
  border-radius: 4px;
  color: white;
  margin-bottom: ${props => (props.lastOne ? "15" : 8)}px;
`;

export default function CreateShop({ navigation }) {
  const { register, handleSubmit, setValue, watch, getValues } = useForm({});
  const categoriesRef = useRef();
  const onCompleted = async (cache, result) => {
    const {
      data: { shop },
    } = result;
    if (shop) {
      cache.modify({
        id: `ROOT_QUERY`,
        fields: {
          seeCoffeeShops(prev) {
            return [shop, ...prev];
          },
        },
      });
      navigation.navigate("Home");
    }
  };

  const [createMutation, { loading }] = useMutation(CREATE_COFFEE_SHOP, {
    update: onCompleted,
  });

  const onNext = nextOne => {
    nextOne?.current?.focus();
  };

  const onValid = data => {
    if (!loading) {
      createMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register("name", { required: true });
    register("categories", { required: true });
  }, [register]);
  useEffect(() => {
    setValue("longitude", "4");
    setValue("latitude", "3");
  }, []);

  return (
    <AuthLayout>
      <Name
        placeholder="name"
        returnKeyType="next"
        autoCapitalize={"none"}
        placeholderTextColor={"grey"}
        onSubmitEditing={() => onNext(categoriesRef)}
        onChangeText={text => setValue("name", text)}
      />
      <Category
        ref={categoriesRef}
        placeholder="Categories"
        returnKeyType="done"
        autoCapitalize={"none"}
        lastOne={true}
        placeholderTextColor={"grey"}
        onSubmitEditing={() => handleSubmit(onValid)}
        onChangeText={text => setValue("categories", text)}
      />
      <AuthButton
        text="Create Shop"
        loading={loading}
        disabled={!watch("name") || !watch("categories")}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
