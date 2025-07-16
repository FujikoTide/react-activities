import type { MovieReviewComponentProps } from '../types/movieReview'

export default function MovieReviewPoster({
  movie,
}: MovieReviewComponentProps) {
  let moviePoster
  if (movie.poster_path) {
    moviePoster = (
      <img
        src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
        alt={movie.title}
        className="rounded-2xl"
      />
    )
  } else {
    moviePoster = <span className="text-xl text-stone-500">No Poster</span>
  }
  return (
    <div className="flex w-[40%] justify-center bg-black p-5">
      {moviePoster}
    </div>
  )
}
