import React, { useRef, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { Animated, LayoutAnimation, Pressable, StyleSheet, Text, View } from 'react-native';
import { toggleAnimation } from '@app/animations/toggleAnimation';
import { RightArrowIcon } from '@app/assets/icons';
import { bgColor, GlobalStyles } from '@app/constants/styles';

import { Radio } from './Radio';
import { Typography } from './Typography';

type Props = {
  label: string;
  options: string[];
  name: string;
  control: Control;
};

export const Select = ({ label, options, name, control }: Props) => {
  const { field } = useController({
    name,
    control,
  });
  const [showContent, setShowContent] = useState(false);

  const animationController = useRef(new Animated.Value(0)).current;

  const toggleContent = () => {
    const config = {
      duration: 300,
      toValue: showContent ? 1 : 0,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setShowContent(prevState => !prevState);
  };

  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '-90deg'],
  });

  return (
    <View>
      <View style={styles.labelContainer}>
        {!!label && <Text style={styles.label}>{label}:</Text>}
      </View>

      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={toggleContent}
          android_ripple={{ color: GlobalStyles.colors.white }}>
          <Typography type="normal">{field.value}</Typography>
          <Animated.View
            style={[
              styles.icon,
              {
                transform: [{ rotateZ: arrowTransform }],
              },
            ]}>
            <RightArrowIcon fill={GlobalStyles.colors.white} />
          </Animated.View>
        </Pressable>

        {showContent &&
          options.map(option => (
            <Pressable
              key={option}
              style={styles.item}
              onPress={() => {
                field.onChange(option);
                setShowContent(prevState => !prevState);
              }}>
              <Radio
                size={31}
                label={option}
                option={field.value}
                value={option}
                onPress={() => {
                  field.onChange(option);
                  setShowContent(prevState => !prevState);
                }}
              />
            </Pressable>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 24,
    borderColor: GlobalStyles.colors.white,
    borderWidth: 1,
  },
  button: {
    paddingLeft: 10,
    height: 52,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    position: 'absolute',
    right: 16,
    width: 32,
    height: 32,
    backgroundColor: GlobalStyles.colors.blue100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    position: 'absolute',
    left: 16,
    top: -8,
    backgroundColor: bgColor,
    paddingHorizontal: 8,
    zIndex: 1,
  },
  label: {
    color: GlobalStyles.colors.white,
    fontSize: 12,
  },
  item: {
    borderTopWidth: 1,
    borderColor: GlobalStyles.colors.white,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
});
