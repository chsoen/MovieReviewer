import React, { useEffect, useState } from 'react'
import Star from './Star'

const Card = (props) => {

    const [rating, setrating] = useState(-1)
    const [ratingvisible, setRatingVisible] = useState(false)

    const roundRating = (num)=> {
      return Math.round(num * 2) / 2;
    }

    useEffect(()=>{
      if((rating % 0.5) === 0) return
      setrating(prev=>roundRating(prev))
    }, [rating])

    async function getRating() {
        let pre_rating = await fetch(`http://localhost:3000/movies/${props.name}`)
        let final_rating_json = await pre_rating.json()
        setrating(final_rating_json["rating"])
        if (ratingvisible) {
          setRatingVisible(false)
        }
        setRatingVisible(true)
    }

  return (
    <div className='w-[300px] border border-solid flex flex-col gap-2 pb-3'>
      <img src={`https://static.vecteezy.com/system/resources/thumbnails/012/657/549/small/illustration-negative-film-reel-roll-tapes-for-movie-cinema-video-logo-vector.jpg`} alt="" className='w-[300px] h-[200px] object-cover'/>
      <h1 className='font-bold text-center'>{props.name}</h1>
      {ratingvisible && <h1 className=' text-center'>Rating: {rating}</h1>}
      <div className='flex gap-1.25 justify-center text-yellow-300'>
        {rating >= 0 && Array.from({ length: Math.floor(rating) }).map((_, index) => (
            <Star isFull={true}/>
        ))}
      {(rating - (Math.floor(rating))) > 0 && <Star isFull={false}/>}
      </div>
      <button onClick={getRating} className='bg-slate-600 rounded-md p-2 mx-auto text-white'>Get Rating</button>
    </div>
  )
}

export default Card
