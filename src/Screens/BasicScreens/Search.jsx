import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {AppUI} from '../../constants';
import {getSearchedData} from '../../Services/movie_show_data/apiData';
import {useNavigation} from '@react-navigation/native';

const Search = () => {
  const navigation = useNavigation();
  const [searchedData, setSearchedData] = useState([]);

  const handleSearchData = async query => {
    const modifiedQuery = query.replace(/\s+/g, '+');
    try {
      const response = await getSearchedData(modifiedQuery);
      setSearchedData(response?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMediaPress = (mediaId, mediaType) => {
    navigation.navigate('Details', {media_id: mediaId, media_type: mediaType});
  };

  const renderSearchedData = ({item}) => (
    <TouchableOpacity
      style={styles.searchedDataContainer}
      onPress={() =>
        handleMediaPress(
          item?.id,
          item?.media_type === 'movie' ? 'movie' : 'tv',
        )
      }>
      <Image
        style={styles.mediaPoster}
        source={{uri: `https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}}
      />
      <Text style={styles.searchedDataName}>
        {item?.media_type === 'movie'
          ? item?.original_title
          : item?.original_name}
      </Text>
      <Image
        style={styles.searchIcon}
        source={require('../../Images/searchBorder.png')}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContent}>
        <Text style={styles.searchText}>Search</Text>
        <TextInput
          placeholder="The Walking Dead"
          placeholderTextColor="#F7EBFF"
          style={styles.searchBox}
          clearButtonMode="while-editing"
          cursorColor="#F7EBFF"
          onChangeText={e => handleSearchData(e)}
        />
        <View style={{flex: 1}}>
          <Text style={styles.topSearches}>Top Searches</Text>
          <ScrollView
            style={styles.searchScroll}
            showsVerticalScrollIndicator={false}>
            <FlatList
              data={searchedData}
              renderItem={renderSearchedData}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppUI.APP_THEME_BACKGROUND,
  },
  searchContent: {
    flex: 1,
    padding: 10,
  },
  searchText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  searchBox: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#424D56',
    marginBottom: 20,
    color: '#F7EBFF',
  },
  topSearches: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  searchedDataContainer: {
    alignItems: 'center',
    // justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#424D56',
  },
  searchedDataName: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 15,
    maxWidth: '50%',
  },
  searchScroll: {
    flex: 1,
  },
  searchIcon: {
    tintColor: '#fff',
    height: 16,
    width: 16,
    marginLeft: 'auto',
    marginBottom: 15,
  },
  mediaPoster: {
    width: 130,
    height: 70,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default Search;
