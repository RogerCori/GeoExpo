import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

import { AuthContext } from "./../context/context";
import { NavBar } from "../components/AppBar";

const MapPage = ({ route, navigation }) => {
  // console.log(route.params.coords)
  const [boton, setBoton] = useState("");
  const [estado, setEstado] = useState(true);
  const [userName, setUserName] = useState("");
  const [ciUser, setCiUser] = useState("");
  // const [text, onChangeText] = useState(null);

  const [permisoGeo, setPermisoGeo] = useState(null);
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermisoGeo(status === "granted");

      let location = await Location.getCurrentPositionAsync({});
      setLatitud(location.coords.latitude);
      setLongitud(location.coords.longitude);

      const name = await AsyncStorage.getItem("nombre");
      setUserName(name);
      const ci = await AsyncStorage.getItem("ci");
      setCiUser(ci);
    })();

    if (estado) {
      setBoton("Registrar Ingreso");
    } else {
      setBoton("Registrar Salida");
    }
  }, []);

  const Registro = async () => {
    try {
      const latLong = `${latitud}, ${longitud}`;
      let request = await fetch(
        "https://www.totes.com.bo/App_totes/controllers/servicio.php?service=Register",
        {
          method: "POST",
          body: JSON.stringify({
            ci: ciUser,
            ubicacion: latLong,
          }),
        }
      );
      let json = await request.json();
      console.log("respuesta: ", json);
    } catch (error) {
      console.log("Error: ", error);
    }

    Alert.alert("", "Registrado correctamente");
    setEstado(!estado);
    if (!estado) {
      setBoton("Registrar Ingreso");
    } else {
      setBoton("Registrar Salida");
    }
  };

  if (!permisoGeo) {
    return <Text>Esperando permisos de Geolocalizacion</Text>;
  }

  return (
    <>
      <NavBar navigation={navigation} title={"Ubicacion"} icon={"menu"} />
      <View style={styles.container}>
        <View style={styles.mapsContainer}>
          <Text
            style={{
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            Tu Ubicación Actual :
          </Text>
          <MapView
            style={styles.map}
            region={{
              latitude: latitud,
              longitude: longitud,
              latitudeDelta: 0.0008,
              longitudeDelta: 0.0008,
            }}
            mapType={"standard"}
            loadingEnabled={true}
            userLocationUpdateInterval={5000}
            userLocationFastestInterval={5000}
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
                latitude: -16.53467975128277,
                longitude: -68.09644754542965,
              }}
              radius={15}
              strokeWidth={3}
              strokeColor={"#14477e"}
              fillColor={"rgba(236,146,32,0.3)"}
            />

            <Circle
              center={{ latitude: -16.508993, longitude: -68.1229588 }}
              radius={15}
              strokeWidth={3}
              strokeColor={"#14477e"}
              fillColor={"rgba(236,146,32,0.3)"}
            />
          </MapView>
          <View style={styles.button}>
            <TouchableOpacity
              activeOpacity={0}
              style={styles.in}
              onPress={Registro}
            >
              <Text>{boton}</Text>
            </TouchableOpacity>
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
    padding: 20,
  },
  map: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height - 300,
  },
  button: {
    flexDirection: "row",
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
