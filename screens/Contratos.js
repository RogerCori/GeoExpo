import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Appbar, Text, Card, Title, Paragraph} from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

const Contratos = ({ navigation }) => {
  const mapas = () => {
    navigation.navigate("Mapas");
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
        <Appbar.Content title="Contratos" titleStyle={{ marginLeft: "auto", color: "#14477e"}} />
      </Appbar.Header>
      <View style={styles.scroll}>
        <ScrollView>
          <View style={{ paddingHorizontal: 35 }}>

            <TouchableWithoutFeedback onPress={mapas}>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>Totes</Title>
                  <Paragraph>Av. Roma #6815 </Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>Contrato 2</Title>
                  <Paragraph>En construcción</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>Contrato 3</Title>
                  <Paragraph>En construcción</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>Contrato 4</Title>
                  <Paragraph>En construcción</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>Contrato 5</Title>
                  <Paragraph>En construcción</Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>Contrato 6</Title>
                  <Paragraph>En construcción</Paragraph>
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
    marginVertical: 5,
  },
});
