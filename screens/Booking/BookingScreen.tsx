import { View, Text, StatusBar, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'Constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CalendarDays, MessageCircle, Plus } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from 'components/Buttons/CustomButton';
import AddressCard from 'components/Booking/AddressCard';
import DateTile from 'components/Booking/DateTile';
import PricingSummaryCard from 'components/Booking/PricingSummaryCard';
import TimeSlotGrid from 'components/Booking/TimeSlotGrid';
import CustomTextIput from 'components/Inputs/CustomTextIput';
import { type PackageItem } from 'components/cards/PackagesCards/PackageCards';
import AddFamilyMemberModal from '../../modal/add member/AddFamilyMemberModal';
import type { AddFamilyMemberModalConfig } from '../../modal/add member/AddFamilyMemberModal';
import FamilyMembersListModal from '../../modal/add member/FamilyMembersListModal';
import type { FamilyMembersListModalConfig } from '../../modal/add member/FamilyMembersListModal';
import sendWhatsAppMessage from '../../utils/sendWhatsAppMessage';

const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + days);
  return nextDate;
};

const isSameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

const getDayLabel = (date: Date, offset: number) => {
  if (offset === 0) {
    return 'TODAY';
  }

  return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
};

type RouteParams = {
  packageData?: PackageItem;
};

const fallbackPackage: PackageItem = {
  badge: 'Executive',
  audience: 'Adults',
  title: 'Executive Full Body Package',
  description:
    'Comprehensive preventive health package covering essential blood testing, routine screening, and home collection convenience.',
  parameters: '96 Parameters',
  price: 'Rs. 3,000',
  oldPrice: 'Rs. 3,600',
  note: 'Home collection included',
};

const parseCurrencyValue = (value: string) => {
  const numericValue = Number(value.replace(/[^\d.]/g, ''));
  return Number.isFinite(numericValue) ? numericValue : 0;
};

const formatCurrency = (value: number) => `Rs. ${value.toLocaleString('en-IN')}`;

const familyMembers = [
  { id: 'self', name: 'Rupesh Ghule', relation: 'Self' },
  { id: 'mother', name: 'Anita Ghule', relation: 'Mother' },
  { id: 'father', name: 'Suresh Ghule', relation: 'Father' },
  { id: 'sister', name: 'Pooja Ghule', relation: 'Sister' },
];

const defaultAddress = {
  title: 'Home',
  address: '402, Highline Residency, Hadapsar, Pune - 411028',
};

const BookingScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { packageData = fallbackPackage } = (route.params as RouteParams) ?? {};
  const today = new Date();
  const presetDates = [0, 1, 2].map((offset) => {
    const date = addDays(today, offset);

    return {
      id: `preset-${offset}`,
      label: getDayLabel(date, offset),
      value: date.getDate().toString(),
      date,
    };
  });

  const [selectedDate, setSelectedDate] = useState<Date>(presetDates[0].date);
  const [selectedSlot, setSelectedSlot] = useState('08:00 AM');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDate, setCustomDate] = useState<Date | null>(null);
  const [fullName, setFullName] = useState('');
  const [members, setMembers] = useState(familyMembers);
  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [showAddFamilyModal, setShowAddFamilyModal] = useState(false);
  const [selectedFamilyMemberId, setSelectedFamilyMemberId] = useState<string | null>(null);
  const [newFamilyName, setNewFamilyName] = useState('');
  const [newFamilyAge, setNewFamilyAge] = useState('');
  const [newFamilyBloodGroup, setNewFamilyBloodGroup] = useState('');
  const [newFamilyRelation, setNewFamilyRelation] = useState('');

  const isPresetSelected = presetDates.some((item) => isSameDay(item.date, selectedDate));

  const handleDateValueChange = (
    _event: { nativeEvent: { timestamp: number; utcOffset: number } },
    pickedDate: Date
  ) => {
    setCustomDate(pickedDate);
    setSelectedDate(pickedDate);
    setShowDatePicker(false);
  };

  const customLabel = customDate
    ? customDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
    : 'PICK';

  const customValue = customDate ? customDate.getDate().toString() : '';
  const packagePriceValue = parseCurrencyValue(packageData.price);
  const collectionChargeValue = 0;
  const serviceTaxValue = 84;
  const totalAmountValue = packagePriceValue + collectionChargeValue + serviceTaxValue;
  const selectedFamilyMember =
    members.find((member) => member.id === selectedFamilyMemberId) ?? null;

  const handleSelectFamilyMember = (memberId: string) => {
    const member = members.find((item) => item.id === memberId);
    if (!member) {
      return;
    }

    setSelectedFamilyMemberId(member.id);
    setFullName(member.name);
    setShowFamilyModal(false);
  };

  const handleAddNewFamilyMember = () => {
    setShowFamilyModal(false);
    setShowAddFamilyModal(true);
  };

  const handleCloseAddFamilyModal = () => {
    setShowAddFamilyModal(false);
    setNewFamilyName('');
    setNewFamilyAge('');
    setNewFamilyBloodGroup('');
    setNewFamilyRelation('');
  };

  const handleSaveFamilyMember = () => {
    const trimmedName = newFamilyName.trim();
    const trimmedAge = newFamilyAge.trim();
    const trimmedBloodGroup = newFamilyBloodGroup.trim();
    const trimmedRelation = newFamilyRelation.trim();

    if (!trimmedName || !trimmedAge || !trimmedBloodGroup || !trimmedRelation) {
      return;
    }

    const newMember = {
      id: `member-${Date.now()}`,
      name: trimmedName,
      age: trimmedAge,
      bloodGroup: trimmedBloodGroup,
      relation: trimmedRelation,
    };

    setMembers((currentMembers) => [...currentMembers, newMember]);
    setSelectedFamilyMemberId(newMember.id);
    setFullName(newMember.name);
    handleCloseAddFamilyModal();
  };

  const familyMembersListModal: FamilyMembersListModalConfig = {
    visible: showFamilyModal,
    members,
    selectedFamilyMemberId,
    onClose: () => setShowFamilyModal(false),
    onSelectMember: handleSelectFamilyMember,
    onAddNewFamilyMember: handleAddNewFamilyMember,
  };

  const addFamilyMemberModal: AddFamilyMemberModalConfig = {
    visible: showAddFamilyModal,
    fullName: newFamilyName,
    age: newFamilyAge,
    bloodGroup: newFamilyBloodGroup,
    relation: newFamilyRelation,
    onChangeFullName: setNewFamilyName,
    onChangeAge: setNewFamilyAge,
    onChangeBloodGroup: setNewFamilyBloodGroup,
    onChangeRelation: setNewFamilyRelation,
    onClose: handleCloseAddFamilyModal,
    onSave: handleSaveFamilyMember,
  };

  const handleBookOnWhatsApp = async () => {
    const bookingDate = selectedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const patientLabel = fullName.trim() || 'Not provided';
    const bookingSlot = selectedSlot || 'To be confirmed';
    const collectionAddress = `${defaultAddress.title}: ${defaultAddress.address}`;
    const patientAge = selectedFamilyMember?.age || 'Not provided';
    const patientBloodGroup = selectedFamilyMember?.bloodGroup || 'Not provided';

    const message = [
      'Hello, I want to book a blood collection appointment.',
      '',
      '*Booking Details*',
      `Patient Name: ${patientLabel}`,
      `Age: ${patientAge}`,
      `Blood Group: ${patientBloodGroup}`,
      `Booking Date: ${bookingDate}`,
      `Preferred Slot: ${bookingSlot}`,
      `Collection Address: ${collectionAddress}`,
      '',
      '*Package Details*',
      `Package Name: ${packageData.title}`,
      `Audience: ${packageData.audience}`,
    
      `Package Price: ${packageData.price}`,
      `Total Amount: ${formatCurrency(totalAmountValue)}`,
      '',
      
      packageData.note,
    ].join('\n');

    await sendWhatsAppMessage({ message });
  };

  return (
    <LinearGradient
      colors={[Colors.redishBG, '#F6E9EA', '#F6F5F6', '#FFFFFF']}
      locations={[0, 0.24, 0.62, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" backgroundColor={Colors.redishBG} />

        <View className="flex-row items-center justify-between px-4 pb-3 pt-2">
          <CustomButton
            title="Back"
            width="w-auto"
            height="h-auto"
            rounded="rounded-full"
            size="text-xs"
            backgroundColor={Colors.textWhite}
            textColor={Colors.textBlack}
            icon={<ArrowLeft size={16} color={Colors.textBlack} strokeWidth={2.4} />}
            iconPosition="left"
            iconSpacing="mr-2"
            className="px-4 py-3"
            buttonStyle={styles.headerButton}
            onPress={() => navigation.goBack()}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 18,
            paddingBottom: 40,
          }}>
          <View className="mt-2 flex-row items-center justify-between">
            <Text className="text-xl font-extrabold" style={{ color: Colors.textBlack }}>
              Enter Full Name
            </Text>

            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setShowFamilyModal(true)}>
              <Text className="ml-1 text-sm font-medium" style={{ color: Colors.textBlue }}>
                For Family Member
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-2 rounded-xl bg-white px-5 " style={styles.nameInputCard}>
            {selectedFamilyMember ? (
              <View className="mb-2 self-start rounded-full bg-[#D2ECFE] px-3 py-1">
                <Text
                  className="text-xs font-semibold uppercase tracking-[0.4px]"
                  style={{ color: Colors.textBlue }}>
                  {selectedFamilyMember.relation}
                </Text>
              </View>
            ) : null}
            <CustomTextIput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter patient name"
              autoCapitalize="words"
              returnKeyType="done"
            />
          </View>

          <View className="mt-2 flex-row items-center justify-between">
            <Text className="text-xl font-extrabold" style={{ color: Colors.textBlack }}>
              Collection Address
            </Text>

            <TouchableOpacity className="flex-row items-center">
              <Plus size={15} color={Colors.textBlue} />

              <Text className="ml-1 text-sm font-medium" style={{ color: Colors.textBlue }}>
                Add New
              </Text>
            </TouchableOpacity>
          </View>

          <AddressCard title={defaultAddress.title} address={defaultAddress.address} />

          <Text className="mb-4 mt-4 text-xl font-extrabold" style={{ color: Colors.textBlack }}>
            Preferred Slot
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-7">
            {presetDates.map((item) => {
              const active = isSameDay(item.date, selectedDate);

              return (
                <DateTile
                  key={item.id}
                  label={item.label}
                  value={item.value}
                  active={active}
                  onPress={() => setSelectedDate(item.date)}
                />
              );
            })}

            <DateTile
              label={customLabel}
              value={customValue || ''}
              active={!isPresetSelected}
              onPress={() => setShowDatePicker(true)}
              className=""
              icon={
                <CalendarDays
                  size={18}
                  color={!isPresetSelected ? Colors.textWhite : Colors.textBlue}
                  strokeWidth={2.2}
                />
              }
            />
          </ScrollView>

          {showDatePicker ? (
            <DateTimePicker
              value={customDate ?? selectedDate}
              mode="date"
              display="default"
              minimumDate={today}
              onValueChange={handleDateValueChange}
              onDismiss={() => setShowDatePicker(false)}
            />
          ) : null}

          {/* <TimeSlotGrid selectedSlot={selectedSlot} onSelectSlot={setSelectedSlot} /> */}

          <PricingSummaryCard
            packageName={packageData.title}
            packagePrice={packageData.price}
            collectionCharges="FREE"
            serviceTax={formatCurrency(serviceTaxValue)}
            totalAmount={formatCurrency(totalAmountValue)}
          />
        </ScrollView>

        <View className="px-[18px] pb-4 pt-2">
          <CustomButton
            title="Book on WhatsApp"
            width="w-full"
            height="h-14"
            rounded="rounded-[22px]"
            size="text-[16px]"
            backgroundColor={Colors.textBlue}
            icon={<MessageCircle size={18} color={Colors.textWhite} fill={Colors.textWhite} />}
            iconPosition="left"
            iconSpacing="mr-2"
            textColor={Colors.textWhite}
            showArrow={false}
            buttonStyle={styles.whatsAppButton}
            onPress={handleBookOnWhatsApp}
          />
        </View>

        <FamilyMembersListModal modal={familyMembersListModal} />
        <AddFamilyMemberModal modal={addFamilyMemberModal} />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  nameInputCard: {
    shadowColor: Colors.textBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    paddingVertical: 4,
  },
  whatsAppButton: {
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 5,
  },
});

export default BookingScreen;
