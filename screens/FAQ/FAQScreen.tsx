import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from 'Constants/Colors';
import { ChevronDown, ChevronUp, CircleHelp } from 'lucide-react-native';
import AppGradientScreen from 'components/layout/AppGradientScreen';

const faqs = [
  {
    id: 1,
    question: 'Do I need fasting for blood tests?',
    answer:
      "It depends on the test. Most routine tests require 10-12 hours fasting. Some tests don't require fasting. We'll inform you during booking.",
  },
  {
    id: 2,
    question: 'How long does home collection take?',
    answer:
      'Usually 5-10 minutes. Our technologist will come with sterile equipment, collect the sample, and leave. Total time is minimal.',
  },
  {
    id: 3,
    question: 'When will I get my reports?',
    answer:
      'Most reports are delivered online the same day. You will receive a WhatsApp notification with a digital copy and expert suggestions.',
  },
  {
    id: 4,
    question: 'Is the collection process painful?',
    answer:
      'No, we use expert technique for painless collection. Our experience ensures minimal discomfort during blood withdrawal.',
  },
  {
    id: 5,
    question: 'What areas do you cover for home visits?',
    answer:
      'We primarily cover Amanora and Magarpatta, and also serve Hadapsar. Call to check availability in nearby areas.',
  },
  {
    id: 6,
    question: 'Can I get the reports interpreted?',
    answer:
      'Yes, expert doctor suggestions are provided with the report. For detailed medical advice, consult your physician.',
  },
];

const FAQScreen = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <AppGradientScreen>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 0 }}>
          <View className="px-4 pb-8 pt-6">
            <View className="items-center">
              <View
                className="h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: Colors.redishBG }}>
                <CircleHelp size={24} color={Colors.textRed} strokeWidth={2.3} />
              </View>

              <Text
                className="mt-4 text-center text-2xl font-extrabold"
                style={{ color: Colors.textBlack }}>
                Frequently Asked Questions
              </Text>

              <Text
                className="mt-2 text-center text-sm leading-6"
                style={{ color: Colors.textGray }}>
                Everything patients usually ask before booking home collection.
              </Text>
            </View>

            <View className="mt-6">
              {faqs.map((item) => {
                const isOpen = openId === item.id;

                return (
                  <View
                    key={item.id}
                    className="mb-3 overflow-hidden rounded-[22px] border bg-white"
                    style={{
                      borderColor: Colors.chipBorder,
                      shadowColor: Colors.blueShadow,
                      shadowOffset: { width: 0, height: 6 },
                      shadowOpacity: 0.06,
                      shadowRadius: 12,
                      elevation: 3,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => setOpenId(isOpen ? null : item.id)}
                      className="flex-row items-start px-4 py-4">
                      <View className="mr-3 mt-0.5">
                        <CircleHelp size={16} color={Colors.textRed} strokeWidth={2.4} />
                      </View>

                      <View className="flex-1 pr-3">
                        <Text className="text-base font-bold" style={{ color: Colors.textBlack }}>
                          {item.question}
                        </Text>
                      </View>

                      <View className="mt-0.5">
                        {isOpen ? (
                          <ChevronUp size={18} color={Colors.textBlue} strokeWidth={2.4} />
                        ) : (
                          <ChevronDown size={18} color={Colors.textBlue} strokeWidth={2.4} />
                        )}
                      </View>
                    </TouchableOpacity>

                    {isOpen ? (
                      <View className="px-4 pb-4">
                        <Text className="text-sm leading-6" style={{ color: Colors.textGray }}>
                          {item.answer}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>

          <View className="px-4 pb-6">
            <View
              className="rounded-[28px] px-5 py-6"
              style={{ backgroundColor: Colors.textRed }}>
              <Text
                className="text-center text-2xl font-extrabold"
                style={{ color: Colors.textWhite }}>
                We&apos;re Available 24/7
              </Text>

              <View className="mt-5 flex-row items-center justify-between">
                <View className="flex-1 items-center">
                  <Text className="text-xs font-medium" style={{ color: Colors.textWhite }}>
                    Home Collection
                  </Text>
                  <Text
                    className="mt-1 text-center text-lg font-extrabold"
                    style={{ color: Colors.textWhite }}>
                    Appointment Based
                  </Text>
                </View>

                <View className="mx-4 h-20 w-px" style={{ backgroundColor: Colors.redishBG }} />

                <View className="flex-1 items-center">
                  <Text className="text-xs font-medium" style={{ color: Colors.textWhite }}>
                    Call or WhatsApp
                  </Text>
                  <Text
                    className="mt-1 text-center text-lg font-extrabold"
                    style={{ color: Colors.textWhite }}>
                    +91 83902 45575
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
    </AppGradientScreen>
  );
};

export default FAQScreen;
