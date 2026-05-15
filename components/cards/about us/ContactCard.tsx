import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Clock3, MapPin, MessageCircle, Phone } from 'lucide-react-native';
import { Colors } from 'Constants/Colors';
import { sendWhatsAppMessage } from '../../../utils/sendWhatsAppMessage';

type ContactCardProps = {
  title?: string;
  whatsAppMessage?: string;
};

export default function ContactCard({
  title = `Book Your Test${'\n'}From Home`,
  whatsAppMessage = 'Hello, I would like to know more about your blood collection service and book a test.',
}: ContactCardProps) {
  const handleOpenInstagram = async () => {
    await Linking.openURL(
      'https://www.instagram.com/hadapsar.blood.collection_labs?igsh=MTAxaWxseWUyMmd1bA=='
    );
  };

  const handleOpenWhatsApp = async () => {
    await sendWhatsAppMessage({
      message: whatsAppMessage,
    });
  };

  return (
    <View className="w-full max-w-[360px] py-5">
      <LinearGradient
        colors={[Colors.redishBG, '#F8F3F6', Colors.blueshBG]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}>
        <View style={styles.gloss} />

        <View className="w-full items-center">
          <View style={styles.iconWrap}>
            <Phone size={20} color={Colors.textBlue} strokeWidth={2.4} />
          </View>

          <Text className="mt-4 text-center text-2xl font-extrabold" style={styles.title}>
            {title}
          </Text>

          <Text className="mt-3 text-center text-sm leading-6" style={styles.description}>
            Quick support, hygienic collection, and trusted diagnostics at your convenience.
          </Text>

          <View
            className="mt-5 w-full rounded-[22px] bg-white/65 px-4 py-4"
            style={styles.infoCard}>
            <View className="flex-row items-center">
              <Phone size={15} color={Colors.textRed} strokeWidth={2.4} />
              <Text className="ml-2 text-sm font-semibold" style={{ color: Colors.textBlack }}>
                +91 83902 45575
              </Text>
            </View>

            <View className="mt-3 flex-row items-center">
              <MapPin size={15} color={Colors.textRed} strokeWidth={2.4} />
              <Text className="ml-2 text-sm" style={{ color: Colors.textBlack }}>
                Hadapsar, Pune
              </Text>
            </View>

            <View className="mt-3 flex-row items-center">
              <Clock3 size={15} color={Colors.textRed} strokeWidth={2.4} />
              <Text className="ml-2 flex-1 text-sm" style={{ color: Colors.textBlack }}>
                24/7 Home Collection (Appointment)
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleOpenWhatsApp}
            className="mt-5 flex-row items-center"
            style={styles.button}>
            <MessageCircle size={16} color={Colors.textWhite} strokeWidth={2.5} />
            <Text className="ml-2 text-sm font-bold" style={{ color: Colors.textWhite }}>
              WhatsApp
            </Text>
          </TouchableOpacity>

          <View className="mt-5 flex-row items-center">
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.socialIcon}
              onPress={handleOpenInstagram}>
              <FontAwesome name="instagram" size={15} color="#E4405F" />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.85} style={styles.socialIcon}>
              <FontAwesome name="facebook" size={15} color="#1877F2" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.socialIcon}
              onPress={handleOpenWhatsApp}>
              <MessageCircle size={15} color="#25D366" strokeWidth={2.3} fill="#25D366" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 30,
    paddingHorizontal: 22,
    paddingVertical: 26,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.75)',
    shadowColor: Colors.textBlack,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  gloss: {
    position: 'absolute',
    top: -20,
    left: -16,
    width: 180,
    height: 100,
    borderRadius: 999,
  },
  iconWrap: {
    height: 52,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.72)',
  },
  title: {
    color: Colors.textBlack,
    lineHeight: 30,
  },
  description: {
    color: Colors.textGray,
  },
  infoCard: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.72)',
  },
  button: {
    borderRadius: 999,
    backgroundColor: '#16A34A',
    paddingHorizontal: 18,
    paddingVertical: 12,
    shadowColor: '#15803D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 3,
  },
  socialIcon: {
    height: 34,
    width: 34,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.76)',
  },
});
