import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const MovieDetailsScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Movie Poster with Gradient Overlay */}
      <View style={styles.posterContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
        />
        <LinearGradient
          colors={['transparent', '#111']}
          style={styles.gradientOverlay}
        />
      </View>

      {/* Movie Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.releaseDate}>
          🎬 Release Date: {movie.release_date}
        </Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)} / 10</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  posterContainer: {
    position: 'relative',
  },
  poster: {
    width: width,
    height: 450,
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  releaseDate: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 5,
  },
  overview: {
    fontSize: 16,
    color: '#ddd',
    lineHeight: 24,
    marginTop: 10,
    textAlign: 'justify',
  },
  rating: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffcc00',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MovieDetailsScreen;
