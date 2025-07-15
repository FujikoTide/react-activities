import type { MovieReviewComponentProps } from '../util/movieReview'

export default function MovieReviewInfo({ movie }: MovieReviewComponentProps) {
  return (
    <div className="flex flex-col">
      <div className="pb-2 text-left text-xl font-bold underline">
        {movie.title}
      </div>
      <div className="line-clamp-6 text-justify">{movie.overview}</div>
    </div>
  )
}
