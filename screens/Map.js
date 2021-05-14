import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import MapView, { Circle, Marker, Polygon, Polyline } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar } from "react-native-paper";
import * as Location from "expo-location";

import { AuthContext } from "./../context/context";

const MapPage = ({ navigation }) => {
  const [boton, setBoton] = useState("");
  const [estado, setEstado] = useState(true);
  const [userName, setUserName] = useState("");
  const [text, onChangeText] = useState(null);

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
    })();

    if (estado) {
      setBoton("Registrar Ingreso");
    } else {
      setBoton("Registrar Salida");
    }
  }, []);

  const Registro = async () => {
    Alert.alert("", "Registrado correctamente");
    setEstado(!estado);
    if (!estado) {
      setBoton("Registrar Ingreso");
    } else {
      setBoton("Registrar Salida");
    }
    try {
      const latLong = `${latitud}, ${longitud}`;
      const textoUbicacion = `${text}`;
      console.log(textoUbicacion);
      let request = await fetch(
        "https://www.totes.com.bo/App_totes/controllers/servicio.php?service=Register",
        {
          method: "POST",
          body: JSON.stringify({
            ci: ci,
            geo: latLong,
            texto: textoUbicacion,
          }),
        }
      );
      let json = await request.json();
      console.log("respuesta: ", json);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  if (!permisoGeo) {
    return <Text>Esperando permisos de Geolocalizacion</Text>;
  }

  return (
    <>
      <Appbar.Header style={{ backgroundColor: "#abc" }}>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content title="Ubicacion" titleStyle={{ marginLeft: "auto" }} />
      </Appbar.Header>
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

            <Polygon
              coordinates={[
                {
                  latitude: -16.534759722724974,
                  longitude: -68.09657861111778,
                },
                {
                  latitude: -16.534701868640504,
                  longitude: -68.09644181847167,
                },
                { 
                  latitude: -16.53483300454041, 
                  longitude: -68.09634660006115 
                },
                {
                  latitude: -16.534901143747337,
                  longitude: -68.09645791172417,
                },
              ]}
              strokeWidth={3}
              strokeColor={"#14477e"}
              fillColor={"rgba(236,146,32,0.3)"}
            />

            <Polygon
              coordinates={[
                {
                  latitude: -16.542677957503024,
                  longitude: -68.08480973307351,
                },
                {
                  latitude: -16.542741321011018,
                  longitude: -68.0850885005814,
                },
                { 
                  latitude: -16.543008549489674, 
                  longitude: -68.08504539220391 
                },
                {
                  latitude: -16.542956205796212,
                  longitude: -68.08476949858783,
                },
              ]}
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

            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Dónde te encuentras?"
            />
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
