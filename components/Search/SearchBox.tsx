import React from 'react';
import { Text, View } from 'react-native';
import { Search } from 'lucide-react-native';
import CustomTextIput from 'components/Inputs/CustomTextIput';

const SearchBox = () => {
  return (
    <View className="mt-5 px-4">
      <View
        className="overflow-hidden rounded-full border border-white/60"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.32)',
          shadowColor: '#7FA5BE',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.14,
          shadowRadius: 20,
          elevation: 6,
        }}>
        <View
          pointerEvents="none"
          className="absolute left-4 right-4 top-0 h-[1px]"
          style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}
        />

        <View
          className="h-[56px] flex-row items-center rounded-full px-4"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)' }}>
          <View
            className="h-9 w-9 items-center justify-center rounded-full border border-white/40"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.28)' }}>
            <Search size={18} color="#5C7488" strokeWidth={2.3} />
          </View>

          <CustomTextIput
            placeholder="Search for blood tests or packages"
            placeholderTextColor="rgba(44, 62, 80, 0.62)"
            textClassName="ml-3 flex-1 text-sm"
            style={{ color: '#173042' }}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchBox;
