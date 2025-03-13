import {
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

type defaultThumbProps = {
  styles?: ViewStyle;
  onLayout: (e: LayoutChangeEvent) => void;
};

export const DefaultThumb = (props: defaultThumbProps) => {
  return (
    <Animated.View
      onLayout={props.onLayout}
      style={[styles.thumb, props.styles]}
    >
      <View style={[styles.mask]} />
      {/* Icon */}
      {/* <AntDesign name="pause" size={22} color="white" /> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  thumb: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    backgroundColor: '#F5F5F538',
    borderWidth: 3,
    borderColor: '#F5F5F5BB',
  },
});
