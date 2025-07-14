import { useEffect, useState } from 'react'
import { type MovieDataItem, type ReviewDataState } from '../util/movieReview'
import Modal from './Modal'

export interface MovieDataState {
  data: MovieDataItem[] | null
}

interface MovieReviewMainProps {
  movieData: MovieDataState
  reviewData: ReviewDataState[]
  setReviewData: React.Dispatch<React.SetStateAction<ReviewDataState[]>>
}

interface FormDataState {
  movieId: number
  review: string
  rating: number
}

export default function MovieReviewMain({
  movieData,
  reviewData,
  setReviewData,
}: MovieReviewMainProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<MovieDataItem | null>(null)
  const [formData, setFormData] = useState<FormDataState>({
    movieId: 0,
    review: '',
    rating: 0,
  })

  const handleOpenModal = (data: MovieDataItem) => {
    setIsModalOpen(true)
    setModalData(data)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  useEffect(() => {
    if (modalData?.id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        movieId: modalData.id,
      }))
    }
  }, [modalData])

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault()
    setReviewData((prevReviewData) => [
      ...prevReviewData,
      {
        reviewId: 1,
        movieId: formData.movieId,
        movieReview: formData.review,
        movieRating: formData.rating,
      },
    ])
    setFormData({
      movieId: 0,
      review: '',
      rating: 0,
    })
    handleCloseModal()
  }

  console.log(reviewData)

  return (
    <>
      <div>
        {movieData.data &&
          movieData.data.map((movie: MovieDataItem) => (
            <div
              key={movie.id}
              className="mx-auto mb-2 flex w-full flex-row justify-between border-y-1 border-gray-600"
            >
              <div className="flex h-96 w-[40%] justify-center bg-black p-5">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-2xl"
                  />
                ) : (
                  <span className="text-xl text-stone-500">No Poster</span>
                )}
              </div>
              <div className="flex h-96 w-[60%] flex-col justify-between bg-neutral-300 p-5">
                <div className="flex flex-col">
                  <div className="pb-2 text-left text-xl font-bold underline">
                    {movie.title}
                  </div>
                  <div className="line-clamp-6 text-justify">
                    {movie.overview}
                  </div>
                </div>

                <div>
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
                    >
                      Show Reviews
                    </button>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex">{movie.vote_average}</div>
                    <div className="flex">{movie.release_date}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <div
              key={modalData?.id}
              className="mx-auto mb-2 flex w-full flex-row justify-between border-y-1 border-gray-600"
            >
              <div className="flex w-[40%] justify-center bg-black p-5">
                {modalData?.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w1280/${modalData?.poster_path}`}
                    alt={modalData?.title}
                    className="rounded-2xl"
                  />
                ) : (
                  <span className="text-xl text-stone-500">No Poster</span>
                )}
              </div>
              <div className="flex w-[60%] flex-col justify-between bg-neutral-300 p-5">
                <div className="flex flex-col">
                  <div className="pb-2 text-left text-xl font-bold underline">
                    {modalData?.title}
                  </div>
                  <form onSubmit={submitReview}>
                    <input
                      type="hidden"
                      name="movieId"
                      id="movieId"
                      value={formData.movieId}
                    />
                    <div className="justify-between">
                      <div>
                        <div className="flex flex-col">
                          <label htmlFor="" className="flex">
                            Review
                          </label>
                          <textarea
                            className="flex border-2 border-black bg-white p-2 outline-0"
                            rows={4}
                            value={formData.review}
                            name="review"
                            id="review"
                            onChange={handleForm}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="" className="flex">
                            Rating
                          </label>
                          <input
                            type="number"
                            className="flex border-2 border-black bg-white p-2 outline-0"
                            min={0}
                            max={10}
                            value={formData.rating}
                            name="rating"
                            id="rating"
                            onChange={handleForm}
                          />
                        </div>
                      </div>
                      <div>
                        <div>
                          <button
                            type="submit"
                            className="my-1 h-10 w-full cursor-pointer items-center border-2 border-black bg-white p-2 hover:bg-green-700 hover:text-white"
                          >
                            Submit Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  )
}
