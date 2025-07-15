import { useEffect, useState } from 'react'
import {
  type FormDataState,
  type MovieDataItem,
  type MovieDataState,
  type ReviewDataState,
  type ReviewState,
} from '../util/movieReview'
import useId from '../hooks/useId'
import MovieReviewModal from './MovieReviewModal'
import MovieReviewCard from './MovieReviewCard'

interface MovieReviewMainProps {
  movieData: MovieDataState
  reviewData: ReviewDataState[]
  setReviewData: React.Dispatch<React.SetStateAction<ReviewDataState[]>>
}

export default function MovieReviewMain({
  movieData,
  reviewData,
  setReviewData,
}: MovieReviewMainProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showReview, setShowReview] = useState<ReviewState>({
    id: 0,
    show: false,
  })
  const [modalData, setModalData] = useState<MovieDataItem>({
    backdrop_path: 'string',
    genre_ids: [],
    id: 0,
    original_title: 'string',
    overview: 'string',
    poster_path: 'string',
    release_date: 'string',
    title: '',
    vote_average: 0,
    vote_count: 0,
  })
  const { id, setId, incrementID } = useId(0)
  const [formData, setFormData] = useState<FormDataState>({
    movieId: 0,
    review: '',
    rating: 0,
  })

  useEffect(() => {
    if (id === 0 && reviewData.length > 0) {
      const maxId = reviewData.reduce(
        (acc, review) => (review.reviewId > acc ? review.reviewId : acc),
        0,
      )
      setId(maxId + 1)
    }
  }, [reviewData, id, setId])

  useEffect(() => {
    if (modalData.id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        movieId: modalData.id,
      }))
    }
  }, [modalData])

  const handleOpenModal = (data: MovieDataItem) => {
    setIsModalOpen(true)
    setModalData(data)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleReview = (movie: MovieDataItem) => {
    if (movie.id === showReview.id) {
      setShowReview((prevReviewData) => ({
        ...prevReviewData,
        show: !showReview.show,
      }))
    } else {
      setShowReview((prevReviewData) => ({
        ...prevReviewData,
        id: movie.id,
        show: true,
      }))
    }
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

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault()
    setReviewData((prevReviewData) => [
      ...prevReviewData,
      {
        reviewId: id,
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
    incrementID()
    handleCloseModal()
  }

  return (
    <div>
      <MovieReviewCard
        movieData={movieData}
        reviewData={reviewData}
        handleOpenModal={handleOpenModal}
        handleReview={handleReview}
        showReview={showReview}
      />
      <MovieReviewModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        modalData={modalData}
        formData={formData}
        submitReview={submitReview}
        handleForm={handleForm}
      />
    </div>
  )
}
