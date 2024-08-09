import React from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

function EmojiSticker({ imageSize, stickerSource }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleImage = useSharedValue(imageSize);

  // Gesture for dragging (panning)
  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  // Gesture for double-tap to scale
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value === imageSize) {
        scaleImage.value = imageSize * 2;
      } else {
        scaleImage.value = imageSize;
      }
    });

  // Animated styles for the image and container
  const imageStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(scaleImage.value),
      width: withSpring(scaleImage.value),
    };
  });

  const styleContainer = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  // Combine gestures to work simultaneously
  const composedGesture = Gesture.Simultaneous(drag, doubleTap);

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styleContainer, { top: -350 }]}>
        <Animated.Image
          source={stickerSource}
          resizeMode="contain"
          style={imageStyle}
        />
      </Animated.View>
    </GestureDetector>
  );
}

export default EmojiSticker;
