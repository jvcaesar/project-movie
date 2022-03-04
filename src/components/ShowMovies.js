import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Movie } from './Movie'
import './movies.css'

export const ShowMovies = ({ image_base_url, image_size, movies }) => {
  return (
    <motion.div layout className='movie-container'>

        <AnimatePresence>
            {movies.map(movie => (
                <Movie
                    key={movie.id}
                    image_base_url={image_base_url}
                    image_size={image_size}
                    movie={movie}
                />
            ))}
        </AnimatePresence>
        
    </motion.div>
  )
}
