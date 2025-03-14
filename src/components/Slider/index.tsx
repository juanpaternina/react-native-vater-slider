import { type LayoutChangeEvent, type ViewStyle } from 'react-native';
import { Bar } from '../Bar';
import { FilledBar } from '../FilledBar';
import { ThumbContainer } from '../ThumbContainer';

import { useSlider } from '../../hooks/useSlider';
import { DefaultThumb } from '../DefaultThumb';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState } from 'react';
import React from 'react';

export type Value<T> = {
  value: T;
  tintColor: string;
};

export type SharedEventProps<T> = {
  onSelected?: (item: T, index: number) => void;
  onSelectionChange?: (item: T, index: number) => void;
  onStartSelection?: () => void;
  values: Array<Value<T>>;
  selectedValueByIndex?: number;
};

export type SliderProps<T> = SharedEventProps<T> & {
  thumb?: React.ReactElement;
  containerStyle?: ViewStyle;
};

export const Slider = <T,>(props: SliderProps<T>) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(0);

  const { gesture, animatedBackground, animatedXPosition, animatedWidth } =
    useSlider({
      sliderWidth: sliderWidth,
      thumbWidth: thumbWidth,
      values: props.values,
      selectedValueByIndex: props.selectedValueByIndex,
      onSelected: props.onSelected,
      onSelectionChange: props.onSelectionChange,
      onStartSelection: props.onStartSelection,
    });

  const measureBar = (e: LayoutChangeEvent) => {
    setSliderWidth(e.nativeEvent.layout.width);
  };

  const measureThumb = (e: LayoutChangeEvent) => {
    setThumbWidth(e.nativeEvent.layout.width);
  };

  return (
    <GestureHandlerRootView style={{}}>
      <Bar onLayout={measureBar} style={props.containerStyle}>
        {/* Bar */}
        <FilledBar
          animatedBackground={animatedBackground}
          animatedWidth={animatedWidth}
        />
        <ThumbContainer
          panGesture={gesture}
          currentPosition={animatedXPosition}
        >
          {/* Here goes any thumb replacer */}
          {props.thumb ? (
            React.cloneElement(props.thumb, {
              onLayout: measureThumb,
            })
          ) : (
            <DefaultThumb styles={animatedBackground} onLayout={measureThumb} />
          )}
        </ThumbContainer>
      </Bar>
    </GestureHandlerRootView>
  );
};
