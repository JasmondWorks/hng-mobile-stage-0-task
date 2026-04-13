import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  text: {
    fontSize: 16,
    color: theme.colors["on-surface-variant"],
  },
});
