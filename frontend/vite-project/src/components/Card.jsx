import React, { useState } from 'react'

const Card = (props) => {

    const [rating, setrating] = useState(-1)
    const [ratingvisible, setRatingVisible] = useState(false)

    async function getRating() {
        console.log(props.name)
        let pre_rating = await fetch(`http://localhost:3000/movies/${props.name}`)
        let final_rating_json = await pre_rating.json()
        setrating(final_rating_json["rating"])
        if (ratingvisible) {
          setRatingVisible(false)
        }
        setRatingVisible(true)
    }

  return (
    <div className='w-[300px] border border-solid flex flex-col gap-2'>
      <img src={`https://static.vecteezy.com/system/resources/thumbnails/012/657/549/small/illustration-negative-film-reel-roll-tapes-for-movie-cinema-video-logo-vector.jpg`} alt="" className='w-[300px] h-[200px] object-cover'/>
      {/* <img src={`https://image.tmdb.org/t/p/original${props.path}`} alt="" className='w-[300px] h-[200px] object-cover'/> */}
      <h1 className='font-bold text-center'>{props.name}</h1>
      {/* props.name?.split("(")[0 */}
      {ratingvisible && <h1 className=' text-center'>Rating: {rating}</h1>}
      <button onClick={getRating} className='bg-slate-600 rounded-md p-2 mx-auto'>get rating</button>
    </div>
  )
}

export default Card
