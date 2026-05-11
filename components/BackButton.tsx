import { ChevronLeft } from 'lucide-react-native';
import { Text, View } from 'react-native';

interface BackButtonProps {
  onPress: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <View className={styles.backButton}>
      <ChevronLeft size={16} color="#007AFF" strokeWidth={2.4} />
      <Text className={styles.backButtonText} onPress={onPress}>
        Back
      </Text>
    </View>
  );
};

const styles = {
  backButton: 'flex-row',
  backButtonText: 'text-blue-500 ml-1',
};
