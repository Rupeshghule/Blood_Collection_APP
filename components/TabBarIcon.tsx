import { StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

export const TabBarIcon = (props: { icon: LucideIcon; color: string }) => {
  const { icon: Icon, color } = props;
  return <Icon size={28} color={color} strokeWidth={2.2} style={styles.tabBarIcon} />;
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
