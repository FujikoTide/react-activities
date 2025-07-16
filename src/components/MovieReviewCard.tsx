import type { MovieDataItem, MovieReviewCardProps } from '../types/movieReview'
import MovieReviewButtons from './MovieReviewButtons'
import MovieReviewInfo from './MovieReviewInfo'
import MovieReviewPoster from './MovieReviewPoster'
import MovieReviewRating from './MovieReviewRating'
import MovieReviewReleaseDate from './MovieReviewReleaseDate'
import MovieReviewReviewOutput from './MovieReviewReviewOutput'

export default function MovieReviewCard({
  movieData,
  reviewData,
  handleOpenModal,
  handleReview,
  showReview,
}: MovieReviewCardProps) {
  if (!movieData) {
    return null
  }
  return (
    <>
      {movieData.map((movie: MovieDataItem) => (
        <div className="mb-2" key={movie.id}>
          <div className="mx-auto flex w-full flex-row justify-between border-y-1 border-gray-600">
            <MovieReviewPoster movie={movie} />
            <div className="flex h-96 w-[60%] flex-col justify-between bg-neutral-300 p-5">
              <MovieReviewInfo movie={movie} />

              <div>
                <MovieReviewButtons
                  movie={movie}
                  reviewData={reviewData}
                  handleOpenModal={handleOpenModal}
                  handleReview={handleReview}
                />
                <div className="flex flex-row justify-between">
                  <MovieReviewRating movie={movie} />
                  <MovieReviewReleaseDate movie={movie} />
                </div>
              </div>
            </div>
          </div>
          <MovieReviewReviewOutput
            showReview={showReview}
            reviewData={reviewData}
            movie={movie}
          />
        </div>
      ))}
    </>
  )
}
