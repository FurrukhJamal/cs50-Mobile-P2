import React from "react"
import {View, Text, TouchableOpacity, FlatList, StyleSheet, Image} from "react-native"
//import {createStackNavigator, createAppContainer} from "react-navigation"
import PropTypes from "prop-types";


const renderItem = (obj) =>(
      <TouchableOpacity
        key = {obj.item.key} style = {styles.filmlist}
        //functionality when its clicked
        onPress = {() => obj.item.onSelect(obj.item)}>
      <Image
        style={{width: 50, height: 50}}
        source={{uri: obj.item.Poster}}
      />
        <Text style = {{paddingRight : 3, paddingLeft : 2}}>{obj.item.Title}</Text>
        <Text style = {{padding : 1}}>({obj.item.Year})</Text>
      </TouchableOpacity>
    )


const Filmlist = props => (
  <FlatList renderItem = {renderItem} data = {props.movies} />
);



Filmlist.propTypes = {
  movies : PropTypes.array
}


const styles = StyleSheet.create({
  filmlist : {
    flexDirection : "row",
    alignItems : "center",
    paddingTop : 10
  }
});

export default Filmlist;
