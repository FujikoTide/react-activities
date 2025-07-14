import { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import MovieReviewHeader from './MovieReviewHeader'
import MovieReviewInput from './MovieReviewInput'
import MovieReviewMain, { type MovieDataState } from './MovieReviewMain'
import WideContainer from './WideContainer'
import { queryMovies, type ReviewDataState } from '../util/movieReview'

export default function MovieReview() {
  const [searchTerm, setSearchTerm] = useState('')
  const [movieData, setMovieData] = useState<MovieDataState>({ data: null })
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchTerm(value)
  }

  const [reviewData, setReviewData] = useLocalStorage<ReviewDataState[]>(
    'movieReviews',
    [],
  )

  const getMovieData = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newData = await queryMovies({
        searchTerm: searchTerm,
        searchType: 'search',
      })
      setMovieData({ data: newData })
    } catch (error) {
      console.error(`Error when trying to search`, error)
    }
  }

  return (
    <WideContainer>
      <MovieReviewHeader />
      <MovieReviewMain {...movieData} />
      <MovieReviewInput
        getMovieData={getMovieData}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
    </WideContainer>
  )
}
