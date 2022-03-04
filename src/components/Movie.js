import React from 'react'
import { motion } from 'framer-motion'

const BLANK_IMAGE = './movie-blank.jpg'

export const Movie = ({ image_base_url, image_size, movie }) => {
  
    let image_url = image_base_url+image_size
    if(movie.backdrop_path) {
        image_url = image_url+movie.backdrop_path
    } 
    else {
        image_url = BLANK_IMAGE
    }

    return (
        <motion.div 
            layout
            className='movie-card'
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
        >
            <h2>{movie.title}</h2>
            <img className='backdrop-img' src={`${image_url}`} alt='pic not available' />
        </motion.div>
  )
}
