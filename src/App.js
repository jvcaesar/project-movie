import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import { GenreList } from './components/GenreList'
import { InfoScreen } from './components/InfoScreen'
import { Search } from './components/Search'
import { SelectCategory } from './components/SelectCategory'
import { ShowMovies } from './components/ShowMovies'
import Pagination from './custom-hook/Pagination'

const API_KEY = 'api_key=e68f7c430ba266a4db6949442e59ad7d'
const MOVIE_API_URL = 'https://api.themoviedb.org/3/'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'
const IMAGE_SIZE = 'w300'
const MAX_TOTAL_PAGES = 500

const movie_category = [
  { label: '...', value: '' },
  { label: 'Popular', value: 'popular' },
  // latest doesn't work, probably because there's just one movie returned?
  // { label: 'Latest', value: 'latest' },
  { label: 'Now_playing', value: 'now_playing' },
  { label: 'Top_rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' }
]

const App = () => {

  // ***** States
  const [activeUrl, setActiveUrl] = useState('')
  const [movies, setMovies] = useState([])
  const [category, setCategory] = useState('popular')
  const [genres, setGenres] = useState([])
  const [activeGenre, setActiveGenre] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchFlag, setSearchFlag] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const movieRef = useRef()

  const getMovies = async (url) => {
    const data = await fetch(url)
    const movies = await data.json()
    //console.log(movies)
    setMovies(movies.results)
    if (movies.total_pages > MAX_TOTAL_PAGES)
      setTotalPages(MAX_TOTAL_PAGES)
    else
      setTotalPages(movies.total_pages)
  }

  const getGenreList = async () => {
    const data = await fetch(`${MOVIE_API_URL}genre/movie/list?${API_KEY}`)
    const genreList = await data.json()
    setGenres(genreList.genres)
  }

  // read the genrelist on first render only
  useEffect(() => {
    getGenreList()
  }, [])

  // getMovies when current page changes
  useEffect(() => {
    if (activeUrl === '')
      return
    getMovies(`${activeUrl}&page=${currentPage}`)
    // window scroll is to show top of page when page changes
    //window.scroll(0, 0)
  }, [currentPage])

  // when activeUrl changes, set currentpage to 1
  useEffect(() => {
    setCurrentPage(1)
  }, [activeUrl])

  // default get popular movies on first render, or by category
  // ***************
  useEffect(() => {
    // cleaning up for blank category or blank search field
    if (category === '' && searchTerm === '' && activeGenre.length === 0) {
      setMovies([])
      return
    } else if (category === '')
      return
    if (searchTerm !== '') {
      setSearchTerm('')
      setSearchFlag(prevState => !prevState)
    }
    if(activeGenre.length)
      setActiveGenre([])

    const url = `${MOVIE_API_URL}movie/${category}?${API_KEY}&page=${currentPage}`
    //console.log('url:', url)
    setActiveUrl(`${MOVIE_API_URL}movie/${category}?${API_KEY}`)
    getMovies(url)
  }, [category])
  // -----------------

    // get movies from 1 or more genres
  // ***************
  useEffect(() => {
    // cleaning up for blank category or blank search field
    if (activeGenre.length === 0 && category === '' && searchTerm === '') {
      setMovies([])
      return
    } else if (activeGenre.length === 0)
      return
    if (category !== '')
      setCategory('')
    if (searchTerm !== '') {
      setSearchTerm('')
      setSearchFlag(prevState => !prevState)
    }
    const genre_path = `${MOVIE_API_URL}discover/movie?${API_KEY}`
    const genre_url = `${genre_path}&with_genres=${activeGenre}&query=${searchTerm}&page=${currentPage}`
    //console.log('genre url:', genre_url)
    setActiveUrl(`${genre_path}&with_genres=${activeGenre}&query=${searchTerm}`)
    getMovies(genre_url)
  }, [activeGenre])
  // -----------------

  // get movies from search term
  // ***************
  useEffect(() => {
    // cleaning up for blank category or blank search field
    if (category === '' && searchTerm === '' && activeGenre.length === 0) {
      setMovies([])
      return
    } else if (searchTerm === '')
      return
    if(activeGenre.length)
      setActiveGenre([])
    setCategory('')
    const search_path = `${MOVIE_API_URL}search/movie?${API_KEY}`
    const search_url = `${search_path}&query=${searchTerm}&page=${currentPage}`
    //console.log('search url', search_url)
    setActiveUrl(`${search_path}&query=${searchTerm}`)
    getMovies(search_url)
  }, [searchTerm])
  // -----------------

  // for scrolling to the top on page changes
  useEffect(() => {
    //console.log(movies)
    movieRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [movies])

  const handlePageClick = (page) => {
    setCurrentPage(page)
    // movieRef.current.scrollIntoView({ behavior: 'smooth' })
    //window.scroll(0, 0)
  }

  return (
    <div className="main-app">

      <h3 ref={movieRef}>admin navbar</h3>
      <h4>movie selection navbar</h4>

      <SelectCategory
          movie_category={movie_category}
          category={category}
          setCategory={setCategory}
      />

      <GenreList
          genres={genres}
          activeGenre={activeGenre}
          setActiveGenre={setActiveGenre}
      />

      <Search
          searchFlag={searchFlag}
          setSearchTerm={setSearchTerm}
      />

      <div className='show-movies'>
        <p>Page: {currentPage}</p>
        <ShowMovies
          image_base_url={IMAGE_BASE_URL}
          image_size={IMAGE_SIZE}
          movies={movies}
        />
      </div>

      {movies.length !== 0 ? 
                <Pagination
                  className='pagination-bar'
                  currentPage={currentPage}
                  totalPageCount={totalPages}
                  // onPageChange={page => setCurrentPage(page)}
                  onPageChange={page => handlePageClick(page)}
                  siblingCount={1}
                /> : 
                <InfoScreen empty={true} />
      }

    </div>
  );
}

export default App;
