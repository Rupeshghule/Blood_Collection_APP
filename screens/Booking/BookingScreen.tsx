import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ArrowLeft, CalendarDays, MessageCircle, Plus } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Colors } from 'Constants/Colors';
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
import AddAddressModal from '../../modal/add address/AddAddressModal';
import type { AddAddressModalConfig } from '../../modal/add address/AddAddressModal';
import openWhatsAppMessage from '../../utils/sendWhatsAppMessage';
import AppGradientScreen from 'components/layout/AppGradientScreen';

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
  bookingMode?: 'package' | 'homeVisit';
};

type BookingFamilyMember = {
  id: string;
  name: string;
  relation: string;
  age?: string;
  bloodGroup?: string;
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

const familyMembers: BookingFamilyMember[] = [
  { id: 'self', name: 'Rupesh Ghule', relation: 'Self', age: '28', bloodGroup: 'B+' },
  { id: 'mother', name: 'Anita Ghule', relation: 'Mother', age: '52', bloodGroup: 'O+' },
  { id: 'father', name: 'Suresh Ghule', relation: 'Father', age: '58', bloodGroup: 'A+' },
  { id: 'sister', name: 'Pooja Ghule', relation: 'Sister', age: '24', bloodGroup: 'B+' },
];

const defaultAddress = {
  title: 'Home',
  address: '402, Highline Residency, Hadapsar, Pune - 411028',
};

const parseCurrencyValue = (value: string) => {
  const numericValue = Number(value.replace(/[^\d.]/g, ''));
  return Number.isFinite(numericValue) ? numericValue : 0;
};

const formatCurrency = (value: number) => `Rs. ${value.toLocaleString('en-IN')}`;

const BookingScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { packageData = fallbackPackage, bookingMode = 'package' } =
    (route.params as RouteParams) ?? {};
  const isHomeVisitFlow = bookingMode === 'homeVisit';

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
  const [packageRequirement, setPackageRequirement] = useState('');
  const [currentAddress, setCurrentAddress] = useState(defaultAddress);
  const [members, setMembers] = useState<BookingFamilyMember[]>(familyMembers);
  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [showAddFamilyModal, setShowAddFamilyModal] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [selectedFamilyMemberId, setSelectedFamilyMemberId] = useState<string | null>(null);
  const [newFamilyName, setNewFamilyName] = useState('');
  const [newFamilyAge, setNewFamilyAge] = useState('');
  const [newFamilyBloodGroup, setNewFamilyBloodGroup] = useState('');
  const [newFamilyRelation, setNewFamilyRelation] = useState('');
  const [newAddressTitle, setNewAddressTitle] = useState(defaultAddress.title);
  const [newAddressValue, setNewAddressValue] = useState(defaultAddress.address);

  const isPresetSelected = presetDates.some((item) => isSameDay(item.date, selectedDate));
  const customLabel = customDate
    ? customDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
    : 'PICK';
  const customValue = customDate ? customDate.getDate().toString() : '';
  const selectedFamilyMember =
    members.find((member) => member.id === selectedFamilyMemberId) ?? null;
  const requirementLabel =
    packageRequirement.trim() || 'Need help choosing a suitable package or test';

  const packagePriceValue = parseCurrencyValue(packageData.price);
  const collectionChargeValue = 0;
  const serviceTaxValue = 84;
  const totalAmountValue = packagePriceValue + collectionChargeValue + serviceTaxValue;

  const handleDateValueChange = (
    _event: { nativeEvent: { timestamp: number; utcOffset: number } },
    pickedDate: Date
  ) => {
    setCustomDate(pickedDate);
    setSelectedDate(pickedDate);
    setShowDatePicker(false);
  };

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
    const nameValue = newFamilyName.trim();
    const ageValue = newFamilyAge.trim();
    const bloodGroupValue = newFamilyBloodGroup.trim();
    const relationValue = newFamilyRelation.trim();

    if (!nameValue || !ageValue || !bloodGroupValue || !relationValue) {
      return;
    }

    const newMember: BookingFamilyMember = {
      id: `member-${Date.now()}`,
      name: nameValue,
      age: ageValue,
      bloodGroup: bloodGroupValue,
      relation: relationValue,
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

  const handleCloseAddressModal = () => {
    setShowAddAddressModal(false);
    setNewAddressTitle(currentAddress.title);
    setNewAddressValue(currentAddress.address);
  };

  const handleSaveAddress = () => {
    const titleValue = newAddressTitle.trim();
    const addressValue = newAddressValue.trim();

    if (!titleValue || !addressValue) {
      return;
    }

    setCurrentAddress({
      title: titleValue,
      address: addressValue,
    });
    setShowAddAddressModal(false);
  };

  const addAddressModal: AddAddressModalConfig = {
    visible: showAddAddressModal,
    title: newAddressTitle,
    address: newAddressValue,
    onChangeTitle: setNewAddressTitle,
    onChangeAddress: setNewAddressValue,
    onClose: handleCloseAddressModal,
    onSave: handleSaveAddress,
  };

  const handleBookOnWhatsApp = async () => {
    const bookingDate = selectedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const patientLabel = fullName.trim() || 'Not provided';
    const bookingSlot = selectedSlot || 'To be confirmed';
    const collectionAddress = `${currentAddress.title}: ${currentAddress.address}`;
    const patientAge = selectedFamilyMember?.age || 'Not provided';
    const patientBloodGroup = selectedFamilyMember?.bloodGroup || 'Not provided';

    const message = isHomeVisitFlow
      ? [
          'Hello, I want to schedule a *home sample collection.*',
          '',
          '*Request Details*',
          `Patient Name: ${patientLabel}`,
          `Age: ${patientAge}`,
          `Blood Group: ${patientBloodGroup}`,
          `Test / Package Need: ${requirementLabel}`,
          `Preferred Date: ${bookingDate}`,
          `Preferred Slot: ${bookingSlot}`,
          `Collection Address: ${collectionAddress}`,
          '',
          '*Requirement*',
          `Requested focus: ${requirementLabel}`,
          // 'Please help me with package suggestions, pricing, and availability for home collection.',
        ].join('\n')
      : [
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

    await openWhatsAppMessage({ message });
  };

  return (
    <AppGradientScreen>
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
          contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 40 }}>
          {isHomeVisitFlow ? (
            <View className="mt-2 rounded-[28px] bg-white p-5" style={styles.infoCard}>
              <View
                className="self-start rounded-full px-3 py-1"
                style={{ backgroundColor: Colors.textRed }}>
                <Text className="text-xs font-bold uppercase" style={{ color: Colors.textWhite }}>
                  Home Visit
                </Text>
              </View>

              <Text className="mt-3 text-2xl font-extrabold" style={{ color: Colors.textBlack }}>
                Schedule Home Collection
              </Text>

              <Text className="mt-2 text-sm " style={{ color: Colors.textGray }}>
                Share your visit requirements and preferred schedule. We will finalize the suitable
                tests or package for you.
              </Text>
            </View>
          ) : null}

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

          <View className="mt-2 rounded-xl bg-white px-5" style={styles.fullNameInputCard}>
            {selectedFamilyMember ? (
              <View
                className="mb-2 self-start rounded-full px-3 py-1"
                style={{ backgroundColor: Colors.blueshBG }}>
                <Text
                  className="text-xs font-semibold uppercase"
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
              textClassName="text-sm"
              style={styles.singleLineInput}
            />
          </View>

          {isHomeVisitFlow ? (
            <>
              <View className="mt-4">
                <Text className="text-xl font-extrabold" style={{ color: Colors.textBlack }}>
                  Package or Test Need
                </Text>
              </View>

              <View className="mt-2 rounded-xl bg-white px-5 py-1" style={styles.requirementCard}>
                <CustomTextIput
                  value={packageRequirement}
                  onChangeText={setPackageRequirement}
                  placeholder="Enter what kind of Bloof test want to do ?"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  textClassName="text-sm"
                  style={styles.multiLineInput}
                />
              </View>
            </>
          ) : null}

          <View className="mt-2 flex-row items-center justify-between">
            <Text className="text-xl font-extrabold" style={{ color: Colors.textBlack }}>
              Collection Address
            </Text>

            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setShowAddAddressModal(true)}>
              <Plus size={15} color={Colors.textBlue} />

              <Text className="ml-1 text-sm font-medium" style={{ color: Colors.textBlue }}>
                Add New
              </Text>
            </TouchableOpacity>
          </View>

          <AddressCard title={currentAddress.title} address={currentAddress.address} />

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

          {isHomeVisitFlow ? (
            <TimeSlotGrid selectedSlot={selectedSlot} onSelectSlot={setSelectedSlot} />
          ) : null}

          <PricingSummaryCard
            title={isHomeVisitFlow ? 'Request Summary' : 'Order Summary'}
            packageName={isHomeVisitFlow ? requirementLabel : packageData.title}
            packagePrice={isHomeVisitFlow ? '' : packageData.price}
            collectionCharges={isHomeVisitFlow ? 'As per final booking' : 'FREE'}
            serviceTax={isHomeVisitFlow ? 'As applicable' : formatCurrency(serviceTaxValue)}
            totalAmount={
              isHomeVisitFlow ? 'Shared on confirmation' : formatCurrency(totalAmountValue)
            }
            totalAmountSize={isHomeVisitFlow ? 'text-sm' : 'text-2xl'}
          />
        </ScrollView>

        <View className="px-[18px] pb-4 pt-2">
          <CustomButton
            title={isHomeVisitFlow ? 'Request on WhatsApp' : 'Book on WhatsApp'}
            width="w-full"
            height="h-14"
            rounded="rounded-[22px]"
            size="text-base"
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
        <AddAddressModal modal={addAddressModal} />
    </AppGradientScreen>
  );
};

const styles = StyleSheet.create({
  fullNameInputCard: {
    shadowColor: Colors.textBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    paddingVertical: 4,
  },
  headerButton: {
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  infoCard: {
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  multiLineInput: {
    minHeight: 72,
    paddingTop: 10,
    paddingBottom: 10,
  },
  requirementCard: {
    shadowColor: Colors.textBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  singleLineInput: {
    minHeight: 44,
    paddingVertical: 10,
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
