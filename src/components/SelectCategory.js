import React from 'react'

export const SelectCategory = ({ movie_category, category, setCategory }) => {
  
    const handleOnChange = event => {
        setCategory(event.target.value)
    }

    return (
    <select value={category} onChange={handleOnChange}>
        {movie_category.map(item => (
                <option key={item.value} value={item.value}>{item.label}</option>
        ))}
    </select>
  )
}
