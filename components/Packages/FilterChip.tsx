import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { BriefcaseMedical, FlaskConical, HeartPulse, LucideIcon } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'Constants/Colors';

type FilterChipProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
  icon?: LucideIcon;
};

const FilterChip = ({
  label,
  active = false,
  onPress,
  icon: Icon = FlaskConical,
}: FilterChipProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="mr-3 flex-row items-center rounded-full border px-4 py-2"
      style={{
        backgroundColor: active ? Colors.chipActiveBackground : Colors.textWhite,
        borderColor: active ? Colors.chipActiveBackground : Colors.chipBorder,
        shadowColor: active ? Colors.chipActiveShadow : Colors.blueShadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: active ? 0.22 : 0.08,
        shadowRadius: active ? 14 : 10,
        elevation: active ? 6 : 3,
      }}>
      <View
        className="mr-2 h-6 w-6 overflow-hidden rounded-full"
        style={{
          shadowColor: active ? Colors.chipActiveShadow : Colors.blueShadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: active ? 0.24 : 0.16,
          shadowRadius: 8,
          elevation: 4,
        }}>
        {active ? (
          <View
            className="flex-1 items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.16)' }}>
            <Icon size={12} color={Colors.textWhite} strokeWidth={2.2} />
          </View>
        ) : (
          <LinearGradient
            colors={[Colors.chipIconGlossStart, Colors.chipIconGlossEnd]}
            start={{ x: 0.15, y: 0.05 }}
            end={{ x: 0.9, y: 1 }}
            className="flex-1 items-center justify-center">
            <View
              pointerEvents="none"
              className="absolute left-[3px] right-[3px] top-[2px] h-[7px] rounded-full"
              style={{ backgroundColor: Colors.chipIconShine }}
            />
            <Icon size={12} color={Colors.chipIconInactive} strokeWidth={2.2} />
          </LinearGradient>
        )}
      </View>

      <Text
        className="text-xs font-medium"
        style={{ color: active ? Colors.textWhite : Colors.chipLabelInactive }}>
        {label}
      </Text>
    </Pressable>
  );
};

export default FilterChip;

export const FilterChipIcons = {
  all: BriefcaseMedical,
  health: HeartPulse,
  test: FlaskConical,
};
