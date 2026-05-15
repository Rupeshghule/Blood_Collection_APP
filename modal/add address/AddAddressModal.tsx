import React, { useEffect } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Crosshair, X } from 'lucide-react-native';

import { Colors } from 'Constants/Colors';
import CustomButton from 'components/Buttons/CustomButton';
import CustomTextIput from 'components/Inputs/CustomTextIput';
import { useLocationStore } from '../../store/useLocationStore';

export type AddAddressModalConfig = {
  visible: boolean;
  title: string;
  address: string;
  onChangeTitle: (value: string) => void;
  onChangeAddress: (value: string) => void;
  onUseCurrentLocation?: () => void;
  onClose: () => void;
  onSave: () => void;
};

type AddAddressModalProps = {
  modal: AddAddressModalConfig;
};

const AddAddressModal = ({ modal }: AddAddressModalProps) => {
  const address = useLocationStore((state) => state.address);
  const loading = useLocationStore((state) => state.loading);
  const fetchLocation = useLocationStore((state) => state.fetchLocation);

  useEffect(() => {
    if (!modal.visible || !address) {
      return;
    }

    modal.onChangeAddress(address);
  }, [address, modal]);

  return (
    <Modal visible={modal.visible} transparent animationType="fade" onRequestClose={modal.onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={modal.onClose} />

        <View style={styles.sheet}>
          <View className="flex-row items-start px-5 pb-4 pt-5" style={styles.header}>
            <View className="flex-1 pr-3">
              <Text className="text-lg font-extrabold" style={{ color: Colors.textBlack }}>
                Add New Address
              </Text>
              <Text className="mt-1 text-sm leading-5" style={{ color: Colors.textGray }}>
                Save a collection address for this booking.
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={modal.onClose}
              className="mt-0.5 h-8 w-8 items-center justify-center rounded-full bg-white"
              style={styles.closeButton}>
              <X size={16} color={Colors.textBlack} strokeWidth={2.3} />
            </TouchableOpacity>
          </View>

          <View className="px-5 pb-2 pt-4">
            <CustomButton
              title={loading ? 'Fetching Location...' : 'Use Current Location'}
              width="w-full"
              height="h-12"
              size="text-sm"
              backgroundColor={Colors.blueshBG}
              borderColor={Colors.chipBorder}
              textColor={Colors.textBlue}
              showArrow={false}
              icon={<Crosshair size={16} color={Colors.textBlue} strokeWidth={2.3} />}
              iconPosition="left"
              iconSpacing="mr-2"
              className="mb-3"
              onPress={async () => {
                await fetchLocation();
                modal.onUseCurrentLocation?.();
              }}
            />

            <View className="mb-3 rounded-[18px] bg-white px-4 py-4" style={styles.inputCard}>
              <Text className=" text-sm font-bold" style={{ color: Colors.textBlack }}>
                Address Title
              </Text>
              <CustomTextIput
                value={modal.title}
                onChangeText={modal.onChangeTitle}
                placeholder="Example: Home, Office"
                textClassName="text-sm"
              />
            </View>

            <View
              className="mb-3 rounded-[18px] bg-white px-4 py-4"
              style={[styles.inputCard, styles.addressCard]}>
              <Text className="text-sm font-bold" style={{ color: Colors.textBlack }}>
                Full Address
              </Text>
              <CustomTextIput
                value={modal.address}
                onChangeText={modal.onChangeAddress}
                placeholder="Enter complete collection address"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                textClassName="text-sm"
              />
            </View>
          </View>

          <View className="px-5 pb-5 pt-2">
            <CustomButton
              title="Save Address"
              width="w-full"
              height="h-12"
              rounded="rounded-2xl"
              size="text-sm"
              backgroundColor={Colors.textBlue}
              textColor={Colors.textWhite}
              showArrow={false}
              onPress={modal.onSave}
            />
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
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: Colors.textWhite,
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10,
  },
  header: {
    backgroundColor: Colors.redishBG,
  },
  closeButton: {
    backgroundColor: Colors.textWhite,
  },
  inputCard: {
    backgroundColor: Colors.textWhite,
    shadowColor: Colors.textBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  addressCard: {
    minHeight: 112,
  },
});

export default AddAddressModal;
