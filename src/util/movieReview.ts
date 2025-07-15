import axios from 'axios'

export interface MovieDataItem {
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_title: string
  overview: string
  poster_path: string
  release_date: string
  title: string
  vote_average: number
  vote_count: number
}

export interface ReviewDataState {
  reviewId: number
  movieId: number
  movieReview: string
  movieRating: number
}

export interface SearchTypeMapProps {
  search: string
  popular: string
  'top rated': string
  upcoming: string
}

export interface QueryMovieProps {
  searchTerm?: string
  searchType: keyof SearchTypeMapProps
}

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
