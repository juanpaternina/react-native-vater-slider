import Slider from 'react-native-vater-slider';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';

const sliderValues = [
  {
    value: 1,
    tintColor: '#785AE6',
  },
  {
    value: 2,
    tintColor: '#D06B35',
  },
  {
    value: 3,
    tintColor: '#AC826B',
  },
  {
    value: 4,
    tintColor: '#F4C21F',
  },
  {
    value: 5,
    tintColor: '#7E9A2A',
  },
];

export default function App() {
  const [selectedValue] = useState(0);

  return (
    <View style={styles.container}>
      <Slider
        values={sliderValues}
        onStartSelection={() => console.log('start selecting')}
        onSelectionChange={(item, index) =>
          console.log('current selection', item, index)
        }
        onSelected={(item, index) =>
          console.log('position selected is', item, index)
        }
        selectedValueByIndex={selectedValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
