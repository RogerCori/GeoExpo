import React, { useEffect, useMemo, useReducer, useState } from "react";
import { StyleSheet } from "react-native";
import LoginPage from "./screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./context/context";
import { User } from "./models/Users";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "./components/DrawerContent";
import { Provider } from "react-native-paper";
import Seleccion from "./screens/Seleccion";
import Contratos from "./screens/Contratos";
import MapPage from "./screens/Map";
import { StatusBar } from "expo-status-bar";
import { navigationRef } from "./services/RootNavigator";

import * as Location from "expo-location";
import { LoadingSpinner } from "./screens/Loading";

const Dw = createDrawerNavigator();

export default function App() {
  const [permission, setPermission] = useState(Boolean);
  const [loading, setLoading] = useState(true);

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

  const [loginState, dispatch] = useReducer(authActions, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (foundUser: User) => {
        try {
          await AsyncStorage.setItem("ci", foundUser.ci);
        } catch (error) {
          console.log("Error : ", error);
        }
        dispatch({
          type: "LOGIN",
          name: foundUser.nombre,
          ci: foundUser.ci,
        });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("ci");
        } catch (e) {
          console.log("Error", e);
        }
        dispatch({ type: "LOGOUT" });
      },
      goToIndex: () => {
        navigationRef.current.navigate("Seleccion");
      },
      goToContracts: () => {
        navigationRef.current.navigate("Contratos");
      },
    }),
    []
  );

  useEffect(() => {
    retriveUserCI();
  }, []);

  const retriveUserCI = async () => {
    setTimeout(async () => {
      const userCI = await AsyncStorage.getItem("ci");
      dispatch({ type: "RETRIEVE_ID", ci: userCI });
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  if (!permission || loading) {
    return <LoadingSpinner />;
  }

  return (
    <Provider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer ref={navigationRef}>
          {loginState.userCI !== null ? (
            <Dw.Navigator
              drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
              <Dw.Screen name="Seleccion" component={Seleccion} />
              <Dw.Screen name="Contratos" component={Contratos} />
              <Dw.Screen name="Mapas" component={MapPage} />
            </Dw.Navigator>
          ) : (
            <LoginPage></LoginPage>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({});
