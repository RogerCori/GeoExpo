import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Appbar, Text, Card, Title, Paragraph} from "react-native-paper";

const Contratos = ({ navigation }) => {
  const mapas = () => {
    navigation.navigate("Mapas");
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
        <Appbar.Content title="Contratos" titleStyle={{ marginLeft: "auto" }} />
      </Appbar.Header>
      <View style={styles.scroll}>
        <ScrollView>
          <View style={{ paddingHorizontal: 35 }}>
            <TouchableWithoutFeedback onPress={mapas}>
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

export default Contratos;

const styles = StyleSheet.create({
  scroll: {
    height: Dimensions.get("window").height - 50,
  },
  card: {
    marginVertical: 15,
  },
});
