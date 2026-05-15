import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import FilterChip from './FilterChip';

export type PackageFilterItem = {
  id: string;
  label: string;
  icon?: LucideIcon;
};

type PackageFilterChipsProps = {
  filters: PackageFilterItem[];
  defaultSelectedId?: string;
  onSelect?: (filter: PackageFilterItem) => void;
};

const PackageFilterChips = ({
  filters,
  defaultSelectedId,
  onSelect,
}: PackageFilterChipsProps) => {
  const [selectedId, setSelectedId] = useState(defaultSelectedId ?? filters[0]?.id);

  const handlePress = (filter: PackageFilterItem) => {
    setSelectedId(filter.id);
    onSelect?.(filter);
  };

  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingRight: 28 }}>
        {filters.map((filter) => (
          <FilterChip
            key={filter.id}
            label={filter.label}
            icon={filter.icon}
            active={filter.id === selectedId}
            onPress={() => handlePress(filter)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default PackageFilterChips;
