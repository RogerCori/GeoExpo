import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { NavBar } from "./../components/AppBar";
import * as Network from 'expo-network';

const Contratos = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  const [dataContrato, setDataContrato] = useState([{}]);

  useEffect(() => {
    if (typeof route.params.json !== "string") {
      setVisible(false);
      setDataContrato(route.params.json);
    } else {
      setVisible(true);
    }
  });

  const mapas = (id_contrato, centro, metros) => {
    navigation.navigate("Mapas", {
      id_contrato: id_contrato,
      center: centro,
      radius: metros,
    });
  };

  console.log(Network.getIpAddressAsync());
  

  return (
    <>
      <NavBar navigation={navigation} title={"Contratos"} icon={"menu"} />
      <View style={styles.scroll}>
        <ScrollView>
          <View style={{ paddingHorizontal: 35, paddingTop: 20 }}>
            {!visible ? (
              dataContrato.map((contrato, index) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      mapas(contrato.id_contrato, contrato.centro, contrato.metros);
                    }}
                    key={index}
                  >
                    
                    <Card style={styles.card}>
                      <Card.Content>
                        <Title style={styles.titulo}>{contrato.nom_empresa} - {contrato.nom_sucursal}</Title>
                        <Paragraph style={styles.days}>{"Dias: "}{contrato.dias}</Paragraph>
                        <Paragraph style={styles.hora}>{"Horario: "}{contrato.hora_inicio}{" - "}{contrato.hora_final}</Paragraph>
                        <Paragraph>{contrato.direccion}</Paragraph>
                      </Card.Content>
                    </Card>
                  </TouchableWithoutFeedback>
                );
              })
            ) : (
              <TouchableWithoutFeedback onPress={navigation.goBack}>
                <Card style={styles.card}>
                  <Card.Content>
                    <Title>{route.params.json}</Title>
                    <Paragraph>Presione para volver atras</Paragraph>
                  </Card.Content>
                </Card>
              </TouchableWithoutFeedback>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Contratos;

const styles = StyleSheet.create({
  scroll: {
    height: Dimensions.get("window").height - 50,
  },
  card: {
    marginVertical: 5,
  },
  titulo: {
    fontSize: 18,
    color: "#ec9220",
  },
  days: {
    fontSize: 18,
    color: "#14477e",
  },
  hora: {
    fontSize: 15,
    color: "#14477e",
    backgroundColor: "#ec9220",
  },
});
