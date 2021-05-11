import React, { useEffect, useMemo, useReducer } from "react";
import { Dimensions, StyleSheet } from "react-native";
import LoginPage from "./screens/Login";
import MainPage from "./screens/Main.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "./context/context";

import { User } from './models/Users'

export default function App() {

  const initialLoginState = {
    userName: null,
    userCI: null,
  };

  const authActions = (prevState: any, action: any) => {
    switch (action.type) {
      case "RETRIEVE_ID":
        return {
          ...prevState,
          userCI: action.ci,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.name,
          userCI: action.ci,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userCI: null,
        };
    }
  };

  useEffect(() => {
    setTimeout(async () => {
      let userCI;
      userCI = null;
      try {
        userCI = await AsyncStorage.getItem("userID");
      } catch (e) {
        console.log("Error", e);
      }
      dispatch({ type: "RETRIEVE_ID", ci: userCI });
    }, 1000);
  }, []);

  const [loginState, dispatch] = useReducer(
    authActions,
    initialLoginState
  );

  const authContext = useMemo(
    () => ({
      signIn: async (foundUser: User) => {
        //console.log(foundUser);
        const userCI = String(foundUser.userCI);
        const userName = foundUser.userName;
        dispatch({ type: "LOGIN", name: userName, ci: userCI });
      },
      signOut: async () => {
        console.log("Cerrar Sesion");
        try {
          await AsyncStorage.clear()
        } catch (e) {
          console.log("Error", e);
        }
        dispatch({ type: "LOGOUT" });
      },
    }),
    []
  );

  return (
    <>
      <AuthContext.Provider value={authContext}>
          {loginState.userCI !== null ? (
            <MainPage></MainPage>
          ) : (
            <LoginPage></LoginPage>
          )}
      </AuthContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapsContainer: {
    padding: 30,
  },
  map: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height - 150,
  },
  buttons: {
    flexDirection: "row",
  },
});
