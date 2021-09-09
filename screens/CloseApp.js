import React from "react";
import { View, BackHandler, StyleSheet } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import { LoadingSpinner } from "./Loading";

export const CloseApp = () => {
  const exitApp = () => {
    BackHandler.exitApp();
  };

  return (
    <Provider>
      <LoadingSpinner />
      <View>
        <Portal>
          <Dialog visible={true}>
            <Dialog.Title>Atencion!</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Verifique la conexion a internet y vuelva a ingresar a la
                aplicación por favor
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={exitApp}>Aceptar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
