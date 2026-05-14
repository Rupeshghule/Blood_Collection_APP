import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from 'Constants/Colors';
import { X } from 'lucide-react-native';

import CustomButton from 'components/Buttons/CustomButton';
import CustomTextIput from 'components/Inputs/CustomTextIput';

export type AddFamilyMemberModalConfig = {
  visible: boolean;
  fullName: string;
  age: string;
  bloodGroup: string;
  relation: string;
  onChangeFullName: (value: string) => void;
  onChangeAge: (value: string) => void;
  onChangeBloodGroup: (value: string) => void;
  onChangeRelation: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

type AddFamilyMemberModalProps = {
  modal: AddFamilyMemberModalConfig;
};

const AddFamilyMemberModal = ({ modal }: AddFamilyMemberModalProps) => {
  const isDisabled = !(
    modal.fullName.trim() &&
    modal.age.trim() &&
    modal.bloodGroup.trim() &&
    modal.relation.trim()
  );

  return (
    <Modal visible={modal.visible} transparent animationType="fade" onRequestClose={modal.onClose}>
      <View style={styles.overlay}>
        <BlurView intensity={70} tint="dark" style={styles.blurLayer}>
          <Pressable style={styles.backdrop} onPress={modal.onClose} />
        </BlurView>

        <View style={styles.sheet}>
          <View pointerEvents="none" style={styles.innerGlow} />
          <View pointerEvents="none" style={styles.glossTop} />

          <View style={styles.headerRow}>
            <View style={styles.headerContent}>
              <Text style={styles.heading}>Add Family Member</Text>
              <Text style={styles.description}>
                Add a member once, then reuse them quickly while booking.
              </Text>
            </View>

            <TouchableOpacity onPress={modal.onClose} style={styles.headerButton}>
              <X size={14} color={Colors.textBlack} strokeWidth={2.4} />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <View style={styles.inputCard}>
                <CustomTextIput
                  value={modal.fullName}
                  onChangeText={modal.onChangeFullName}
                  placeholder="Enter full name"
                  placeholderTextColor={Colors.textGray}
                  textClassName="text-[15px]"
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.fieldBlock, styles.rowField]}>
                <Text style={styles.fieldLabel}>Age</Text>
                <View style={styles.inputCard}>
                  <CustomTextIput
                    value={modal.age}
                    onChangeText={modal.onChangeAge}
                    placeholder="Enter age"
                    placeholderTextColor={Colors.textGray}
                    textClassName="text-[15px]"
                    keyboardType="number-pad"
                    returnKeyType="next"
                  />
                </View>
              </View>

              <View style={[styles.fieldBlock, styles.rowField]}>
                <Text style={styles.fieldLabel}>Blood Group</Text>
                <View style={styles.inputCard}>
                  <CustomTextIput
                    value={modal.bloodGroup}
                    onChangeText={modal.onChangeBloodGroup}
                    placeholder="Ex. B+"
                    placeholderTextColor={Colors.textGray}
                    textClassName="text-[15px]"
                    autoCapitalize="characters"
                    returnKeyType="next"
                  />
                </View>
              </View>
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>Relation</Text>
              <View style={styles.inputCard}>
                <CustomTextIput
                  value={modal.relation}
                  onChangeText={modal.onChangeRelation}
                  placeholder="Ex. Mother, Brother, Daughter"
                  placeholderTextColor={Colors.textGray}
                  textClassName="text-[15px]"
                  autoCapitalize="words"
                  returnKeyType="done"
                />
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.buttonRow}>
              <View style={styles.buttonWrapper}>
                <CustomButton
                  title="Save Family Member"
                  width="w-full"
                  height="h-12"
                  rounded="rounded-2xl"
                  size="text-[16px]"
                  backgroundColor={Colors.textBlue}
                  textColor={Colors.textWhite}
                  showArrow={false}
                  onPress={modal.onSave}
                  disabled={isDisabled}
                  buttonStyle={isDisabled ? styles.disabledButton : undefined}
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
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
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
    shadowOffset: { width: 0, height: 18 },
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
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 18,
    backgroundColor: Colors.redishBG,
    elevation: 1,
  },
  headerContent: {
    flex: 1,
    paddingRight: 14,
  },
  headerButton: {
    width: 30,
    height: 30,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.82)',
  },
  heading: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textBlack,
  },
  description: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textGray,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  fieldBlock: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowField: {
    flex: 1,
  },
  fieldLabel: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textBlack,
  },
  inputCard: {
    borderRadius: 10,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.82)',
    shadowColor: '#7FA5BE',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.88)',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 26,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  footerTextBlock: {},
  footerTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '800',
    color: Colors.textBlack,
  },
  footerNote: {
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
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
  },
  disabledButton: {
    opacity: 0.55,
  },
});

export default AddFamilyMemberModal;
