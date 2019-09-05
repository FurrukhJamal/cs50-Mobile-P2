// import app from "./navigationexample_App";
// export default app;

import React from 'react';
import {TextInput, StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import {Constants} from "expo";
//import {Filmlist} from "./movie_navigator"
import {createStackNavigator, createAppContainer} from "react-navigation";
import {Filmlistscreen, Filmscreen} from "./project3-movie-navigationscreens";


const AppNavigator = createStackNavigator({
  filmlist : Filmlistscreen,
  filmdetail : Filmscreen
},
{
  initialRouteName : "filmlist",
  headerLayoutPreset: 'center',
}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  render () {
    return (
      <AppContainer />
    );
  }

}
