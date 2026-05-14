import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker, {
  type DateTimePickerChangeEvent,
} from '@react-native-community/datetimepicker';
import { Clock3 } from 'lucide-react-native';
import { Colors } from 'Constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

type TimeSlotGridProps = {
  selectedSlot: string;
  onSelectSlot: (slot: string) => void;
};

const parseTimeToDate = (time: string) => {
  const now = new Date();
  const [timePart, meridiem] = time.split(' ');
  const [hoursText, minutesText] = timePart.split(':');

  let hours = Number(hoursText);
  const minutes = Number(minutesText);

  if (meridiem === 'PM' && hours !== 12) {
    hours += 12;
  }

  if (meridiem === 'AM' && hours === 12) {
    hours = 0;
  }

  const parsed = new Date(now);
  parsed.setHours(hours, minutes, 0, 0);
  return parsed;
};

const formatTime = (date: Date) =>
  date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

const TimeSlotGrid = ({ selectedSlot, onSelectSlot }: TimeSlotGridProps) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const selectedTime = useMemo(() => parseTimeToDate(selectedSlot), [selectedSlot]);

  const handleTimeChange = (_event: DateTimePickerChangeEvent, pickedTime: Date) => {
    onSelectSlot(formatTime(pickedTime));
    setShowTimePicker(false);
  };

  return (
    <View className="rounded-[30px] bg-white p-4" style={styles.wrapper}>
      <Text className="text-lg font-extrabold" style={{ color: Colors.textBlack }}>
        Select Time
      </Text>

      <Text className="mt-1 text-sm" style={{ color: Colors.textGray }}>
        Choose your preferred time.
      </Text>

      <TextInput
        value={selectedSlot}
        onChangeText={onSelectSlot}
        placeholder="Enter time"
        placeholderTextColor={Colors.textGray}
        className="mt-4 rounded-[20px] border px-4 py-4 text-sm font-semibold"
        style={styles.input}
      />

      <View className="mt-4 flex-row items-center justify-between">
        <View className="mr-3 h-[78px] flex-1 overflow-hidden rounded-[20px]" style={styles.tileShadow}>
          <LinearGradient
            colors={[Colors.textWhite, '#FFF7F8', '#F5FBFD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.timeTile}>
            <LinearGradient
              colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.tileGloss}
            />
            <View className="flex-row items-center gap-2">
              <View
                className="h-7 w-7 items-center justify-center rounded-full"
                style={styles.iconWrap}>
                <Clock3 size={13} color={Colors.textBlue} strokeWidth={2.2} />
              </View>

              <Text className="text-xs font-bold" style={{ color: Colors.textBlack }}>
                SELECTED TIME
              </Text>
            </View>

            <Text className="mt-1 text-xl font-extrabold" style={{ color: Colors.textBlack }}>
              {selectedSlot}
            </Text>
          </LinearGradient>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setShowTimePicker(true)}
          className="h-[78px] w-[78px] items-center justify-center rounded-[20px]"
          style={styles.pickerButton}>
          <Clock3 size={16} color={Colors.textWhite} strokeWidth={2.2} />
          <Text className="mt-1 text-[10px] font-bold" style={{ color: Colors.textWhite }}>
            PICK
          </Text>
          <Text className="text-[10px] font-extrabold" style={{ color: Colors.textWhite }}>
            TIME
          </Text>
        </TouchableOpacity>
      </View>

      {showTimePicker ? (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onValueChange={handleTimeChange}
          onDismiss={() => setShowTimePicker(false)}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrap: {
    backgroundColor: Colors.blueshBG,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.72)',
  },
  input: {
    borderColor: '#D7DCE1',
    color: Colors.textBlack,
  },
  pickerButton: {
    backgroundColor: Colors.textBlue,
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 5,
  },
  tileGloss: {
    position: 'absolute',
    top: -16,
    left: -8,
    width: 180,
    height: 90,
    borderRadius: 999,
  },
  tileShadow: {
    shadowColor: Colors.textBlack,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 4,
  },
  timeTile: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.78)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  wrapper: {
    shadowColor: Colors.textBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
});

export default TimeSlotGrid;
