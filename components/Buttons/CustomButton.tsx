import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from 'Constants/Colors';

type CustomButtonProps = TouchableOpacityProps & {
  title: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  pressedBackgroundColor?: string;
  height?: string;
  width?: string;
  size?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconSpacing?: string;
  rounded?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  className?: string;
  containerClassName?: string;
  showArrow?: boolean;
};

const isTailwindColorClass = (value?: string, prefix?: string) =>
  Boolean(value && prefix && value.startsWith(prefix));

const CustomButton = ({
  title,
  onPress,
  backgroundColor = Colors.textBlue,
  borderColor,
  textColor = Colors.textWhite,
  pressedBackgroundColor,
  height = 'h-12',
  width = 'w-full',
  size = 'text-sm',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  iconSpacing = 'mr-2',
  rounded = 'rounded-full',
  buttonStyle,
  textStyle,
  activeOpacity = 0.8,
  style,
  className = '',
  containerClassName = '',
  showArrow = false,
  ...props
}: CustomButtonProps) => {
  const backgroundClassName = isTailwindColorClass(backgroundColor, 'bg-') ? backgroundColor : '';
  const borderClassName = isTailwindColorClass(borderColor, 'border-') ? borderColor : '';
  const textClassName = isTailwindColorClass(textColor, 'text-') ? textColor : '';

  const resolvedButtonStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      styles.defaultButton,
      buttonStyle,
      style,
      backgroundColor && !backgroundClassName ? { backgroundColor } : null,
      borderColor && !borderClassName ? { borderWidth: 1, borderColor } : null,
      pressedBackgroundColor ? { overflow: 'hidden' } : null,
    ],
    [
      backgroundClassName,
      backgroundColor,
      borderClassName,
      borderColor,
      buttonStyle,
      pressedBackgroundColor,
      style,
    ]
  );

  const resolvedTextStyle = useMemo<StyleProp<TextStyle>>(
    () => [textStyle, textColor && !textClassName ? { color: textColor } : null],
    [textClassName, textColor, textStyle]
  );
  const resolvedIcon =
    icon ?? (showArrow ? <Text style={[styles.arrow, { color: textColor }]}>{'\u2192'}</Text> : null);

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      disabled={disabled || loading}
      style={resolvedButtonStyle}
      className={`
        ${backgroundClassName}
        ${height}
        ${width}
        ${rounded}
        flex-row
        items-center
        justify-center
        ${borderColor ? `border ${borderClassName}` : ''}
        ${disabled ? 'opacity-50' : ''}
        ${containerClassName}
        ${className}
      `}
      {...props}>
      {loading ? (
        <ActivityIndicator color={textColor && !textClassName ? textColor : Colors.textWhite} />
      ) : (
        <View className="flex-row items-center">
          {resolvedIcon && iconPosition === 'left' ? (
            <View className={iconSpacing}>{resolvedIcon}</View>
          ) : null}

          <Text className={`${textClassName} ${size} font-semibold`} style={resolvedTextStyle}>
            {title}
          </Text>

          {resolvedIcon && iconPosition === 'right' ? (
            <View className="ml-2">{resolvedIcon}</View>
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultButton: {
    shadowColor: '#1EA7E1',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 6,
  },
  arrow: {
    color: Colors.textWhite,
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '600',
  },
});

export default CustomButton;
