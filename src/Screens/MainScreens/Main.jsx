import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Home from '../BasicScreens/Home';
import Wishlist from '../BasicScreens/Wishlist';
import Profile from '../BasicScreens/Profile';
import Discover from '../BasicScreens/Discover';

const Main = ({navigation}) => {
  const [activeScreen, setActiveScreen] = useState(0);

  const renderScreens = () => {
    switch (activeScreen) {
      case 0:
        return <Home />;
      case 1:
        return <Discover />;
      case 2:
        return <Wishlist />;
      case 3:
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <>
      <View style={styles.screenContainer}>{renderScreens()}</View>
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveScreen(0)}>
            <Image
              style={styles.tabIcon}
              source={
                activeScreen === 0
                  ? require('../../Images/homeFill.png')
                  : require('../../Images/homeBorder.png')
              }
            />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => setActiveScreen(1)}>
            <Image
              style={styles.tabIcon}
              source={
                activeScreen === 1
                  ? require('../../Images/discoverFill.png')
                  : require('../../Images/discoverBorder.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveScreen(2)}>
            <Image
              style={styles.tabIcon}
              source={
                activeScreen === 2
                  ? require('../../Images/wishlistFill.png')
                  : require('../../Images/wishlistBorder.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveScreen(3)}>
            <Image
              style={styles.tabIcon}
              source={
                activeScreen === 3
                  ? require('../../Images/profileFill.png')
                  : require('../../Images/profileBorder.png')
              }
            />
          </TouchableOpacity> */}
        </View>
      </View>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  screenContainer: {
    marginBottom: 52,
  },
  tabContainer: {
    height: 70,
    backgroundColor: '#010003',
    width: Dimensions.get('window').width,
    elevation: 5,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopWidth: 2,
    borderColor: '#424D56',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  tabIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
});
