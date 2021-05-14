import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { color } from "react-native-elements/dist/helpers";
import {
  Card,
  Title,
  Button,
  Paragraph,
  Avatar,
  Headline,
  Divider,
  Appbar,
} from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

const Seleccion = ({ navigation }) => {
  const contratos = () => {
    navigation.navigate("Contratos");
  };
  return (
    <View>
      <Appbar.Header style={{ backgroundColor: "#ec9220" }}>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content
          title="Inicio"
          titleStyle={{ marginLeft: "auto", color: "#14477e" }}
        />
      </Appbar.Header>
      <Divider />
      <View style={styles.scroll}>
        <ScrollView>
          <View style={{ paddingHorizontal: 35, paddingTop: 20 }}>

            <TouchableWithoutFeedback onPress={contratos}>
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.boton}>
                    <Icon
                      name='map-marker'
                      size={40}
                      color='#ec9220'
                      />
                    <Title style={styles.btnTitulo}>  Marcar</Title>
                  </View>
                  <Paragraph style={styles.btnTexto}>Lista de Contratos</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.boton}>
                    <Icon
                      name='code'
                      size={40}
                      color='#ec9220'
                      />
                    <Title style={styles.btnTitulo}>  Botón 2</Title>
                  </View>
                  <Paragraph style={styles.btnTexto}>En construcción</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.boton}>
                    <Icon
                      name='code'
                      size={40}
                      color='#ec9220'
                      />
                    <Title style={styles.btnTitulo}>  Botón 3</Title>
                  </View>
                  <Paragraph style={styles.btnTexto}>En construcción</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.boton}>
                    <Icon
                      name='code'
                      size={40}
                      color='#ec9220'
                      />
                    <Title style={styles.btnTitulo}>  Botón 4</Title>
                  </View>
                  <Paragraph style={styles.btnTexto}>En construcción</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.boton}>
                    <Icon
                      name='code'
                      size={40}
                      color='#ec9220'
                      />
                    <Title style={styles.btnTitulo}>  Botón 5</Title>
                  </View>
                  <Paragraph style={styles.btnTexto}>En construcción</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>

          </View>
        </ScrollView>
      </View>
    </View>
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
    backgroundColor: '#14477e',
  },

  boton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
  },
  btnTitulo: {
    color: 'white',
  },
  btnTexto: {
    fontSize: 13,
    color: 'white',
    justifyContent: "center",
    textAlign: 'center',
  }
});