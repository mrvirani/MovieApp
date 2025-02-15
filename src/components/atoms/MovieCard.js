import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CARD_HEIGHT, CARD_WIDTH} from '../../constants/constants';

const MovieCard = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.movieCard} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
        style={styles.movieImage}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)']}
        style={styles.overlay}
      >
        <Text style={styles.movieTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  movieCard: {
    width: CARD_WIDTH,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#222',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  movieImage: {
    width: '100%',
    height: CARD_HEIGHT,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  movieTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default MovieCard;
