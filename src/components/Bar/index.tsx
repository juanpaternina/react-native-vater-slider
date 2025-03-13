import {
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';

type ContainerProps = {
  children?: React.ReactNode;
  style?: ViewStyle;
  onLayout?: (e: LayoutChangeEvent) => void;
};

export const Bar = (props: ContainerProps) => {
  return (
    <View
      onLayout={props.onLayout}
      style={StyleSheet.compose(styles.container, props.style)}
    >
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    height: 20,
    width: 300,
  },
});
