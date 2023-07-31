import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  getTrendingMoviesAllDayData,
  getTrendingPeoples,
  getTrendingTvAllDayData,
} from '../../../Services/movie_show_data/apiData';
import {useNavigation} from '@react-navigation/native';

const HomeCorousal = () => {
  const navigation = useNavigation();
  const [trendingShows, setTrendingShows] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingPeoples, setTrendingPeoples] = useState([]);

  useEffect(() => {
    const getTrendingTvShows = async () => {
      try {
        const response = await getTrendingTvAllDayData();
        setTrendingShows(response?.data?.results);
      } catch (error) {
        console.log(error);
      }
    };
    getTrendingTvShows();
  }, []);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const response = await getTrendingMoviesAllDayData();
        setTrendingMovies(response?.data?.results);
      } catch (error) {
        console.log(error);
      }
    };
    getTrendingMovies();
  }, []);

  useEffect(() => {
    const trendingPeoples = async () => {
      try {
        const response = await getTrendingPeoples();
        setTrendingPeoples(response?.data?.results);
      } catch (error) {
        console.log(error);
      }
    };
    trendingPeoples();
  }, []);

  const handleMediaPress = (mediaId, mediaType) => {
    navigation.navigate('Details', {media_id: mediaId, media_type: mediaType});
  };

  const renderTvShow = ({item}) => (
    <TouchableOpacity
      style={styles.mediaContainer}
      onPress={() => handleMediaPress(item.id, 'tv')}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w300/${item.poster_path}`}}
        style={styles.posterImage}
      />
    </TouchableOpacity>
  );

  const renderMovies = ({item}) => (
    <TouchableOpacity
      style={styles.mediaContainer}
      onPress={() => handleMediaPress(item.id, 'movie')}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w300/${item.poster_path}`}}
        style={styles.posterImage}
      />
    </TouchableOpacity>
  );

  const renderTrendingPeoples = ({item}) => (
    <View style={styles.peopleContainer}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w300/${item.profile_path}`}}
        style={styles.peopleImage}
      />
      <Text style={styles.peoplename}>{item.name}</Text>
    </View>
  );
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>Trending Tv Shows</Text>
        <FlatList
          data={trendingShows}
          renderItem={renderTvShow}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.heading}>Trending Movies</Text>
        <FlatList
          data={trendingMovies}
          renderItem={renderMovies}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.heading}>Trending Peoples</Text>
        <FlatList
          data={trendingPeoples}
          renderItem={renderTrendingPeoples}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default HomeCorousal;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  mediaContainer: {
    marginRight: 10,
  },
  posterImage: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  peopleContainer: {
    marginRight: 10,
  },
  peopleImage: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  peoplename: {
    fontSize: 13,
    marginTop: 5,
  },
});
