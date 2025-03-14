import Slider from 'react-native-vater-slider';
import { View, StyleSheet, Text } from 'react-native';
import { useState } from 'react';

const sliderValues = [
  {
    value: { feeling: 'SAD' },
    tintColor: '#785AE6',
  },
  {
    value: { feeling: 'BORED' },
    tintColor: '#D06B35',
  },
  {
    value: { feeling: 'GOOD' },
    tintColor: '#AC826B',
  },
  {
    value: { feeling: 'HAPPY' },
    tintColor: '#F4C21F',
  },
  {
    value: { feeling: 'EXCITED' },
    tintColor: '#7E9A2A',
  },
];

export default function App() {
  const [selectedValue, setSelectedValue] = useState<string>(
    sliderValues[0]?.value.feeling ?? ''
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Current Selection</Text>
      <Text style={styles.selection}> {selectedValue}</Text>
      <Slider
        values={sliderValues}
        onStartSelection={() => console.log('start selecting')}
        onSelectionChange={(item, index) => {
          console.log('current selection', item, index);
          setSelectedValue(item.feeling);
        }}
        onSelected={(item, index) => {
          console.log('position selected is', item, index);
        }}
        //selectedValueByIndex={selectedValue}
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
  title: {
    marginBottom: 5,
  },
  selection: {
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 20,
  },
});
