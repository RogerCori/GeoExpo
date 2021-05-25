import React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";

export const NavBar = (props) => {
  return (
    <Appbar.Header style={styles.appHeader} dark={true}>
      <Appbar.Action
        icon={props.icon}
        onPress={() => {
          props.navigation.openDrawer();
        }}
      />
      <Appbar.Content title={props.title} titleStyle={styles.appContent} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appHeader: {
    backgroundColor: "#ec9220",
  },
  appContent: {
    marginLeft: "auto",
    color: "#14477e",
  },
});
