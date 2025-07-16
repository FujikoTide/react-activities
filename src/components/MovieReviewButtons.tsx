import type { MovieReviewButtonsProps } from '../types/movieReview'
import { getReviewCount } from '../util/movieReview'

export default function MovieReviewButtons({
  movie,
  reviewData,
  handleOpenModal,
  handleReview,
}: MovieReviewButtonsProps) {
  return (
    <div className="flex flex-row gap-2">
      <button
        type="button"
        className="flex h-10 w-full cursor-pointer items-center justify-center border-2 border-black bg-white p-2 hover:bg-orange-500 hover:text-white"
        onClick={() => handleOpenModal(movie)}
      >
        Add A Review
      </button>
      <button
        type="button"
        className="flex h-10 w-full cursor-pointer items-center justify-center border-2 border-black bg-white p-2 hover:bg-green-700 hover:text-white"
        onClick={() => handleReview(movie)}
      >
        {`${getReviewCount(reviewData, movie.id)}`}
      </button>
    </div>
  )
}
