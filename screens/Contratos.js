import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Divider,
  Caption,
  Text,
} from "react-native-paper";
import { NavBar } from "./../components/AppBar";
import * as Location from "expo-location";

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
                      mapas(
                        contrato.id_contrato,
                        contrato.centro,
                        contrato.metros
                      );
                    }}
                    key={index}
                  >
                    <Card style={styles.card}>
                      <Card.Content>
                        <Title style={styles.titulo}>
                          {contrato.nom_empresa} - {contrato.nom_sucursal}
                        </Title>
                        <Divider />
                        <Paragraph style={styles.days}>
                          {"Dias: "}
                          {contrato.dias}
                        </Paragraph>
                        <Text style={styles.hora}>
                          {"Horario: "}
                          {contrato.hora_inicio}
                          {" - "}
                          {contrato.hora_final}
                        </Text>
                        <Caption style={{ fontWeight: "bold" }}>
                          {contrato.direccion}
                        </Caption>
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
    marginVertical: 10,
  },
  hora: {
    fontSize: 15,
    padding: 10,
    color: "#454D4E",
    backgroundColor: "#ec9220",
  },
});
