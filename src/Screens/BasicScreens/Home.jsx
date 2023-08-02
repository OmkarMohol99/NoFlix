import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {AppUI} from '../../constants';
import HomeCorousal from './Components/HomeCorousal';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const handleSearch = () => {
    navigation.navigate('Search');
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.homeContent}>
        <Text style={styles.homeHeader}>What do you want to watch?</Text>
        <TouchableOpacity activeOpacity={1} onPress={handleSearch}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchText}>Search</Text>
            <Image
              style={styles.searchIcon}
              source={require('../../Images/searchBorder.png')}
            />
          </View>
        </TouchableOpacity>
        <View>
          <HomeCorousal />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: AppUI.APP_THEME_BACKGROUND,
    width: '100%',
    height: '100%',
    // alignItems: 'center',
  },
  homeHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  homeContent: {
    padding: 10,
  },
  searchContainer: {
    width: '100%',
    height: 40,
    backgroundColor: '#424D56',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
  },
  searchText: {
    color: '#F7EBFF',
  },
  searchIcon: {
    width: 16,
    height: 16,
    tintColor: '#F7EBFF',
  },
});
