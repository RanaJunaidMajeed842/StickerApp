import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ImageViewver from "./components/ImageViewver";
import Buttons from "./components/Buttons";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

export default function App() {
  // Default placeholder image to be displayed when no image is selected
  const DefaultImage = require("./assets/images/background-image.png");
  const imageRef = useRef();

  // State variables to manage selected image, app options visibility, modal visibility, and selected emoji
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emojiPicked, setEmojiPicked] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, requestPersmission] = MediaLibrary.usePermissions();

  // Function to reset the application state to initial settings
  if (status === null) {
    requestPersmission();
  }
  const resetAppOptions = () => {
    setShowAppOptions(false); // Hide app options
    setSelectedImage(null); // Clear selected image
    setEmojiPicked(null); // Clear selected emoji
  };

  // Placeholder function for saving the edited image with stickers (to be implemented)
  const saveImageAsync = async () => {
    // Logic for saving the image will go here
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });
      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to show the emoji picker modal
  const openEmojiPicker = () => {
    setIsModalVisible(true); // Show emoji picker modal
  };

  // Function to hide the emoji picker modal
  const closeEmojiPicker = () => {
    setIsModalVisible(false); // Hide emoji picker modal
  };

  // Function to pick an image from the device's image library
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, // Allow user to edit the image
      quality: 1, // Set image quality
    });

    if (!result.canceled) {
      // If an image is selected, set it as the selected image
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true); // Show app options (e.g., reset, save, add sticker)
    } else {
      alert("You have not chosen any image"); // Alert user if no image was selected
    }
  };

  return (
    // Root view with gesture handling capabilities
    <GestureHandlerRootView style={styles.container}>
      {/* Main image container */}
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          {console.log(imageRef)}
          <ImageViewver
            PlaceholderImage={DefaultImage} // Placeholder image if no image is selected
            selectedImage={selectedImage} // The currently selected image
          />
          {emojiPicked && (
            // Render the selected emoji sticker if an emoji is picked
            <EmojiSticker imageSize={40} stickerSource={emojiPicked} />
          )}
        </View>
      </View>

      {showAppOptions ? (
        // If an image is selected and options are shown
        <View style={styles.optionContainer}>
          <View style={styles.optionRow}>
            {/* Reset button to clear selections */}
            <IconButton
              label="Reset"
              icon="rotate-left"
              onPress={resetAppOptions}
            />
            {/* Button to add emoji stickers */}
            <CircleButton onPress={openEmojiPicker} />
            {/* Save button to save the edited image */}
            <IconButton label="Save" icon="save-alt" onPress={saveImageAsync} />
          </View>
        </View>
      ) : (
        // If no image is selected, show buttons to choose or use an image
        <View style={styles.footerContainer}>
          {/* Button to choose an image from the gallery */}
          <Buttons
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
          {/* Button to confirm using the chosen image */}
          <Buttons
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}

      {/* Emoji picker modal */}
      <EmojiPicker isVisible={isModalVisible} onClose={closeEmojiPicker}>
        <EmojiList onSelect={setEmojiPicked} onCloseModal={closeEmojiPicker} />
      </EmojiPicker>

      {/* Status bar configuration */}
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

// Styles for various components in the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e", // Dark background color
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58, // Top padding for the image container
  },
  footerContainer: {
    flex: 1 / 3, // Take up one-third of the available space
    alignItems: "center", // Center items horizontally
  },
  optionContainer: {
    position: "absolute", // Position at the bottom
    bottom: 80, // 80 units from the bottom
  },
  optionRow: {
    alignItems: "center", // Center items horizontally
    flexDirection: "row", // Arrange items in a row
  },
});
