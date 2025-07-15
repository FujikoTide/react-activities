import type { MovieReviewComponentProps } from '../util/movieReview'

export default function MovieReviewReleaseDate({
  movie,
}: MovieReviewComponentProps) {
  return <div className="flex">{movie.release_date}</div>
}
