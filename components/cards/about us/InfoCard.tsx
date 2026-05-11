import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'Constants/Colors';

const tags = ['Clinical Pathology', 'Home Collection Expert', 'Precision Diagnostics'];

const InfoCard = () => {
  return (
    <View className="w-full max-w-[360px]" style={styles.shadow}>
      <LinearGradient
        colors={[Colors.textWhite, '#FFF6F7', '#F5FBFD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}>
        <LinearGradient
          colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.glossHighlight}
        />

        <LinearGradient
          colors={['rgba(15,116,151,0.14)', 'rgba(15,116,151,0)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.sideGlow}
        />

        <View className="flex-row items-start">
          <View className="flex-1 pr-4">
            <View style={styles.badge}>
              <Text style={styles.badgeText}>FOUNDER & LEAD TECHNOLOGIST</Text>
            </View>

            <Text style={styles.name}>Pannu Bhaware</Text>

            <Text style={styles.degree}>B.Sc. MLT (Medical Laboratory Technologist)</Text>
          </View>

          <View style={styles.imageFrame}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500&auto=format&fit=crop',
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.description}>
            A specialist in clinical pathology and high-precision home sample collection. With a
            vision to bring laboratory excellence to your doorstep, Pannu Bhaware leads Hadapsar
            Blood Center with a focus on accuracy, hygiene, and patient care.
          </Text>
          <View className="mt-2">
            <Text className="" style={{ color: Colors.textGray }}>
              Home-visit blood collection only (no physical lab). Primary focus: Amanora and
              Magarpatta.
            </Text>
          </View>
        </View>

        <View className="mt-5 flex-row flex-wrap">
          {tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: Colors.blueShadow,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.16,
    shadowRadius: 28,
    elevation: 10,
  },
  card: {
    overflow: 'hidden',
    borderRadius: 34,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.75)',
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 24,
  },
  glossHighlight: {
    position: 'absolute',
    top: -22,
    left: -12,
    width: 230,
    height: 120,
    borderRadius: 999,
  },
  sideGlow: {
    position: 'absolute',
    top: 18,
    right: -26,
    width: 140,
    height: 220,
    borderRadius: 999,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#FFD9DE',
    backgroundColor: '#FFF1F3',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.1,
    color: Colors.textRed,
  },
  name: {
    marginTop: 16,
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 30,
    color: Colors.textBlack,
  },
  degree: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
    color: Colors.textBlue,
  },
  imageFrame: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.82)',
    backgroundColor: 'rgba(255,255,255,0.68)',
    padding: 6,
  },
  image: {
    width: 104,
    height: 126,
    borderRadius: 22,
  },
  descriptionCard: {
    marginTop: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.72)',
    backgroundColor: 'rgba(255,255,255,0.58)',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 24,
    color: Colors.textGray,
  },
  tag: {
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D8E8F0',
    backgroundColor: '#F7FBFD',
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.7,
    color: Colors.textBlue,
  },
});

export default InfoCard;
