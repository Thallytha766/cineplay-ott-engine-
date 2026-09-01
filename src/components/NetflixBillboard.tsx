import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  title: string;
  category: string;
  trailerUrl: string;
  onWatch: () => void;
}

export const NetflixBillboard: React.FC<Props> = ({
  title,
  category,
  trailerUrl,
  onWatch,
}) => {
  const [muted, setMuted] = useState(true);

  return (
    <View style={styles.billboardContainer}>
      <Video
        source={{ uri: trailerUrl }}
        style={styles.videoPlayer}
        resizeMode={ResizeMode.COVER}
        shouldPlay={true}
        isLooping={true}
        isMuted={muted}
      />
      <LinearGradient
        colors={['transparent', 'rgba(20,20,20,0.5)', '#141414']}
        style={styles.gradientOverlay}
      />
      <View style={styles.metaContainer}>
        <Text style={styles.categoryBadge}>{category.toUpperCase()}</Text>
        <Text style={styles.titleText} numberOfLines={2}>{title}</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.primaryButton} onPress={onWatch}>
            <Text style={styles.primaryButtonText}>▶ Assistir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setMuted(!muted)}
          >
            <Text style={styles.iconButtonText}>{muted ? '🔇' : '🔊'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  billboardContainer: {
    width: '100%',
    height: 460,
    backgroundColor: '#000000',
    position: 'relative',
  },
  videoPlayer: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  metaContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
  categoryBadge: {
    color: '#E50914',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 4,
  },
  primaryButtonText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 16,
  },
  iconButton: {
    backgroundColor: 'rgba(51,51,51,0.7)',
    padding: 10,
    borderRadius: 50,
  },
  iconButtonText: {
    fontSize: 16,
  },
});
