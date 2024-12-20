import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'

import cards_data from '../../assets/cards/Cards_data'




const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([])

  const cardsRef = useRef()

  //tmdb api
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjljYTRmODY3MzM3OWMwYjEzNDIwMDI4MmVlNDVmMyIsIm5iZiI6MTczNDM3MDg2MS41NjYwMDAyLCJzdWIiOiI2NzYwNjYyZGFlODFhM2U0MzQ3ODJkNzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.n0-oVsxYh5CQcKpiXVlkTjLySHZssO3yG7RaR-6MgzE'
    }
  };
  
  const handleWheel= (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;

}

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category? category : "now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel', handleWheel)
},[])

  return (
    <div className='title-cards'>
      <h2>{title ? title :"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` +card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
      
    </div>
  )
}

export default TitleCards
