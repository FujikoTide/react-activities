import type { MovieReviewModalProps } from '../types/movieReview'
import Modal from './Modal'
import MovieReviewModalContent from './MovieReviewModalContent'

export default function MovieReviewModal({
  isModalOpen,
  handleCloseModal,
  modalData,
  formData,
  submitReview,
  handleForm,
}: MovieReviewModalProps) {
  if (!isModalOpen) {
    return null
  }
  return (
    <Modal onClose={handleCloseModal}>
      <MovieReviewModalContent
        modalData={modalData}
        formData={formData}
        submitReview={submitReview}
        handleForm={handleForm}
      />
    </Modal>
  )
}
