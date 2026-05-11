import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Colors } from 'Constants/Colors';

type CustomCircleButtonProps = TouchableOpacityProps & {
  icon: React.ReactNode;
  title: string;
};

const CustomCircleButton = ({ icon, title, style, ...props }: CustomCircleButtonProps) => {
  return (
    <TouchableOpacity className="h-[65px] w-[65px] items-center justify-center rounded-full bg-[#006B9A]" style={[styles.shadow, style]} {...props}>
      {icon}

      <Text className="mt-1 text-center text-xs font-semibold" style={{ color: Colors.textWhite }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#1EA7E1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 8,
  },
});

export default CustomCircleButton;
