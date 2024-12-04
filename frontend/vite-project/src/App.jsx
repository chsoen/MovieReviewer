import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'
import reviewData from '../../../1000samples.json'

function App() {
  const [count, setCount] = useState("")
  const [pictures, setPictures] = useState([])
  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDc5ZDZjOWIwYWQzMjUwMmMxOWE1MjZiMzE2Mjg3MiIsIm5iZiI6MTczMzI2ODI1NC43NTksInN1YiI6IjY3NGY5MzFlNTIwMWY4YzE1ZjE3Njk0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UWLIhgxOfpLKalcIjFqno90u59CCz9Gz98gwXR_6Tm4'
  // useEffect(async () => {
  //   const promises = []
  //   reviewData.map(async (review, id) => {
  //     if(id >= 20) {
  //       return;
  //     }
  //     let movie_name = review["movie"]
  //     let new_name = movie_name.split(' ')
  //     new_name.pop()
  //     let name = new_name.join(' ')
  //     names.push(name)

  //     const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Cube%20Zero&include_adult=false&language=en-US&page=1`;
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         accept: 'application/json',
  //         Authorization: `Bearer ${API_KEY}` 
  //       }
  //     }
  //     promises.push(fetch(url, options))
  //   })
  //   let responses = await Promise.allSettled(promises)
  //   responses.forEach(async (response)=>{
  //     if(response.status === "fulfilled") {
  //       // console.log(response.value.json());
        
  //       let data = await response.value.json()
  //       pictures.push(data["results"][0]["poster_path"])
  //     } else {
  //       console.log(response.value);
        
  //     }
  //   })
  // }, [])
  useEffect(()=> {
    const BASE_URL = `https://api.themoviedb.org/3/search/movie`
    const url = 'https://api.themoviedb.org/3/discover/movie?with_genres=28';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDc5ZDZjOWIwYWQzMjUwMmMxOWE1MjZiMzE2Mjg3MiIsIm5iZiI6MTczMzI2ODI1NC43NTksInN1YiI6IjY3NGY5MzFlNTIwMWY4YzE1ZjE3Njk0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UWLIhgxOfpLKalcIjFqno90u59CCz9Gz98gwXR_6Tm4'
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        // pictures.push(json["poster_path"])
        console.log(json);
        const arr = []
        const onlyMovieNames = reviewData.map(data=>data["movie"])
        const movienames = onlyMovieNames.map(title=>title.split("(")[0])
        console.log(movienames)
        for(const movie of json['results']) {
          // console.log(reviewData.map(data=>data["movie"]))
          console.log(movie["title"])
          if(movie["title"].includes(movienames)) {
            console.log("Found");
            arr.push(movie["poster_path"])
          }
        }
        setPictures([...arr])
      })
      .catch(err => console.error(err));
      }, [])
  // console.log(movieData[0])

  useEffect(()=>{
    console.log("called")
    console.log(pictures);
    
  }, [pictures])

  async function getPath(name) {

    return "/cx31RUjyim2Bg0YEzbKZZI3imJ9.jpg"
  }
  return (
    <>
      <div className=' text-center'>
        <h1 className=' '>Movies</h1>
      </div>
      <div className=' flex gap-6 flex-wrap justify-center'>
        {
          reviewData.map((review, idx) => {
            let movie_name = review["movie"]
            // console.log(new_name)
            return <Card key={idx} name = {movie_name} path={pictures[idx]??""}/>
          })
        }
        {/* <Card name = {"Thappad (I) (2020)"}/>
        <Card name = {"After Life (2019\u2013 )"}/> */}
      </div>
    </>
  )
}

export default App
