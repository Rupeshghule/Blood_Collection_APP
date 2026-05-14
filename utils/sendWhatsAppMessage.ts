import { Linking } from 'react-native';

type SendWhatsAppMessageOptions = {
  message: string;
  phoneNumber?: string;
};

const DEFAULT_WHATSAPP_NUMBER = '+918390246575';

const normalizePhoneNumber = (phoneNumber?: string) =>
  phoneNumber ? phoneNumber.replace(/[^\d]/g, '') : '';

export const sendWhatsAppMessage = async ({
  message,
  phoneNumber,
}: SendWhatsAppMessageOptions) => {
  const normalizedPhoneNumber = normalizePhoneNumber(
    phoneNumber || DEFAULT_WHATSAPP_NUMBER
  );
  const encodedMessage = encodeURIComponent(message.trim());
  const appUrl = normalizedPhoneNumber
    ? `whatsapp://send?phone=${normalizedPhoneNumber}&text=${encodedMessage}`
    : `whatsapp://send?text=${encodedMessage}`;
  const webUrl = normalizedPhoneNumber
    ? `https://wa.me/${normalizedPhoneNumber}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;

  const canOpenWhatsApp = await Linking.canOpenURL(appUrl);

  if (canOpenWhatsApp) {
    await Linking.openURL(appUrl);
    return;
  }

  await Linking.openURL(webUrl);
};

export default sendWhatsAppMessage;
