import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Check, Search, X } from 'lucide-react-native';

import { Colors } from 'Constants/Colors';
import CustomTextIput from 'components/Inputs/CustomTextIput';
import { type PackageItem } from 'components/cards/PackagesCards/PackageCards';

export type SelectablePackageItem = PackageItem & {
  id: string;
};

type PackageSelectionModalProps = {
  visible: boolean;
  packages: SelectablePackageItem[];
  selectedPackageId: string | null;
  onClose: () => void;
  onSelectPackage: (item: SelectablePackageItem) => void;
};

const PackageSelectionModal = ({
  visible,
  packages,
  selectedPackageId,
  onClose,
  onSelectPackage,
}: PackageSelectionModalProps) => {
  const [searchValue, setSearchValue] = useState('');

  const filteredPackages = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    if (!query) {
      return packages;
    }

    return packages.filter((item) =>
      [item.title, item.badge, item.audience, item.parameters].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [packages, searchValue]);

  const handleClose = () => {
    setSearchValue('');
    onClose();
  };

  const handleSelect = (item: SelectablePackageItem) => {
    setSearchValue('');
    onSelectPackage(item);
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <BlurView intensity={70} tint="dark" style={styles.blurLayer}>
          <Pressable style={styles.backdrop} onPress={handleClose} />
        </BlurView>

        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.headerCopy}>
              <Text style={styles.heading}>Select Package</Text>
              <Text style={styles.subheading}>
                Search all packages and choose the closest option for this home visit.
              </Text>
            </View>

            <TouchableOpacity activeOpacity={0.85} onPress={handleClose} style={styles.closeButton}>
              <X size={16} color={Colors.textBlack} strokeWidth={2.3} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchWrap}>
            <View style={styles.searchIconWrap}>
              <Search size={16} color={Colors.textBlue} strokeWidth={2.3} />
            </View>
            <CustomTextIput
              value={searchValue}
              onChangeText={setSearchValue}
              placeholder="Search package, type, or audience"
              textClassName="flex-1 text-sm"
            />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            style={styles.list}>
            {filteredPackages.map((item) => {
              const isSelected = selectedPackageId === item.id;

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.9}
                  onPress={() => handleSelect(item)}
                  style={[styles.packageCard, isSelected ? styles.packageCardActive : null]}>
                  <View style={styles.packageTopRow}>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>

                    <View style={[styles.checkWrap, isSelected ? styles.checkWrapActive : null]}>
                      {isSelected ? <Check size={14} color={Colors.textWhite} strokeWidth={3} /> : null}
                    </View>
                  </View>

                  <Text style={styles.packageTitle}>{item.title}</Text>
                  <Text style={styles.packageMeta}>
                    {item.audience} · {item.parameters}
                  </Text>
                  <Text style={styles.packagePrice}>{item.price}</Text>
                </TouchableOpacity>
              );
            })}

            {filteredPackages.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No packages found</Text>
                <Text style={styles.emptyText}>Try a different name, type, or audience keyword.</Text>
              </View>
            ) : null}
          </ScrollView>
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
    backgroundColor: 'rgba(0,0,0,0.62)',
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
    maxHeight: '84%',
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: Colors.textWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 14,
    backgroundColor: Colors.redishBG,
  },
  headerCopy: {
    flex: 1,
    paddingRight: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textBlack,
  },
  subheading: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textGray,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.textWhite,
  },
  searchWrap: {
    marginHorizontal: 18,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.textWhite,
    borderWidth: 1,
    borderColor: Colors.chipBorder,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  searchIconWrap: {
    marginRight: 10,
  },
  list: {
    marginTop: 14,
  },
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  packageCard: {
    marginBottom: 12,
    borderRadius: 22,
    backgroundColor: Colors.textWhite,
    borderWidth: 1,
    borderColor: Colors.chipBorder,
    padding: 16,
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  packageCardActive: {
    borderColor: Colors.textBlue,
    backgroundColor: Colors.blueshBG,
  },
  packageTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    borderRadius: 999,
    backgroundColor: Colors.redishBG,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textRed,
  },
  checkWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.chipBorder,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.textWhite,
  },
  checkWrapActive: {
    backgroundColor: Colors.textBlue,
    borderColor: Colors.textBlue,
  },
  packageTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textBlack,
  },
  packageMeta: {
    marginTop: 4,
    fontSize: 13,
    color: Colors.textGray,
  },
  packagePrice: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textBlue,
  },
  emptyState: {
    borderRadius: 22,
    backgroundColor: Colors.textWhite,
    borderWidth: 1,
    borderColor: Colors.chipBorder,
    padding: 18,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textBlack,
  },
  emptyText: {
    marginTop: 4,
    fontSize: 13,
    color: Colors.textGray,
    textAlign: 'center',
  },
});

export default PackageSelectionModal;
