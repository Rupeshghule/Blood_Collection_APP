import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'Constants/Colors';

type DateTileProps = {
  label: string;
  value: string;
  active: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
  className?: string;
};

const DateTile = ({ label, value, active, onPress, icon, className = 'mr-3' }: DateTileProps) => {
  const hasValue = value.trim().length > 0;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`${className} h-[66px] w-[66px] items-center justify-center overflow-hidden rounded-[20px]`}
      style={active ? styles.activeTile : styles.tile}>
      <LinearGradient
        colors={
          active
            ? [Colors.textBlue, '#1495C9']
            : [Colors.textWhite, '#FFF7F8', '#F5FBFD']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.tileGradient}
      />

      <LinearGradient
        colors={
          active
            ? ['rgba(255,255,255,0.24)', 'rgba(255,255,255,0)']
            : ['rgba(255,255,255,0.95)', 'rgba(255,255,255,0)']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.tileGloss}
      />

      {icon ? <View className={hasValue ? 'mb-1' : 'mb-2'}>{icon}</View> : null}

      <Text className="text-[10px] font-bold" style={{ color: active ? Colors.textWhite : Colors.textGray }}>
        {label}
      </Text>

      {hasValue ? (
        <Text className={`${icon ? '' : 'mt-1'} text-2xl font-extrabold`} style={{ color: active ? Colors.textWhite : Colors.textBlack }}>
          {value}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  activeTile: {
    borderWidth: 1,
    borderColor: 'rgba(20,149,201,0.22)',
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 6,
  },
  tile: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.78)',
    shadowColor: Colors.textBlack,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 4,
  },
  tileGloss: {
    position: 'absolute',
    top: -12,
    left: -6,
    width: 92,
    height: 46,
    borderRadius: 999,
  },
  tileGradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default DateTile;
