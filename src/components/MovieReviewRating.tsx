import type { MovieReviewComponentProps } from '../util/movieReview'

export default function MovieReviewRating({
  movie,
}: MovieReviewComponentProps) {
  return <div className="flex">{movie.vote_average}</div>
}
