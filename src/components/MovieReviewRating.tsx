import type { MovieReviewComponentProps } from '../types/movieReview'

export default function MovieReviewRating({
  movie,
}: MovieReviewComponentProps) {
  return <div className="flex">{movie.vote_average}</div>
}
