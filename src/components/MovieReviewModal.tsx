import type { FormDataState, MovieDataItem } from '../util/movieReview'
import Modal from './Modal'
import MovieReviewModalContent from './MovieReviewModalContent'

export interface MovieReviewModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  modalData: MovieDataItem
  formData: FormDataState
  submitReview: (e: React.FormEvent) => void
  handleForm: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
}

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
