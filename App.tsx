import "react-native-gesture-handler";
import React, { useEffect, useMemo, useReducer } from "react";
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
import { navigationRef } from "./services/RootNavigator";

const Dw = createDrawerNavigator();

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
      goToIndex : () => {
        navigationRef.current.navigate("Seleccion");
      },
      goToContracts : () => {
        navigationRef.current.navigate("Contratos");
      }
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userCI;
      userCI = null;
      try {
        userCI = await AsyncStorage.getItem("ci");
      } catch (e) {
        console.log("Error", e);
      }
      dispatch({ type: "RETRIEVE_ID", ci: userCI });
    }, 1000);
  }, []);

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
    </Provider>
  );
}

const styles = StyleSheet.create({});
