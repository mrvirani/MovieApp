import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

const GenreList = ({genres, selectedGenres, setSelectedGenres}) => {
  const toggleGenreSelection = genreId => {
    setSelectedGenres(prevSelectedGenres => {
      if (prevSelectedGenres.includes(genreId)) {
        return prevSelectedGenres.filter(id => id !== genreId);
      } else {
        return [...prevSelectedGenres, genreId];
      }
    });
  };

  return (
    <FlatList
      data={genres}
      horizontal
      keyExtractor={item => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.genreList}
      renderItem={({item}) => (
        <TouchableOpacity
          style={[
            styles.genreItem,
            selectedGenres.includes(item.id) && styles.selectedGenre,
          ]}
          onPress={() => toggleGenreSelection(item.id)}>
          <Text style={styles.genreText}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  genreList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  genreItem: {
    backgroundColor: '#222',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 6,
  },
  selectedGenre: {
    backgroundColor: '#00bcd4',
  },
  genreText: {
    fontSize: 12,
    color: '#fff',
    lineHeight: 30,
    top: -3,
  },
});

export default GenreList;
