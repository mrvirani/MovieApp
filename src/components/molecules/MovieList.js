import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import GenreList from '../atoms/GenreList';
import {scaledFontSize} from '../../constants/constants';
import MovieCard from '../atoms/MovieCard';
import {useNavigation} from '@react-navigation/native';

const MovieList = () => {
  const [moviesByYear, setMoviesByYear] = useState({});
  const [years, setYears] = useState([2025]);
  const [loading, setLoading] = useState(false);
  const [noMoreMovies, setNoMoreMovies] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    if (selectedGenres.length > 0) {
      setMoviesByYear({});
      years.forEach(year => fetchMovies(year));
    } else {
      years.forEach(year => fetchMovies(year));
    }
  }, [selectedGenres, years]);

  const fetchMovies = async year => {
    setLoading(true);
    try {
      const genreQuery =
        selectedGenres.length > 0
          ? `&with_genres=${selectedGenres.join(',')}`
          : '';
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=3995b7a32526a658d643b79223e34ff9&primary_release_year=${year}&language=en-US${genreQuery}`,
      );
      const data = await response.json();
      if (data.results) {
        if (data.results.length === 0) {
          setNoMoreMovies(true);
        }
        setMoviesByYear(prev => ({
          ...prev,
          [year]:
            data.results.length > 0 ? data.results.slice(0, 8) : 'Upcoming',
        }));
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    setLoading(false);
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=3995b7a32526a658d643b79223e34ff9&language=en-US`,
      );
      const data = await response.json();
      console.log('data:::', data);
      setGenres(data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const loadOlderMovies = () => {
    if (loading || noMoreMovies) return;
    const newYear = Math.min(...years) - 1;
    setYears([newYear, ...years]);
    fetchMovies(newYear);
  };

  const loadNewerMovies = () => {
    if (loading || noMoreMovies) return;
    const newYear = Math.max(...years) + 1;
    setYears([...years, newYear]);
    fetchMovies(newYear);
  };

  return (
    <>
      <GenreList
        genres={genres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />

      <FlatList
        data={years}
        keyExtractor={item => item.toString()}
        renderItem={({item: year}) => (
          <View style={styles.cardContainer}>
            <Text style={styles.yearTitle}>
              {year}{' '}
              {moviesByYear[year] === 'Upcoming' ? '(Upcoming Movies)' : ''}
            </Text>

            {moviesByYear[year] === 'Upcoming' ? (
              <Text style={styles.noMoviesText}>No movies released yet.</Text>
            ) : (
              <FlatList
                data={moviesByYear[year]}
                keyExtractor={movie => movie.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                style={{gap: 10}}
                renderItem={({item}) => (
                  <MovieCard
                    item={item}
                    onPress={() =>
                      navigation.navigate('MovieDetailsScreen', {movie: item})
                    }
                  />
                )}
              />
            )}
          </View>
        )}
        onEndReached={loadNewerMovies}
        onEndReachedThreshold={0.5}
        onScroll={event => {
          if (event.nativeEvent.contentOffset.y < 100) {
            loadOlderMovies();
          }
        }}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#00bcd4" /> : null
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#111',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  yearTitle: {
    fontSize: scaledFontSize(20),
    fontWeight: 'bold',
    paddingHorizontal: 4,
    color: '#fff',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  noMoviesText: {
    textAlign: 'center',
    color: '#aaa',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default MovieList;
