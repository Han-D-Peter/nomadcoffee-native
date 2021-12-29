import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { myNameVar, tokenVar } from "../apollo";
import CoffeeShop from "../components/CoffeeShop";
import ScreenLayout from "../components/ScreenLayout";

const FEED_QUERY = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
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

export default function Home({ navigation }) {
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: { page },
  });
  const myName = useReactiveVar(myNameVar);
  const token = useReactiveVar(tokenVar);

  const renderShop = ({ item: shop }) => {
    return <CoffeeShop {...shop} />;
  };

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={() =>
          fetchMore({
            variables: { page: data?.seeCoffeeShops?.length },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeCoffeeShops}
        keyExtractor={shop => "" + shop.id}
        renderItem={renderShop}
      />
    </ScreenLayout>
  );
}
