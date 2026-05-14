import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Check, Plus, X } from 'lucide-react-native';

import { Colors } from 'Constants/Colors';
import CustomButton from 'components/Buttons/CustomButton';

type FamilyMemberItem = {
  id: string;
  name: string;
  relation: string;
};

export type FamilyMembersListModalConfig = {
  visible: boolean;
  members: FamilyMemberItem[];
  selectedFamilyMemberId: string | null;
  onClose: () => void;
  onSelectMember: (memberId: string) => void;
  onAddNewFamilyMember: () => void;
};

type FamilyMembersListModalProps = {
  modal: FamilyMembersListModalConfig;
};

const FamilyMembersListModal = ({ modal }: FamilyMembersListModalProps) => {
  return (
    <Modal transparent visible={modal.visible} animationType="fade" onRequestClose={modal.onClose}>
      <View style={styles.overlay}>
        <BlurView intensity={70} tint="dark" style={styles.blurLayer}>
          <Pressable style={styles.backdrop} onPress={modal.onClose} />
        </BlurView>

        <View style={styles.sheet}>
          <View pointerEvents="none" style={styles.innerGlow} />
          <View pointerEvents="none" style={styles.glossTop} />

          <View style={styles.headerRow}>
            <View style={styles.headerContent}>
              <Text style={styles.heading}>Select Family Member</Text>
              <Text style={styles.description}>
                Choose an existing member or add a new family member below.
              </Text>
            </View>

            <TouchableOpacity onPress={modal.onClose} style={styles.headerButton}>
              <X size={14} color={Colors.textBlack} strokeWidth={2.4} />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              style={styles.listScroll}>
              {modal.members.map((member) => {
                const active = modal.selectedFamilyMemberId === member.id;

                return (
                  <TouchableOpacity
                    key={member.id}
                    activeOpacity={0.9}
                    onPress={() => modal.onSelectMember(member.id)}
                    style={[styles.memberCard, active ? styles.memberCardActive : null]}>
                    <View style={styles.memberCopy}>
                      <Text style={styles.memberName}>{member.name}</Text>
                      <Text style={styles.memberRelation}>{member.relation}</Text>
                    </View>

                    <View style={[styles.radioShell, active ? styles.radioShellActive : null]}>
                      {active ? <Check size={14} color={Colors.textWhite} strokeWidth={3} /> : null}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.footer}>
            <View style={styles.buttonRow}>
              <View style={styles.buttonWrapper}>
                <CustomButton
                  title="Add New Family Member"
                  width="w-full"
                  height="h-12"
                  rounded="rounded-2xl"
                  size="text-[16px]"
                  backgroundColor={Colors.textBlue}
                  textColor={Colors.textWhite}
                  showArrow={false}
                  icon={<Plus size={16} color={Colors.textWhite} />}
                  iconPosition="left"
                  iconSpacing="mr-2"
                  onPress={modal.onAddNewFamilyMember}
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
    paddingBottom: 14,
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
    paddingBottom: 12,
  },
  listScroll: {
    height: 372,
  },
  listContent: {
    paddingBottom: 8,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.82)',
    shadowColor: '#7FA5BE',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  memberCardActive: {
    borderColor: 'rgba(15, 116, 151, 0.28)',
    backgroundColor: '#F2FAFD',
  },
  memberCopy: {
    flex: 1,
  },
  memberName: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textBlack,
  },
  memberRelation: {
    marginTop: 6,
    fontSize: 14,
    color: Colors.textGray,
  },
  radioShell: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: 'rgba(15, 116, 151, 0.24)',
    backgroundColor: 'rgba(255,255,255,0.72)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioShellActive: {
    backgroundColor: Colors.textBlue,
    borderColor: Colors.textBlue,
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
});

export default FamilyMembersListModal;
