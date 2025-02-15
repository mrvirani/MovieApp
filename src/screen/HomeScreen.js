import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MovieList from '../components/molecules/MovieList';
import Header from '../components/atoms/Header';

const HomeScreen = () => {
  return (
    <View>
      <Header title={'Movies by Year'} />
      <MovieList />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
