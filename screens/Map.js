import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View, Alert } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

import { NavBar } from "../components/AppBar";
import { Headline, Button, Caption, Divider } from "react-native-paper";
import { RegisterService } from "../services/RegisterService";

const MapPage = ({ route, navigation }) => {
  const [boton, setBoton] = useState("");
  const [estado, setEstado] = useState(true);
  const [userName, setUserName] = useState("");
  const [ciUser, setCiUser] = useState("");
  // const [text, onChangeText] = useState(null);
  const [ayuda, setAyuda] = useState("");

  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);

  useEffect(() => {
    (async () => {
      const name = await AsyncStorage.getItem("nombre");
      setUserName(name);
      const ci = await AsyncStorage.getItem("ci");
      setCiUser(ci);
    })();

    requestLocation();

    if (estado) {
      setBoton("Registrarse");
      //setAyuda("Salida");
    } else {
      setBoton("Registrarse");
      //setAyuda("Entrada");
    }
  }, []);

  /**
   * Solicita la ubicacion
   * En caso de no disponer la ubicacion exacta, trabaja con la ultima
   * ubicacion conocida
   */
  const requestLocation = async () => {
    let location;
    try {
      location = await Location.getCurrentPositionAsync({ accuracy: 6 });
      // console.log("Ubicacion exacta : ", location);
      setLatitud(location.coords.latitude);
      setLongitud(location.coords.longitude);
    } catch (error) {
      location = await Location.getLastKnownPositionAsync({});
      // console.log("Ultima ubicacion conocida : ", location);
      setLatitud(location.coords.latitude);
      setLongitud(location.coords.longitude);
    }
  };

  const Registro = async () => {
    const latLong = `${latitud}, ${longitud}`;

    const aux = estado;
    console.log(estado);
    const response = await RegisterService(
      ciUser,
      latLong,
      route.params.id_contrato,
      aux
    );
    console.log(response);
    Alert.alert("Listo !", "Se registró correctamente");
    setEstado(!estado);

    if (!estado) {
      setBoton("Registrarse");
      //setAyuda("Salida");
    } else {
      setBoton("Registrarse");
      //setAyuda("Ingreso");
    }
  };

  return (
    <>
      <NavBar navigation={navigation} title={"Ubicacion"} icon={"menu"} />
      <Caption style={{ textAlign: "center" }}>
        *Tenga en cuenta que la ubicación puede no ser exacta y dependerá de la 
        velocidad de su internet, intente actualizar un par de veces antes de marcar*
      </Caption>
      <Divider />
      <View style={styles.container}>
        <View style={styles.mapsContainer}>
          <Headline
            style={{
              fontSize: 18,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            Su ubicación Actual:
          </Headline>

          <Button
            onPress={requestLocation}
            mode="contained"
            style={{ borderBottomEndRadius: 0, borderBottomStartRadius: 0 }}
          >
            Actualizar Ubicación
          </Button>
          <MapView
            style={styles.map}
            region={{
              latitude: latitud,
              longitude: longitud,
              latitudeDelta: 0.0008,
              longitudeDelta: 0.0008,
            }}
            mapType={"satellite"}
            //loadingEnabled={true}
            //liteMode={true}
            //onRegionChangeComplete={this.onRegionChange}
            //onUserLocationChange={this.onUserLocationChange}
            showsUserLocation={true}
            showsMyLocationButton={true}
            //userLocationUpdateInterval={5000}
            //userLocationFastestInterval={5000}
            zoomEnabled={true}
          >
            <Marker
              coordinate={{ latitude: latitud, longitude: longitud }}
              pinColor={"#14477e"}
              title={"Ubicación actual"}
              description={userName}
            />

            <Circle
              center={{
                latitude: +route.params.center.split(",")[0],
                longitude: +route.params.center.split(",")[1],
              }}
              radius={+route.params.radius + 10}
              strokeWidth={0}
              strokeColor={"#FFB66D"}
              fillColor={"rgba(255,152,49,0.5)"}
            />

            <Circle
              center={{
                latitude: +route.params.center.split(",")[0],
                longitude: +route.params.center.split(",")[1],
              }}
              radius={+route.params.radius}
              strokeWidth={0}
              strokeColor={"#FF8102"}
              fillColor={"rgba(255,129,2,0.2)"}
            />
          </MapView>
          <View style={styles.button}>
            <Button style={styles.in} onPress={Registro}>
              <Text style={{ fontSize: 18, color: "white" }}>{boton}</Text>
            </Button>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </>
  );
};

export default MapPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapsContainer: {
    padding: 10,
  },
  map: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height - 300,
  },
  button: {
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 15,
  },
  in: {
    paddingHorizontal: 10,
    marginHorizontal: 20,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#f79134",
  },
  logout: {
    paddingHorizontal: 10,
    marginHorizontal: 20,
    height: 40,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#bbb",
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 15,
  },
});
