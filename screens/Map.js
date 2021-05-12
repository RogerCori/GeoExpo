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
import MapView, { Circle, Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Surface } from "react-native-paper";

import { AuthContext } from "./../context/context";

const MapPage = ({ latitud, longitud }) => {
  const [boton, setBoton] = useState("");
  const [estado, setEstado] = useState(true);
  const { signOut } = useContext(AuthContext);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    (async () => {
      const nombre = await AsyncStorage.getItem("userName");
      setUserName(nombre);
      console.log(userName);
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

    const ci = await AsyncStorage.getItem("userCI");
    console.log(ci);
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
      console.log("resouesta: ", json);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const Logout = () => {
    signOut();
  };

  const [text, onChangeText] = React.useState(null);

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Text style={{ textTransform: "capitalize", fontSize: 20 }}>
          Bienvenido: {userName}
        </Text>
      </Surface>
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
            latitudeDelta: 0.015,
            longitudeDelta: 0.121,
          }}
          mapType={"standard"}
          loadingEnabled={true}
        >
          <Marker
            coordinate={{ latitude: latitud, longitude: longitud }}
            pinColor={"#ccc"}
            title={"Mi ubicacion"}
            description={"Descripcion de la ubicación"}
          />
          <Circle></Circle>
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

          <TouchableOpacity
            activeOpacity={0}
            style={styles.in}
            onPress={Logout}
          >
            <Text>Cerrar Sesion</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default MapPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#abc",
    alignItems: "center",
    justifyContent: "center",
  },
  mapsContainer: {
    padding: 20,
  },
  map: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height - 500,
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
    height: 30,
    margin: 12,
    borderWidth: 1,
  },
  surface: {
    padding: 8,
    height: 80,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
