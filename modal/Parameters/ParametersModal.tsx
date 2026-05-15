import React, { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { ArrowRight, Star } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from 'Constants/Colors';
import CustomButton from 'components/Buttons/CustomButton';
import ParameterCard from 'components/cards/ParameterCard/ParameterCard';
import { type PackageItem } from 'components/cards/PackagesCards/PackageCards';

type ParametersModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  parameters: string;
  price: string;
  oldPrice: string;
  note: string;
};

const defaultSections = [
  {
    title: 'Complete Hemogram',
    count: 24,
    items: ['Average Blood Glucose (ABG)'],
  },
  {
    title: 'Diabetes',
    count: 4,
    items: ['Average Blood Glucose (ABG)', 'Blood Ketone (D3HB)', 'Fructosamine', 'HbA1c'],
  },
  {
    title: 'Lipid Profile',
    count: 10,
    items: [],
  },
  {
    title: 'Liver Profile',
    count: 12,
    items: [],
  },
  {
    title: 'Renal or Kidney Profile',
    count: 7,
    items: [],
  },
];

const ParametersModal = ({
  visible,
  onClose,
  title,
  description,
  parameters,
  price,
  oldPrice,
  note,
}: ParametersModalProps) => {
  const [openSection, setOpenSection] = useState(1);
  const navigation = useNavigation<any>();

  const heading = useMemo(() => title || 'Health Package', [title]);
  const packageData: PackageItem = {
    badge: 'Package',
    audience: 'General',
    title,
    description,
    parameters,
    price,
    oldPrice,
    note,
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <BlurView intensity={70} tint="dark" style={styles.blurLayer}>
          <Pressable style={styles.backdrop} onPress={onClose} />
        </BlurView>

        <View style={styles.sheet}>
          <View pointerEvents="none" style={styles.innerGlow} />

          <View pointerEvents="none" style={styles.glossTop} />

          <View style={styles.headerRow}>
            <Text style={styles.heading}>{heading}</Text>
          </View>

          <FlatList
            data={defaultSections}
            keyExtractor={(item) => item.title}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            ListHeaderComponent={
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Star size={18} color={Colors.textRed} fill={Colors.textRed} strokeWidth={2.2} />

                  <Text style={styles.summaryText}>{parameters}</Text>
                </View>
              </View>
            }
            renderItem={({ item: section, index }) => {
              const isOpen = openSection === index;

              return (
                <ParameterCard
                  title={section.title}
                  count={section.count}
                  items={section.items}
                  isOpen={isOpen}
                  onPress={() => setOpenSection(isOpen ? -1 : index)}
                />
              );
            }}
          />

          <View style={styles.footer}>
            <View style={styles.packageDetails}>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{price}</Text>

                <Text style={styles.oldPrice}>{oldPrice}</Text>
              </View>

              <Text style={styles.note}>{note}</Text>
            </View>

            <View style={styles.buttonRow}>
              {/* <View style={styles.buttonWrapper}>
                <CustomButton
                  title="Add to cart"
                  width="w-[48%]"
                  height="h-12"
                  rounded="rounded-2xl"
                  size="text-[16px]"
                  backgroundColor={Colors.textRed}
                  textColor={Colors.textWhite}
                  showArrow={false}
                />
              </View> */}

              <View style={styles.buttonWrapper}>
                <CustomButton
                  title="Book Now"
                  width="w-full"
                  height="h-12"
                  rounded="rounded-2xl"
                  size="text-[16px]"
                  backgroundColor={Colors.textBlue}
                  textColor={Colors.textWhite}
                  showArrow={false}
                  icon={<ArrowRight size={14} color={Colors.textWhite} />}
                  iconPosition="right"
                  onPress={() => {
                    onClose();
                    navigation.navigate('BookingScreen', { packageData });
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    backgroundColor: 'rgba(15, 31, 46, 0.5)',
  },

  blurLayer: {
    ...StyleSheet.absoluteFillObject,
  },

  backdrop: {
    flex: 1,
  },

  sheet: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '88%',

    overflow: 'hidden',

    borderRadius: 36,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.72)',

    backgroundColor: 'rgba(255,255,255,0.92)',

    shadowColor: '#7FA5BE',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.22,
    shadowRadius: 28,

    elevation: 18,
  },

  innerGlow: {
    position: 'absolute',
    top: -90,
    left: -40,
    right: -40,
    height: 200,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },

  glossTop: {
    position: 'absolute',
    top: -18,
    left: 28,
    right: 28,
    height: 90,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 18,
    backgroundColor: Colors.redishBG,
    elevation: 1,
  },

  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(255,255,255,0.72)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.82)',
  },

  heading: {
    flex: 1,

    marginLeft: 14,

    fontSize: 22,
    fontWeight: '800',

    color: Colors.textBlack,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop: 12,
  },

  summaryCard: {
    borderRadius: 24,

    paddingHorizontal: 18,
    paddingVertical: 18,

    backgroundColor: `${Colors.blueShadow}`,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.82)',
    elevation: 5,
  },

  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  summaryText: {
    marginLeft: 10,

    fontSize: 18,
    fontWeight: '700',

    color: Colors.textWhite,
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.88)',
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  packageDetails: {},
  packageTitle: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '800',
    color: Colors.textBlack,
  },
  packageDescription: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 28,
    color: Colors.textGray,
  },
  parametersRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  parametersText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textBlack,
  },
  priceRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.textRed,
  },
  oldPrice: {
    marginLeft: 12,
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: Colors.textGray,
  },
  note: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.textBlue,
  },
  buttonRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  buttonWrapper: {
    flex: 1,
    shadowColor: '#7FA5BE',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.18,
    shadowRadius: 18,
  },
});

export default ParametersModal;
