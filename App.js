import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "./components/nav/TabIcon";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Search from "./screens/Search";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar } from "./apollo";
import LogIn from "./screens/LogIn";

const Tabs = createBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const onFinish = () => setLoading(false);
  const preload = () => {
    const fontToLoad = [Ionicons.font];
    const fontPromises = fontToLoad.map(font => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromises = imagesToLoad.map(image => Asset.loadAsync(image));

    return Promise.all([...fontPromises, ...imagePromises]);
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "black",
              borderTopColor: "rgba(255, 255, 255, 0.3)",
            },
            tabBarActiveTintColor: "white",
            headerShown: false,
            tabBarShowLabel: false,
          }}
        >
          <Tabs.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <TabIcon iconName={"home"} color={color} focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="Search"
            component={Search}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <TabIcon iconName={"search"} color={color} focused={focused} />
              ),
            }}
          />

          <Tabs.Screen
            name="Profile"
            component={isLoggedIn ? Profile : LogIn}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <TabIcon iconName={"person"} color={color} focused={focused} />
              ),
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
