import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native';

interface Props {
  title: string;
  posterUrl: string;
  rating: string;
  onFocusCard: () => void;
  onSelectCard: () => void;
}

export const TVFocusableCard: React.FC<Props> = ({
  title,
  posterUrl,
  rating,
  onFocusCard,
  onSelectCard,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onFocus={() => {
        setIsFocused(true);
        onFocusCard(); // Dispara o trailer correspondente no topo
      }}
      onBlur={() => setIsFocused(false)}
      onPress={onSelectCard}
      style={[styles.card, isFocused && styles.cardFocused]}
    >
      <Image source={{ uri: posterUrl }} style={styles.poster} resizeMode="cover" />
      {isFocused && (
        <View style={styles.tag}>
          <Text style={styles.tagText}>★ {rating}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 130,
    height: 195,
    borderRadius: 4,
    marginRight: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardFocused: {
    borderColor: '#E50914',
    transform: [{ scale: 1.1 }],
    zIndex: 10,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  tag: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  tagText: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
