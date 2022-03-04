import React, { useEffect, useState } from 'react'

export const Search = ({ searchFlag, setSearchTerm }) => {
    
    const [input, setInput] = useState('')

    // if category is selected, then it sets the search input field to blank
    // change local state based on main App category state
    useEffect(() => {
        setInput('')
    }, [searchFlag])

    // input field is cleared, then searchTerm is set to blank
    // if local state changes to blank, then main App state is also changed
    useEffect(() => {
        if (input === '')
            setSearchTerm('')
    }, [input])

    const handleOnSubmit = (event) => {
        event.preventDefault()
        setSearchTerm(input)
    }

    const handleOnChange = (event) => {
        setInput(event.target.value)
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <input className='search' type='search' placeholder='Search...'
                    value={input} onChange={handleOnChange} />
        </form>
    )
}
