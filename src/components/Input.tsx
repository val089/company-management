import { useState } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { VisibleEyeIcon, VisibleOffEyeIcon } from '@app/assets/icons';
import { fontColor, GlobalStyles } from '@app/constants/styles';

import { Typography } from './Typography';

interface InputProps<FormData extends FieldValues> extends UseControllerProps<FormData> {
  label: string;
  type?: 'password' | 'email' | null;
}
export const Input = <FormData extends FieldValues>({
  name,
  label,
  control,
  style,
  type = null,
  ...restProps
}: InputProps<FormData> & TextInputProps) => {
  const {
    field,
    fieldState: { error, isTouched, invalid },
  } = useController({
    name,
    control,
    rules: { required: true },
  });
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isSuccess = !error && field.value;

  let inputBorderColor = GlobalStyles.colors.grey700;

  if (isFocused) {
    inputBorderColor = GlobalStyles.colors.black;
  }

  if (isSuccess) {
    inputBorderColor = GlobalStyles.colors.green100;
  }

  if (error && invalid && isTouched) {
    inputBorderColor = GlobalStyles.colors.error100;
  }

  return (
    <View style={style}>
      <Typography type="small">{label}</Typography>
      <TextInput
        style={[styles.input, { borderColor: inputBorderColor }]}
        onBlur={() => {
          setIsFocused(false);
          field.onBlur();
        }}
        onChangeText={field.onChange}
        onFocus={() => setIsFocused(true)}
        value={field.value}
        keyboardType={type === 'email' ? 'email-address' : 'default'}
        secureTextEntry={type === 'password' && !isPasswordVisible}
        {...restProps}
      />
      {type === 'password' && (
        <View style={styles.eyeIcon}>
          <Pressable onPress={() => setIsPasswordVisible(prev => !prev)}>
            {!isPasswordVisible ? <VisibleOffEyeIcon /> : <VisibleEyeIcon />}
          </Pressable>
        </View>
      )}
      {error && <Text style={styles.textError}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: fontColor,
    paddingHorizontal: 16,
    borderColor: GlobalStyles.colors.grey500,
    borderWidth: 1,
    borderRadius: 24,
    fontSize: 16,
    height: 52,
  },
  inputFocused: {
    borderWidth: 2,
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
  eyeIcon: {
    position: 'absolute',
    top: 33,
    right: 20,
  },
});
