import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, Alert, ScrollView } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

import { NavBar } from "../components/AppBar";
import {
  Headline,
  Button,
  Caption,
  Divider,
  Text,
  Modal,
  ActivityIndicator,
} from "react-native-paper";
import { RegisterService } from "../services/RegisterService";
import { reqBtnState } from "./../services/btnState";

const MapPage = ({ route, navigation }) => {
  const [btnIn, setBtnIn] = useState(Boolean);
  const [btnOut, setBtnOut] = useState(Boolean);

  const [userName, setUserName] = useState("");
  const [ciUser, setCiUser] = useState("");

  const [estado, setEstado] = useState(true);
  const [process, setProcess] = useState(false);

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
    requestStateBtn();
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

  const requestStateBtn = async () => {
    const req = await reqBtnState(ciUser, route.params.id_contrato);
    console.log(req);
    /**
     * 0 : Salida marcada => entrada activada, salida desactivada
     * 1 : Entrada marcada => salida activada, entrada desactivada
     */
    if (req.in_out === "0") {
      console.log("Salida marcada => entrada activada, salida desactivada");
      setBtnIn(false);
      setBtnOut(true);
    } else {
      console.log("Entrada marcada => salida activada, entrada desactivada");
      setBtnIn(true);
      setBtnOut(false);
    }
  };

  const Registro = async () => {
    setProcess(true);
    if (latitud === 0 || longitud === 0) {
      requestLocation();
    }
    const latLong = `${latitud}, ${longitud}`;

    const response = await RegisterService(
      ciUser,
      latLong,
      route.params.id_contrato,
      estado
    );
    setProcess(false);
    // Valor In_out de la respuesta
    // console.log(response.split("**")[5]);
    Alert.alert("Listo !", "Se registró correctamente", [
      {
        text: "Aceptar",
        onPress: () => {
          requestStateBtn();
        },
      },
    ]);
    setEstado(!estado);
  };

  const btnActiveStyle = {
    width: 150,
    backgroundColor: "#f79134",
  };

  const btnDisableStyle = {
    width: 150,
    backgroundColor: "#f79f9f",
  };

  const ModalProcess = {
    backgroundColor: "transparent",
    width: Dimensions.get("window").width - 50,
    height: Dimensions.get("window").height,
    marginHorizontal: 30,
    position: "absolute",
  };

  return (
    <>
      <NavBar navigation={navigation} title={"Ubicacion"} icon={"menu"} />
      <Caption style={{ textAlign: "center" }}>
        *Tenga en cuenta que la ubicación puede ser inexacta y dependerá de la
        velocidad de su internet, intente actualizar un par de veces antes de
        marcar*
      </Caption>
      <Divider />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.mapsContainer}>
            <Headline style={styles.title}>Su ubicación Actual:</Headline>

            <Button
              onPress={requestLocation}
              mode="contained"
              style={styles.btnRefresh}
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
            <View style={styles.btnContainer}>
              <Button
                style={btnIn ? btnDisableStyle : btnActiveStyle}
                disabled={btnIn}
                onPress={Registro}
              >
                <Text style={styles.btnText}>Ingreso</Text>
              </Button>
              <Button
                style={btnOut ? btnDisableStyle : btnActiveStyle}
                disabled={btnOut}
                onPress={Registro}
              >
                <Text style={styles.btnText}>Salida</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal visible={process} contentContainerStyle={ModalProcess}>
        <Headline style={styles.headModal}>Procesando solicitud...</Headline>
        <ActivityIndicator animating={process} color="white" />
      </Modal>
    </>
  );
};

export default MapPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  btnRefresh: { borderBottomEndRadius: 0, borderBottomStartRadius: 0 },
  mapsContainer: {
    paddingHorizontal: 10,
  },
  map: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height - 300,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 15,
  },
  btn: {
    width: 150,
    backgroundColor: "#f79134",
  },
  btnText: { fontSize: 18, color: "white" },
  headModal: {
    color: "white",
    textAlign: "center",
    marginVertical: 10,
  },
});
