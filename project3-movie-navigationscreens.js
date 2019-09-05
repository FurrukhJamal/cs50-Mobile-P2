import React from "react";

import {Text, TextInput, View, StyleSheet, Image} from "react-native";
import Filmlist from "./project3-movie-list.js";
import {getdata , getfilmdetail} from "./project3-movie-api.js";
import {Constants} from "expo"


export class Filmlistscreen extends React.Component {
  //to remove the header on first page
  static navigationOptions = {
  headerStyle: {display:"none"},

  }

  state = {
    data :null
  }


  handlesearch = async (value) => {
    //console.log(value)
    const data = await getdata(value);
    //console.log(data)
    let test;

    if(data)
    {
      test = data.map((obj,key) => {
      //console.log("inside map", key, obj)
      return {key: key.toString() , ...obj}

    })

      //console.log("TEST IS" ,test);
    }

    this.setState({data: test})
    //console.log(this.state.data)

  }


  handleSelect = async (filmdetail) => {
    console.log(filmdetail)
    //getting the details of that particular film
    const details = await getfilmdetail(filmdetail.imdbID)
    //console.log("Film Detail", filmdetail)
    this.props.navigation.push("filmdetail", details)
  }



  render (){
    /*adding a key called onSelect in each object passed from screenprops
    and referencing it to this.handleSelect so that each row from
    project3-movie-list.js could use that function to change the screen. As only
    one prop could be passed in FlatList for data  */
    let test;
    if(this.state.data){
    test = this.state.data.map((obj) => {
        return {
          onSelect : this.handleSelect, ...obj
        }
    });
    }
    //console.log(test);

    return (

      <View style={styles.container}>
        <Text style = {styles.heading}>Home</Text>

        <TextInput
          style= {styles.search}
          placeholder = "Search Movie"
          onChangeText = {this.handlesearch}/>
          {this.state.data ? (
            <Filmlist
              movies = {test}
              />

          ): <Text>no result</Text>}

      </View>
    );

  }
}





export class Filmscreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle : navigation.getParam("Title"),
    headerTintColor : "blue",
    headerTitleStyle : {
      fontWeight: 'bold',
    }
  })
  render (){
    return (
      <View style = {styles.container2}>
        <Image
          style = {{width: 300, height : 300}}
          source = {{uri : this.props.navigation.getParam("Poster")}}
          />
          {/*View for release date and genre*/}
        <View style = {styles.yeargenre}>
          <View style = {styles.filmdetail}>
            <Text style = {{paddingRight : 5, fontWeight : "bold"}}>Released:</Text>
            <Text> {this.props.navigation.getParam("Year")}</Text>
          </View>
          <View style = {styles.filmdetail}>
            <Text style = {{paddingRight : 5, fontWeight : "bold"}}>Genre:</Text>
            <Text>{this.props.navigation.getParam("Genre")}</Text>
          </View>
        </View>

        {/*View for starring*/}
        <View style = {styles.filmdetail}>
          <Text style = {{paddingRight : 5, fontWeight : "bold"}}>Starring:</Text>
          <Text>{this.props.navigation.getParam("Starring")}</Text>
        </View>

        {/*Plot*/}
        <View style= {styles.plot}>
          <Text style = {{fontWeight : "bold"}}>Plot</Text>
          <Text>{this.props.navigation.getParam("Plot")}</Text>
        </View>

        <Text style = {{paddingTop : 20}}>Imdb Rating: {this.props.navigation.getParam("Ratings")}</Text>

      </View>



    )
  }
}






const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent : "center",

  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent : "center",
    //backgroundColor : "red"
  },
  heading : {
    fontSize: 30,
    padding: Constants.statusBarHeight,
  },
  search : {

    borderStyle : "solid",
    borderColor: "cadetblue",
    borderBottomWidth: 1,
    alignSelf : "stretch",
    margin : 20,
  },

  filmdetail : {
    flexDirection : "row",
    alignItems : "center",
    //justifyContent : "center",
    paddingRight : 10,
    flexWrap: "wrap"
  },

  yeargenre : {
    flexDirection : "row",
    flexWrap : "wrap",
    alignItems : "center",
    paddingTop : 8
  },

  plot : {
    paddingTop: 20,
    alignItems : "center"

  },

});
