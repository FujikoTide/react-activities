import { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import MovieReviewHeader from './MovieReviewHeader'
import MovieReviewInput from './MovieReviewInput'
import WideContainer from './WideContainer'
import MovieReviewMain from './MovieReviewMain'
import {
  queryMovies,
  type MovieDataState,
  type ReviewDataState,
  type SearchTypeMapProps,
} from '../util/movieReview'

const STORAGE_KEY = 'movieReviews'

export default function MovieReview() {
  const [searchTerm, setSearchTerm] = useState('')
  const [movieData, setMovieData] = useState<MovieDataState>(null)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchTerm(value)
  }

  const [reviewData, setReviewData] = useLocalStorage<ReviewDataState[]>(
    STORAGE_KEY,
    [],
  )

  const getMovieData = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newData = await queryMovies({
        searchTerm: searchTerm,
        searchType: 'search',
      })
      setMovieData(newData)
    } catch (error) {
      console.error(`Error when trying to search`, error)
    }
  }

  const getMovieDataByList = async (
    type: Exclude<keyof SearchTypeMapProps, 'search'>,
  ) => {
    try {
      const newData = await queryMovies({ searchType: type })
      setMovieData(newData)
    } catch (error) {
      console.error(`Error when trying to get List`, error)
    }
  }

  return (
    <WideContainer>
      <MovieReviewHeader />
      <MovieReviewMain
        movieData={movieData}
        reviewData={reviewData}
        setReviewData={setReviewData}
      />
      <MovieReviewInput
        getMovieData={getMovieData}
        getMovieDataByList={getMovieDataByList}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
    </WideContainer>
  )
}
