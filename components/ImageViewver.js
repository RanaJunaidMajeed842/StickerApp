import React from "react";
import { Image, StyleSheet } from "react-native";

function ImageViewver({ PlaceholderImage, selectedImage }) {
  const ImageSource = selectedImage ? { uri: selectedImage } : PlaceholderImage;
  return <Image source={ImageSource} style={styles.Image} />;
}

const styles = StyleSheet.create({
  Image: {
    height: 440,
    width: 320,
    borderRadius: 18,
  },
});

export default ImageViewver;
