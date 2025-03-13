import { useEffect, useState } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import type { SharedEventProps, Value } from '../components/Slider';

type useSliderProps<T> = SharedEventProps<T> & {
  values: Array<Value<T>>;
  sliderWidth: number;
  thumbWidth: number;
};

export const useSlider = <T,>({
  values,
  sliderWidth,
  thumbWidth,
  selectedValueByIndex,
  onSelected,
  onStartSelection,
  onSelectionChange,
}: useSliderProps<T>) => {
  const offsetPosition = useSharedValue(0);
  const startPosition = useSharedValue(0);
  const currentSegment = useSharedValue(0);

  const [draggerRadius, setDraggerRadius] = useState(0);
  // const draggerRadius = useSharedValue(0);
  const [segmentSize, setSegmentSize] = useState<number>(0);

  const gesture = Gesture.Pan()
    .onStart(() => {
      if (onStartSelection) runOnJS(onStartSelection)();
    })
    .onUpdate((e) => {
      const newPos = Math.min(
        sliderWidth - draggerRadius,
        Math.max(-draggerRadius, e.translationX + startPosition.value)
      );
      const newSegment = Math.round(newPos / segmentSize);
      // console.log(
      //   'new segment',
      //   newSegment,
      //   newPos,
      //   segmentSize,
      //   draggerRadius.value,
      //   e.translationX,
      //   startPosition.value
      // );

      offsetPosition.value = newPos;

      if (newSegment !== currentSegment.value) {
        currentSegment.value = newSegment;

        if (onSelectionChange) {
          const selectedValue = values[currentSegment.value]?.value as T;
          runOnJS(onSelectionChange)(selectedValue, currentSegment.value);
        }
      }
    })
    .onEnd(() => {
      startPosition.value = offsetPosition.value;
      if (onSelected) {
        const selectedValue = values[currentSegment.value]?.value as T;
        runOnJS(onSelected)(selectedValue, currentSegment.value);
      }
    });

  const animatedValue = useDerivedValue(() => {
    return withTiming(currentSegment.value, { duration: 300 });
  });

  const animatedXPosition = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offsetPosition.value,
      },
    ],
  }));

  const animatedBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedValue.value,
        values.map((_, index) => index),
        values.map((i) => i.tintColor)
      ),
    };
  });

  const animatedWidth = useAnimatedStyle(() => {
    return {
      width: offsetPosition.value + draggerRadius,
    };
  });

  useEffect(() => {
    const tempSegmentSize = (sliderWidth + draggerRadius) / values.length;
    console.log('segment size', tempSegmentSize);
    setSegmentSize(tempSegmentSize);

    startPosition.value += -draggerRadius;
    offsetPosition.value += -draggerRadius;

    if (selectedValueByIndex) {
      startPosition.value += tempSegmentSize * selectedValueByIndex;
      offsetPosition.value += tempSegmentSize * selectedValueByIndex;
      currentSegment.value = selectedValueByIndex - 1;
    }
  }, [
    currentSegment,
    draggerRadius,
    offsetPosition,
    selectedValueByIndex,
    sliderWidth,
    startPosition,
    values,
  ]);

  useEffect(() => {
    if (thumbWidth) {
      console.log('thumb update', thumbWidth);
      setDraggerRadius(thumbWidth / 2);
    }
  }, [draggerRadius, thumbWidth]);

  return {
    gesture,
    animatedBackground,
    animatedWidth,
    animatedXPosition,
  };
};
