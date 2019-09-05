import React from "react";

export const getdata = async (value) => {
  let response  = await fetch(`http://www.omdbapi.com/?apikey=a744a889&s=${value}&type=movie`)
  let result = await response.json()
  console.log(result.totalResults)
  if(result.Search)
  {
      let data =[]
      // pushing first page
      data = result.Search.map(obj => (obj))
      //data.push(result.Search)
      //console.log(data)
      if(result.totalResults > 10 && result.totalResults % 10 != 0)
      {
        let counter = Math.floor(result.totalResults/10) + 1;
        for(let i = 2; i <= counter; i++)
        {
          response  = await fetch(`http://www.omdbapi.com/?apikey=a744a889&s=${value}&type=movie&page=${i}`)
          result = await response.json()
          let page = result.Search.map(obj => (obj));
          //merging two arrays of objects to form one array of object
          data = data.concat(page)
        }

        console.log(data)
        return data
      }
      else if (result.totalResults > 10 && result.totalResults % 10 == 0)
      {
        let counter = Math.floor(result.totalResults/10)
        for(let i = 2; i <= counter; i++)
        {
          response  = await fetch(`http://www.omdbapi.com/?apikey=a744a889&s=${value}&type=movie&page=${i}`)
          result = await response.json()
          let page = result.Search.map(obj => (obj));
          //merging two arrays of objects to form one array of object
          data = data.concat(page)
        }

        //console.log(data)
        return data
      }
      else if (result.totalResults < 10)
      {
        return data
      }
      //return result.Search;
  }


}








export const getfilmdetail = async (data) => {
  const response = await fetch(`http://www.omdbapi.com/?apikey=a744a889&i=${data}`);
  const result = await response.json()
  //console.log(result);
  return ({
    Title : result.Title,
    Year : result.Year,
    Poster : result.Poster,
    Genre : result.Genre,
    Plot : result.Plot,
    Ratings : (result.Ratings[0] ? result.Ratings[0].Value : "N/A"),
    Starring : result.Actors,
  })
}
