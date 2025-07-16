import axios from 'axios'
import type {
  QueryMovieProps,
  ReviewDataState,
  ReviewState,
  SearchTypeMapProps,
} from '../types/movieReview'

const searchTypeMap: SearchTypeMapProps = {
  search: '/search/movie?query=',
  popular: 'movie/popular?language=en-US&page=1',
  'top rated': 'movie/top_rated?language=en-US&page=1',
  upcoming: 'movie/upcoming?language=en-US&page=1',
}

const url = {
  base: 'https://api.themoviedb.org/3/',
  // defaultOptions: '&include_adult=false&language=en-US&page=1',
  defaultOptions: '&language=en-US&page=1',
}

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
}

export const queryMovies = async ({
  searchType,
  searchTerm,
}: QueryMovieProps) => {
  let queryUrl
  if (!searchTerm) {
    queryUrl = `${url.base}${searchTypeMap[searchType]}`
  } else {
    queryUrl = `${url.base}${searchTypeMap[searchType]}${searchTerm}${url.defaultOptions}`
  }
  try {
    const response = await axios.get(queryUrl, options)
    if (response.status === 200) {
      return response.data.results
    }
    return null
  } catch (error) {
    console.error(`Error when trying to retrieve from ${queryUrl}`, error)
  }
}

export const getReviewCount = (
  reviewData: ReviewDataState[],
  movieId: number,
) => {
  const reviewCount = reviewData.filter(
    (review) => review.movieId === movieId,
  ).length
  return reviewCount
}

export const reviewButton = (
  reviewData: ReviewDataState[],
  movieId: number,
  showReview: ReviewState,
) => {
  const reviewCount = getReviewCount(reviewData, movieId)
  if (showReview.id === movieId && showReview.show) {
    return 'Hide Reviews'
  } else {
    return reviewCount > 0 ? `Reviews (${reviewCount})` : 'No Reviews'
  }
}
