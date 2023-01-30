import React, { ComponentProps, useRef, useState, useEffect } from 'react';
import { useField } from 'formik';
import {
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Text,
  Pressable,
} from 'react-native';
import VisibleEye from '@app/assets/icons/VisibleEye';
import VisibleOffEye from '@app/assets/icons/VisibleOffEye';
import { GlobalStyles } from '@app/constants/styles';

type TextFieldProps = ComponentProps<typeof TextInput> & {
  name: string;
  label: string;
  type?: 'password' | 'email' | null;
};

export const CustomTextField = ({
  name,
  type = null,
  label,
  onBlur,
  onFocus,
  ...restProps
}: TextFieldProps) => {
  const [field, meta] = useField({
    name,
  });
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const focusAnim = useRef(new Animated.Value(0)).current;

  const isError = (meta.error && meta.touched) || (meta.error && !!field.value);
  const isSuccess = !meta.error && field.value;

  let borderColor = isFocused ? GlobalStyles.colors.white : GlobalStyles.colors.grey700;

  let labelColor =
    isFocused || !!field.value ? GlobalStyles.colors.white : GlobalStyles.colors.grey700;
  if (isError) {
    borderColor = GlobalStyles.colors.error100;
    labelColor = GlobalStyles.colors.error100;
  }

  if (isSuccess) {
    borderColor = GlobalStyles.colors.green100;
  }

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!field.value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [focusAnim, isFocused, field.value]);

  const onToggleVisiblilityHandler = () => setIsPasswordVisible(prev => !prev);

  return (
    <View>
      <TextInput
        keyboardType={type === 'email' ? 'email-address' : 'default'}
        secureTextEntry={type === 'password' && isPasswordVisible}
        ref={inputRef}
        style={[styles.input, { borderColor }]}
        value={field.value}
        {...restProps}
        onBlur={event => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={event => {
          setIsFocused(true);
          onFocus?.(event);
        }}
      />
      <Animated.View
        style={[
          styles.labelContainer,
          {
            top: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [15, -8],
            }),
          },
        ]}>
        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
          <Animated.Text
            style={[
              styles.label,
              {
                fontSize: focusAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [16, 12],
                }),
                color: labelColor,
              },
            ]}>
            {label}
            {isError ? '*' : ''}:
          </Animated.Text>
        </TouchableWithoutFeedback>
      </Animated.View>
      {type === 'password' && (
        <View style={styles.eyeIcon}>
          <Pressable style={styles.eyeIcon} onPress={onToggleVisiblilityHandler}>
            {!isPasswordVisible ? <VisibleEye /> : <VisibleOffEye />}
          </Pressable>
        </View>
      )}
      {isError && <Text style={styles.textError}>{meta.error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: GlobalStyles.colors.white,
    paddingHorizontal: 29,
    borderColor: GlobalStyles.colors.grey500,
    borderWidth: 1,
    borderRadius: 24,
    fontSize: 16,
    height: 52,
  },
  inputFocus: {
    borderColor: GlobalStyles.colors.white,
  },
  inputError: {
    borderColor: GlobalStyles.colors.error100,
  },
  inputSuccess: {
    borderColor: GlobalStyles.colors.green100,
  },
  textError: {
    marginTop: 4,
    fontSize: 12,
    color: GlobalStyles.colors.error100,
  },
  labelContainer: {
    position: 'absolute',
    left: 16,
    top: -6,
    paddingHorizontal: 8,
    backgroundColor: GlobalStyles.colors.primary100,
  },
  label: {
    color: GlobalStyles.colors.grey500,
    fontSize: 12,
  },
  eyeIcon: {
    position: 'absolute',
    top: 7,
    right: 10,
  },
});
