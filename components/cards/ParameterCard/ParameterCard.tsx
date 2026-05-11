import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronDown, FlaskConical } from 'lucide-react-native';

import { Colors } from 'Constants/Colors';

type ParameterCardProps = {
  title: string;
  count: number;
  items: string[];
  isOpen: boolean;
  onPress: () => void;
};

const ParameterCard = ({ title, count, items, isOpen, onPress }: ParameterCardProps) => {
  return (
    <View style={styles.sectionCard}>
      <Pressable onPress={onPress} style={styles.sectionHeader}>
        <View style={styles.sectionLeft}>
          <FlaskConical size={16} color={Colors.textRed} strokeWidth={2.3} />

          <Text style={styles.sectionTitle}>
            {title} ({count} parameters)
          </Text>
        </View>

        <ChevronDown
          size={18}
          color="#173042"
          strokeWidth={2.3}
          style={{
            transform: [
              {
                rotate: isOpen ? '180deg' : '0deg',
              },
            ],
          }}
        />
      </Pressable>

      {isOpen && items.length > 0 ? (
        <View style={styles.itemsContainer}>
          {items.map((item, itemIndex) => (
            <Text key={item} style={styles.itemText}>
              {itemIndex + 1}. {item}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    marginTop: 14,
    overflow: 'hidden',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.textRed,
    backgroundColor: Colors.redishBG,
    shadowColor: Colors.blueShadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    marginLeft: 12,
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#173042',
  },
  itemsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E8EEF4',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
  },
  itemText: {
    fontSize: 14,
    lineHeight: 28,
    color: '#53687B',
  },
});

export default ParameterCard;
