import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AppUI} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {getCastDetailById} from '../../Services/movie_show_data/apiData';

const CastDetails = ({route}) => {
  const navigation = useNavigation();
  const [castId, setCastId] = useState(null);
  const [castDetail, setCastDetail] = useState([]);

  useEffect(() => {
    const id = route?.params?.cast_id;
    setCastId(id);
  }, [route.params]);

  const handleBackButton = () => {
    navigation.goBack();
  };

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
      </View>
      <ScrollView
        style={styles.scrollviewContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.personImageDetails}>
          <Image
            style={styles.personImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${castDetail?.profile_path}`,
            }}
          />
          <View style={styles.personDetails}>
            <Text style={styles.PersonName}>{castDetail?.name}</Text>
            <View style={styles.birthLocationContainer}>
              <Image
                style={styles.birthLocationIcon}
                source={require('../../Images/theater.png')}
              />
              <Text style={styles.birthLocationText}>
                {castDetail?.known_for_department}
              </Text>
            </View>
            <View style={styles.birthLocationContainer}>
              <Image
                style={styles.birthLocationIcon}
                source={require('../../Images/cake.png')}
              />
              <Text style={styles.birthLocationText}>
                {castDetail?.birthday}
              </Text>
            </View>
            <View style={styles.birthLocationContainer}>
              <Image
                style={styles.birthLocationIcon}
                source={require('../../Images/location.png')}
              />
              <Text style={styles.birthLocationText}>
                {castDetail?.place_of_birth}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.biographyDetailContainer}>
          <Text style={styles.biographyDetailsText}>
            {castDetail?.biography}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default CastDetails;

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
  personImageDetails: {
    flexDirection: 'row',
    marginBottom: 20,
    // alignItems: 'center',
  },
  personImage: {
    width: 100,
    height: 130,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  scrollviewContent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  personDetails: {
    marginLeft: 20,
    maxWidth: '60%',
  },
  department: {
    color: '#D8D9DA',
    fontSize: 15,
    marginBottom: 10,
  },
  PersonName: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
  },
  birthLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  birthLocationIcon: {
    tintColor: '#D8D9DA',
    height: 15,
    width: 15,
  },
  birthLocationText: {
    color: '#D8D9DA',
    fontSize: 15,
    marginLeft: 10,
  },
  biographyDetailContainer: {
    // maxWidth: '90%',
    marginBottom: 20,
  },
  biographyDetailsText: {
    color: '#fff',
    fontSize: 15,
  },
});
