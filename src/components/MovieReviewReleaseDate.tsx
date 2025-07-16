import type { MovieReviewComponentProps } from '../types/movieReview'

export default function MovieReviewReleaseDate({
  movie,
}: MovieReviewComponentProps) {
  return <div className="flex">{movie.release_date}</div>
}
