import type { MovieReviewReviewOutputProps } from '../types/movieReview'

export default function MovieReviewReviewOutput({
  showReview,
  movie,
  reviewData,
}: MovieReviewReviewOutputProps) {
  return (
    <>
      {showReview.show &&
        showReview.id === movie.id &&
        reviewData
          .filter((review) => review.movieId === movie.id)
          .map((review) => (
            <div
              key={review.reviewId}
              className="flex w-full flex-col justify-between"
            >
              <div className="flex w-full flex-row justify-between border-b-1 border-dashed border-stone-400 bg-neutral-300 p-5">
                <div className="w-20 pr-2 text-4xl">{review.movieRating}</div>
                <div className="flex w-4/5 text-justify">
                  {review.movieReview}
                </div>
              </div>
            </div>
          ))}
    </>
  )
}
