import { StyleSheet, type ViewStyle } from 'react-native';
import {
  GestureDetector,
  type GestureType,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

type ThumbContainerProps = {
  panGesture: GestureType;
  styles?: ViewStyle;
  children?: React.ReactNode;
  currentPosition?: ViewStyle;
};

export const ThumbContainer = ({
  panGesture,
  styles,
  children,
  currentPosition,
}: ThumbContainerProps) => {
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={StyleSheet.compose(styles, currentPosition)}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};
