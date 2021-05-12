import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import { Appbar, Text } from "react-native-paper";
import MapPage from "./Map";

const MainPage = () => {
  const [permisoGeo, setPermisoGeo] = useState(null);
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);
  const [prueba, setPrueba] = useState()

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermisoGeo(status === "granted");

      let location = await Location.getCurrentPositionAsync({});
      setLatitud(location.coords.latitude);
      setLongitud(location.coords.longitude);
    })();
  }, []);

  if (!permisoGeo) {
    return <Text>Esperando permisos de Geolocalizacion</Text>;
  }

  return (
    <View style={styles.container}>
      <Appbar.Header
        style={{
          width: Dimensions.get("window").width,
          backgroundColor: "#abc",
          borderTopColor : "black",
          borderTopWidth : 1,
          borderStyle : "solid"
        }}
      >
        <Appbar.BackAction onPress={() => {}} />
        <Text>Algo</Text>
      </Appbar.Header>
      <MapPage latitud={latitud} longitud={longitud}></MapPage>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
