import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavBar } from "./../components/AppBar";

const Seleccion = ({ navigation }) => {
  const [ciUser, setCiUser] = useState();

  useEffect(() => {
    (async () => {
      const userCi = await AsyncStorage.getItem("ci");
      setCiUser(userCi);
    })();
  });

  const contratos = async () => {
    const request = await fetch(
      "https://www.totes.com.bo/App_totes/controllers/servicio.php?service=Contratos",
      {
        method: "POST",
        body: JSON.stringify({
          ci: ciUser,
        }),
      }
    );
    const json = await request.json();
    navigation.navigate("Contratos", { json: json });
  };
  return (
    <>
      <NavBar navigation={navigation} title={"Inicio"} icon={"menu"} />
      <View style={styles.scroll}>
        <ScrollView>
          <View style={{ paddingHorizontal: 35, paddingTop: 20 }}>
            <TouchableWithoutFeedback onPress={contratos}>
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.boton}>
                    <Icon name="map-marker" size={40} color="#ec9220" />
                    <Title style={styles.btnTitulo}> Marcar</Title>
                  </View>
                  <Paragraph style={styles.btnTexto}>
                    Lista de Contratos
                  </Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>



            <TouchableWithoutFeedback onPress={() => {
              Alert.alert(
                "En construcción",
                "Aún no está disponible ésta opción",
                [{
                    text: "Ok",
                    onPress: () => console.log("No disponible"),
                    style: "cancel",
                },],
                { cancelable: true }
              );
            }}>
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.boton}>
                    <Icon name="commenting" size={40} color="#ec9220" />
                    <Title style={styles.btnTitulo}> Mensaje</Title>
                  </View>
                  <Paragraph style={styles.btnTexto}>Envía mensajes al supervisor</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>


            <TouchableWithoutFeedback onPress={() => {
              Alert.alert(
                "En construcción",
                "Aún no está disponible ésta opción",
                [{
                    text: "Ok",
                    onPress: () => console.log("No disponible"),
                    style: "cancel",
                },],
                { cancelable: true }
              );
            }}>
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.boton}>
                    <Icon name="flask" size={40} color="#ec9220" />
                    <Title style={styles.btnTitulo}> Suministros</Title>
                  </View>
                  <Paragraph style={styles.btnTexto}>Suministros por lugar</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Seleccion;

const styles = StyleSheet.create({
  scroll: {
    height: Dimensions.get("window").height - 50,
  },
  card: {
    marginTop: 10,
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: "#14477e",
  },

  boton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitulo: {
    color: "white",
  },
  btnTexto: {
    fontSize: 13,
    color: "white",
    justifyContent: "center",
    textAlign: "center",
  },
});
