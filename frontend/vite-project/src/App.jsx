import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'
import reviewData from '../../../1000samples.json'

function App() {
  const [count, setCount] = useState("")
  const [pictures, setPictures] = useState([])


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
      </div>
    </>
  )
}

export default App
