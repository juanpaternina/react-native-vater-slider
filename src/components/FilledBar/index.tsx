import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

type FilledBarProps = {
  animatedBackground?: any;
  animatedWidth?: any;
};

export const FilledBar = ({
  animatedBackground,
  animatedWidth,
}: FilledBarProps) => {
  return (
    <Animated.View
      style={[styles.basicStyles, animatedWidth, animatedBackground]}
    />
  );
};

const styles = StyleSheet.create({
  basicStyles: {
    backgroundColor: 'red',
    height: '100%',
    borderRadius: 5,
    position: 'absolute',
  },
});
