import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View, StyleSheet } from "react-native";

function CircleButton({ onPress }) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={styles.circleButton} onPress={onPress}>
        <MaterialIcons name="add" size={38} color="#25292e" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderRadius: 42,
    backgroundColor: "#fff",
    padding: 3,
    borderWidth: 5,
    borderColor: "#ffd33d",
  },
  circleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    backgroundColor: "#fff",
  },
});

export default CircleButton;
