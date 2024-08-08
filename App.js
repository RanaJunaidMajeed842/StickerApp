import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ImageViewver from "./components/ImageViewver";
import Buttons from "./components/Buttons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";
import EmojiPicker from "./components/EmojiPicker";

export default function App() {
  const DefaultImage = require("./assets/images/background-image.png");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onReset = () => {
    setShowAppOptions(false);
  };
  const onSaveAsync = async () => {};
  const onAddSticker = () => {
    setIsModalVisible(true);
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You have not chosen any image");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ImageContainer}>
        <ImageViewver
          PlaceholderImage={DefaultImage}
          selectedImage={selectedImage}
        />
      </View>
      {showAppOptions ? (
        <View style={styles.optionContainer}>
          <View style={styles.optionRow}>
            <IconButton label="Reset" icon="rotate-left" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton label="Save" icon="save-alt" onPress={onSaveAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Buttons
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
          <Buttons
            label={"Use this photo"}
            onPress={() => {
              console.log("Activated");
              setShowAppOptions(true);
            }}
          />
        </View>
      )}
      <EmojiPicker
        isVisible={isModalVisible}
        onClose={onModalClose}
      ></EmojiPicker>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  ImageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
