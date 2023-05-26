import React, { ReactNode, useMemo } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { GlobalStyles } from '@app/constants/styles';
import { Typography } from './Typography';

type RadioProps = {
  label?: string;
  size?: number;
  onPress: () => void;
  value: string;
  option: string;
  children?: ReactNode;
  type?: 'button-primary' | 'button-secondary';
};

export const Radio = ({
  label = '',
  onPress,
  value,
  option,
  size = 42,
  type,
  children,
}: RadioProps) => {
  const radioContainerSize = useMemo(() => {
    return {
      width: size,
      height: size,
    };
  }, [size]);

  const radioSize = useMemo(() => {
    return {
      width: size * 0.7619,
      height: size * 0.7619,
    };
  }, [size]);

  switch (type) {
    case 'button-primary': {
      return (
        <Pressable
          style={[styles.root, styles.rootRadioButton, value === option && styles.selected]}
          onPress={onPress}>
          <View
            style={[
              styles.radioContainer,
              value === option && styles.selected,
              radioContainerSize,
            ]}>
            <View style={[value === option && styles.radioSelected, radioSize]} />
          </View>
          {label ? (
            <Typography type="normal" style={styles.label}>
              {label}
            </Typography>
          ) : (
            <View>{children}</View>
          )}
        </Pressable>
      );
    }
    case 'button-secondary': {
      return (
        <Pressable
          style={[
            styles.root,
            styles.rootSecondary,
            styles.rootRadioButtonSecondary,
            value === option && styles.selected,
          ]}
          onPress={onPress}>
          <View
            style={[
              styles.radioContainer,
              value === option && styles.selected,
              radioContainerSize,
            ]}>
            <View style={[value === option && styles.radioSelected, radioSize]} />
          </View>
          {label ? (
            <Typography type="normal" style={styles.labelSecondary}>
              {label}
            </Typography>
          ) : (
            <View>{children}</View>
          )}
        </Pressable>
      );
    }
    default:
      return (
        <View style={styles.root}>
          <Pressable
            style={[styles.radioContainer, value === option && styles.selected, radioContainerSize]}
            onPress={onPress}>
            <View style={[value === option && styles.radioSelected, radioSize]} />
          </Pressable>
          {label ? (
            <Typography type="normal" style={styles.label}>
              {label}
            </Typography>
          ) : (
            <View>{children}</View>
          )}
        </View>
      );
  }
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
  },
  rootSecondary: {
    backgroundColor: '#fff',
  },
  rootRadioButton: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.white,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  rootRadioButtonSecondary: {
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
  },
  selected: {
    borderColor: GlobalStyles.colors.blue100,
  },
  radioSelected: {
    backgroundColor: GlobalStyles.colors.blue100,
    borderRadius: 50,
  },
  label: {
    paddingLeft: 18,
  },
  labelSecondary: {
    paddingLeft: 18,
    color: GlobalStyles.colors.white,
  },
  radioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.grey700,
  },
});
