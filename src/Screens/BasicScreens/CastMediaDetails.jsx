import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  getCastDetailById,
  getMoviesAndTvShowsByCastId,
} from '../../Services/movie_show_data/apiData';
import {AppUI} from '../../constants';

const CastMediaDetails = ({route}) => {
  const navigation = useNavigation();
  const [castId, setCastId] = useState(null);
  const [castDetail, setCastDetail] = useState([]);
  const [mediaDetails, setMediaDetails] = useState([]);
  console.log(mediaDetails);

  const handleBackButton = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const id = route?.params?.cast_id;
    setCastId(id);
  }, [route?.params]);

  useEffect(() => {
    const getCastDetail = async () => {
      try {
        const response = await getCastDetailById(castId);
        setCastDetail(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCastDetail();
  }, [castId]);

  useEffect(() => {
    const getMediaDetails = async () => {
      try {
        const response = await getMoviesAndTvShowsByCastId(castId);
        setMediaDetails(response?.data?.cast);
      } catch (error) {
        console.log(error);
      }
    };
    getMediaDetails();
  }, [castId]);

  const handleCastPersonInfo = () => {
    navigation.navigate('CastDetails', {cast_id: castId});
  };

  const handleMediaPress = (mediaId, mediaType) => {
    navigation.navigate('Details', {media_id: mediaId, media_type: mediaType});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButton}>
          <Image
            style={styles.backButton}
            source={require('../../Images/backButton.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerPersonName}>{castDetail?.name}</Text>
        <TouchableOpacity onPress={handleCastPersonInfo}>
          <Image
            style={styles.backButton}
            source={require('../../Images/info.png')}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.mediaDetails}>
        <View style={styles.mediaPosterContainer}>
          {mediaDetails?.map(media => (
            <>
              <TouchableOpacity
                onPress={() => handleMediaPress(media?.id, media?.media_type)}>
                <Image
                  key={media?.id}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w300/${media?.poster_path}`,
                  }}
                  style={styles.mediaPoster}
                />
              </TouchableOpacity>
            </>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CastMediaDetails;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: AppUI.APP_THEME_BACKGROUND,
  },
  header: {
    width: '100%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#424D56',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 25,
    height: 25,
    tintColor: '#fff',
  },
  headerPersonName: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 20,
  },
  mediaDetails: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  mediaPoster: {
    height: 150,
    width: 110,
    borderRadius: 5,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  mediaPosterContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
