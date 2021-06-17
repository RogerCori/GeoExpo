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
import { Headline } from "react-native-paper";
import { RegisterService } from "../services/RegisterService";
import { Button } from "react-native-elements/dist/buttons/Button";

const MapPage = ({ route, navigation }) => {
  // console.log(route.params);

  const [boton, setBoton] = useState("");
  const [estado, setEstado] = useState(true);
  const [userName, setUserName] = useState("");
  const [ciUser, setCiUser] = useState("");
  // const [text, onChangeText] = useState(null);
  const [ayuda, setAyuda] = useState("");


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
      setBoton("Registrarse in");
      //setAyuda("Salida");
    } else {
      setBoton("Registrarse out");
      //setAyuda("Entrada");
    }
    
  }, []);


  const Registro = async () => {
    const latLong = `${latitud}, ${longitud}`;
    
    const aux = estado;
    console.log(estado)
    const response = await RegisterService(ciUser, latLong, route.params.id_contrato, aux)
    console.log(response)
    Alert.alert("Listo !", "Registrado correctamente");
    setEstado(!estado);
    
    if (!estado) {
      setBoton("Registrarse in");
      //setAyuda("Salida");
    } else {
      setBoton("Registrarse out");
      //setAyuda("Ingreso");
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
          <Headline
            style={{
              fontSize: 18,
              marginBottom: 10,
              textAlign: "center",
            }}
          >

            Su ubicación Actual:

          </Headline>
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
                latitude: +route.params.center.split(",")[0],
                longitude: +route.params.center.split(",")[1],
              }}
              radius={+route.params.radius}
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
              <Text style={{ fontSize: 22 }}>{boton}</Text>
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
    height: Dimensions.get("window").height - 250,
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
