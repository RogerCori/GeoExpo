import React, { useContext, useEffect, useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import {
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function CustomDrawerContent(props) {
  const [user, setUser] = useState({});

  const { signOut, goToIndex, goToContracts } = useContext(AuthContext);

  useEffect(() => {
    (async function () {
      let nombre = await AsyncStorage.getItem("nombre");
      let cargo = await AsyncStorage.getItem("cargo");
      let regional = await AsyncStorage.getItem("regional");
      let imagen = await AsyncStorage.getItem("imagen");

      setUser({
        nombre: nombre,
        cargo: cargo,
        regional: regional,
        imagen: imagen,
      });
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar
                overlayContainerStyle={{ backgroundColor: "grey" }}
                rounded
                size={80}
                source={{
                  uri: "https://www.totes.com.bo/App_totes/web/"+user.imagen,
                }}
              />
            </View>
          </View>

          <Drawer.Section>
            <View style={styles.navbar}>
              <Title style={styles.title}>{user.nombre}</Title>
              <Caption style={styles.caption}>Cargo:      {user.cargo}</Caption>
              <Caption style={styles.caption}>Regional:  {user.regional}</Caption>
            </View>
          </Drawer.Section>

          <Drawer.Section>
            <TouchableRipple
              onPress={goToIndex}
            >
              <View style={styles.preference}>
                <Text style={styles.title}>Inicio</Text>
              </View>
            </TouchableRipple>
          </Drawer.Section>

          <Drawer.Section>
            <TouchableRipple
              onPress={goToContracts}
            >
              <View style={styles.preference}>
                <Text style={styles.title}>Contratos</Text>
              </View>
            </TouchableRipple>
          </Drawer.Section>
          
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Cerrar sesi??n"
          onPress={() => {
            Alert.alert(
              "Salir",
              "Desea cerrar sesi??n?",
              [
                {
                  text: "Cancelar",
                  onPress: () => console.log("Cancelar cierre de sesi??n"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    signOut();
                  },
                },
              ],
              { cancelable: true }
            );
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    textTransform: "capitalize",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    textTransform: "capitalize",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#006699",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  navbar: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
