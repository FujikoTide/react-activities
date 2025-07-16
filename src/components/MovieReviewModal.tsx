import type { MovieReviewModalProps } from '../util/movieReview'
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
  return (
    <>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <MovieReviewModalContent
            modalData={modalData}
            formData={formData}
            submitReview={submitReview}
            handleForm={handleForm}
          />
        </Modal>
      )}
    </>
  )
}
