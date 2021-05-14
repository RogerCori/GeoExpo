import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
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

const Seleccion = ({ navigation }) => {
  const contratos = () => {
    navigation.navigate("Contratos");
  };
  return (
    <View>
      <Appbar.Header style={{ backgroundColor: "#abc" }}>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content
          title="Seleccion"
          titleStyle={{ marginLeft: "auto" }}
        />
      </Appbar.Header>
      <Divider />
      <View style={styles.scroll}>
        <ScrollView>
          <View style={{ paddingHorizontal: 35 }}>
            <TouchableWithoutFeedback onPress={contratos}>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>Titulo</Title>
                  <Paragraph>Subtitulo</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>Titulo</Title>
                  <Paragraph>Subtitulo</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>Titulo</Title>
                  <Paragraph>Subtitulo</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>Titulo</Title>
                  <Paragraph>Subtitulo</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>Titulo</Title>
                  <Paragraph>Subtitulo</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>Titulo</Title>
                  <Paragraph>Subtitulo</Paragraph>
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
    marginVertical: 15,
  },
});
