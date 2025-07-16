export interface MovieReviewComponentProps {
  movie: MovieDataItem
}

export interface MovieReviewReviewOutputProps
  extends MovieReviewComponentProps {
  showReview: ReviewState
  reviewData: ReviewDataState[]
}

export interface MovieReviewButtonsProps extends MovieReviewComponentProps {
  reviewData: ReviewDataState[]
  handleOpenModal: (data: MovieDataItem) => void
  handleReview: (movie: MovieDataItem) => void
}

export interface MovieReviewCardProps
  extends Omit<MovieReviewButtonsProps, 'movie'> {
  showReview: ReviewState
  movieData: MovieDataState
}

export interface MovieReviewModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  modalData: MovieDataItem
  formData: FormDataState
  submitReview: (e: React.FormEvent) => void
  handleForm: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
}

export interface MovieReviewMainProps {
  movieData: MovieDataState
  reviewData: ReviewDataState[]
  setReviewData: React.Dispatch<React.SetStateAction<ReviewDataState[]>>
}

export interface MovieReviewInputProps {
  getMovieData: (e: React.FormEvent) => Promise<void>
  getMovieDataByList: (
    type: Exclude<keyof SearchTypeMapProps, 'search'>,
  ) => Promise<void>
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchTerm: string
}

export type MovieDataState = MovieDataItem[] | null

export interface ReviewState {
  id: number
  show: boolean
}

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

export interface FormDataState {
  movieId: number
  movieReview: string
  movieRating: number
}

export interface ReviewDataState extends FormDataState {
  reviewId: number
}

export type MovieReviewModalContentType = Omit<
  MovieReviewModalProps,
  'isModalOpen' | 'handleCloseModal'
>

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
