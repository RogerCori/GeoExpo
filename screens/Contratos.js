import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { NavBar } from "./../components/AppBar";

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

  const mapas = (id_contrato) => {
    console.log(id_contrato);
    navigation.navigate("Mapas", {
      coords: "Algo viene aqui",
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
                      mapas(contrato.id_contrato);
                    }}
                    key={index}
                  >
                    <Card style={styles.card}>
                      <Card.Content>
                        <Title>{contrato.nom_empresa}</Title>
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
                    <Paragraph>Presione para ir atras</Paragraph>
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
});
