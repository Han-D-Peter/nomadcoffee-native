import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Text, useWindowDimensions } from "react-native";

const Container = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Header = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
const UserNameIcon = styled.View`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50px;
  margin-right: 20px;
`;
const UserName = styled.View``;
const UserNameText = styled.Text`
  font-size: 20px;
  color: white;
`;
const ShopName = styled.View`
  height: 100px;
  padding-top: 20px;
  padding-left: 20px;
`;
const ShopNameText = styled.Text`
  font-size: 40px;
  color: white;
`;
const ShopCategories = styled.View`
  flex: 1;
  flex-direction: row;
`;
const ShopCategory = styled.View`
  height: 20px;
  border-radius: 5px;
  padding-right: 5px;
  padding-left: 5px;
  margin-right: 10px;
  background-color: white;
`;

function CoffeeShop({ id, name, user, categories }) {
  return (
    <Container>
      <Header>
        <UserNameIcon></UserNameIcon>
        <UserName>
          <UserNameText>{user.username}</UserNameText>
        </UserName>
      </Header>
      <ShopName>
        <ShopNameText>{name}</ShopNameText>
      </ShopName>
      <ShopCategories>
        {categories?.map((cate, index) => (
          <ShopCategory key={"catelist" + index}>
            <Text>{cate.name}</Text>
          </ShopCategory>
        ))}
      </ShopCategories>
    </Container>
  );
}

CoffeeShop.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
};

export default CoffeeShop;
