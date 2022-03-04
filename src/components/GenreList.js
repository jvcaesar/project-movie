import React from 'react'



export const GenreList = ({ genres, activeGenre, setActiveGenre }) => {

    // make an array of genres selected. 2nd click on genre will remove it from array
    const handleOnClick = (genre) => {
        //console.log(genre.id)
        const array = [...activeGenre]
        const idx = activeGenre.indexOf(genre.id)
        if (idx !== -1) {
            setActiveGenre(array.filter((value, index, arr) => { return value !== genre.id }))
        } else {
            array.push(genre.id)
            setActiveGenre(array)
        }
    }

    const isActive = (genre) => {
        return activeGenre.includes(genre.id) ? 'active' : ''
    }

    const Button = ({ genre }) => {
        return <button className={isActive(genre)} onClick={() => handleOnClick(genre)}>{genre.name}</button>
    }

  return (
    <div className='genres-list'>
        {genres.map(genre => 
            <Button key={genre.id} genre={genre} />
        )}
    </div>
  )
}
