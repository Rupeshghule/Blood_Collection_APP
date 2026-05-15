import React, { forwardRef } from 'react';
import { TextInput, TextInputProps, TextStyle, StyleProp } from 'react-native';
import { Colors } from 'Constants/Colors';

type CustomTextIputProps = TextInputProps & {
  textClassName?: string;
  textStyle?: StyleProp<TextStyle>;
};

const CustomTextIput = forwardRef<TextInput, CustomTextIputProps>(
  ({ placeholderTextColor = '#9CA3AF', textClassName = 'flex-1 text-sm', textStyle, style, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        placeholderTextColor={placeholderTextColor}
        className={textClassName}
        style={[{ color: Colors.textBlack }, textStyle, style]}
        {...props}
      />
    );
  }
);

CustomTextIput.displayName = 'CustomTextIput';

export default CustomTextIput;
