import { View } from 'react-native';
import React from 'react';
import ContactCard from 'components/cards/about us/ContactCard';
import AppGradientScreen from 'components/layout/AppGradientScreen';

const SupportScreen = () => {
  return (
    <AppGradientScreen>
        <View className="items-center">
          <ContactCard
            title="Contact Us"
            whatsAppMessage="Hello, I need support regarding my booking, report, or blood collection service."
          />
        </View>
    </AppGradientScreen>
  );
};

export default SupportScreen;
