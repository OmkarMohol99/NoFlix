import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Linking,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  getMediaCastDetails,
  getMediaDetailsById,
  getMediaVideosData,
} from '../../Services/movie_show_data/apiData';
import {AppUI} from '../../constants';

const DetailScreen = ({route}) => {
  const navigation = useNavigation();
  const [id, setId] = useState(null);
  const [type, setType] = useState('');
  const [mediaDetails, setMediaDetails] = useState([]);
  const [mediaVideoData, setMediaVideoData] = useState([]);
  const [castDetails, setCastDetails] = useState([]);
  console.log(castDetails);
  const TrailerData = mediaVideoData.find(media => media?.type === 'Trailer');

  useEffect(() => {
    const mediaId = route.params?.media_id;
    setId(mediaId);
    const mediaType = route.params?.media_type;
    setType(mediaType);
  }, [route.params]);

  useEffect(() => {
    const getMediaDetails = async () => {
      try {
        const response = await getMediaDetailsById(id, type);
        setMediaDetails(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (id && type) {
      getMediaDetails();
    }
  }, [id, type]);

  useEffect(() => {
    const getMediaVideo = async () => {
      try {
        const response = await getMediaVideosData(type, id);
        setMediaVideoData(response?.data?.results);
      } catch (error) {
        console.log(error);
      }
    };
    if (id && type) {
      getMediaVideo();
    }
  }, [id, type]);

  useEffect(() => {
    const getCastDetails = async () => {
      try {
        const response = await getMediaCastDetails(type, id);
        setCastDetails(response?.data?.cast);
      } catch (error) {
        console.log(error);
      }
    };
    if (id && type) {
      getCastDetails();
    }
  }, [id, type]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleOpenTrailer = showKey => {
    Linking.openURL(`https://www.youtube.com/watch?v=${showKey}`);
  };

  const handleMediaInfo = () => {
    try {
      Linking.openURL(`${mediaDetails?.homepage}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCastClick = castId => {
    navigation.navigate('CastMediaDetails', {cast_id: castId});
  };
  const renderCastDetails = ({item}) => (
    <TouchableOpacity
      style={styles.castPicture}
      onPress={() => handleCastClick(item?.id)}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w300/${item.profile_path}`}}
        style={styles.castImage}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailsHeaderContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image
            style={styles.backButton}
            source={require('../../Images/backButton.png')}
          />
        </TouchableOpacity>
        <Text style={styles.detailsText}>Details</Text>
        <TouchableOpacity>
          <Image
            style={styles.backButton}
            source={require('../../Images/wishlistBorder.png')}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.mediaPoster}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${mediaDetails?.backdrop_path}`,
          }}
        />
        <View style={styles.showDetailContainer}>
          <Image
            style={styles.mediaPosterSmall}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${mediaDetails?.poster_path}`,
            }}
          />
          <View style={styles.showDetails}>
            <Text style={styles.showName}>
              {type === 'movie'
                ? mediaDetails?.original_title
                : mediaDetails?.original_name}
            </Text>
            <Text style={styles.seasonEpisode}>
              {type === 'movie'
                ? '- - -'
                : `${mediaDetails?.number_of_seasons} Seasons | ${mediaDetails?.number_of_episodes} Episodes`}
            </Text>
            <View style={styles.showTimDateContainer}>
              <View style={styles.showTimeDateGenere}>
                <Image
                  style={styles.timeDateGenreImage}
                  source={require('../../Images/calendar.png')}
                />
                <Text style={styles.timeDateGenreText}>
                  {type === 'movie'
                    ? mediaDetails?.release_date
                    : mediaDetails?.first_air_date}
                </Text>
              </View>
              <View style={styles.showTimeDateGenere}>
                <Image
                  style={styles.timeDateGenreImage}
                  source={require('../../Images/star.png')}
                />
                <Text style={styles.timeDateGenreText}>
                  {mediaDetails?.vote_average}
                </Text>
              </View>
            </View>
            <View style={styles.youtubeAndHomepageButtonContainer}>
              <TouchableOpacity
                style={styles.youtubeButtonContainer}
                onPress={() => handleOpenTrailer(TrailerData?.key)}>
                <Image
                  style={styles.buttonIcon}
                  source={require('../../Images/play.png')}
                />
                <Text style={styles.buttonText}>Trailer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.homepageButtonContainer}
                onPress={handleMediaInfo}>
                <Image
                  style={styles.buttonIcon}
                  source={require('../../Images/world-wide-web.png')}
                />
                <Text style={styles.buttonText}>Watch</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.mediaDesc}>{mediaDetails?.overview}</Text>
        </View>
        <View style={styles.castContainer}>
          <Text style={styles.castText}>Cast</Text>
          <FlatList
            data={castDetails}
            renderItem={renderCastDetails}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppUI.APP_THEME_BACKGROUND,
  },
  detailsHeaderContainer: {
    height: 50,
    width: '100%',
    backgroundColor: '#010003',
    borderBottomWidth: 2,
    borderBottomColor: '#424D56',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    tintColor: '#fff',
    width: 25,
    height: 25,
  },
  detailsText: {
    color: '#fff',
    fontSize: 18,
  },
  mediaPoster: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 20,
  },
  mediaPosterSmall: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  showDetailContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  showDetails: {
    marginLeft: 20,
    maxWidth: '68%',
  },
  showName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  seasonEpisode: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  showTimDateContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  showTimeDateGenere: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  timeDateGenreImage: {
    width: 13,
    height: 13,
    tintColor: '#D8D9DA',
    marginLeft: 5,
  },
  timeDateGenreText: {
    color: '#D8D9DA',
    fontSize: 13,
    marginLeft: 5,
    marginRight: 10,
  },
  youtubeAndHomepageButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  youtubeButtonContainer: {
    width: '45%',
    height: 30,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  homepageButtonContainer: {
    width: '45%',
    height: 30,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  buttonIcon: {
    width: 15,
    height: 15,
    tintColor: '#fff',
    marginLeft: 15,
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    marginRight: 15,
  },
  mediaDesc: {
    fontSize: 15,
    color: '#fff',
  },
  castContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  castText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },
  castPicture: {
    marginRight: 10,
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  castImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  scrollContent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default DetailScreen;
