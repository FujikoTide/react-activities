import type { MovieReviewModalProps } from './MovieReviewModal'
import MovieReviewModalForm from './MovieReviewModalForm'
import MovieReviewPoster from './MovieReviewPoster'

type MovieReviewModalContentType = Omit<
  MovieReviewModalProps,
  'isModalOpen' | 'handleCloseModal'
>

export default function MovieReviewModalContent({
  modalData,
  formData,
  submitReview,
  handleForm,
}: MovieReviewModalContentType) {
  return (
    <div
      key={modalData.id}
      className="mx-auto mb-2 flex w-full flex-row justify-between border-y-1 border-gray-600"
    >
      <MovieReviewPoster movie={modalData} />
      <MovieReviewModalForm
        modalData={modalData}
        formData={formData}
        submitReview={submitReview}
        handleForm={handleForm}
      />
    </div>
  )
}
