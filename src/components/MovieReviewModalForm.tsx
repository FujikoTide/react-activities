import type { MovieReviewModalContentType } from '../util/movieReview'

export default function MovieReviewModalForm({
  modalData,
  formData,
  submitReview,
  handleForm,
}: MovieReviewModalContentType) {
  return (
    <div className="flex w-[60%] flex-col justify-between bg-neutral-300 p-5">
      <div className="flex flex-col">
        <div className="pb-2 text-left text-xl font-bold underline">
          {modalData.title}
        </div>
        <form onSubmit={submitReview}>
          <input
            type="hidden"
            name="movieId"
            id="movieId"
            value={formData.movieId}
          />
          <div className="justify-between">
            <div className="flex flex-col">
              <label htmlFor="" className="flex">
                Review
              </label>
              <textarea
                className="flex border-2 border-black bg-white p-2 outline-0"
                rows={4}
                value={formData.movieReview}
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
                value={formData.movieRating}
                name="rating"
                id="rating"
                onChange={handleForm}
              />
            </div>

            <div>
              <button
                type="submit"
                className="my-1 h-10 w-full cursor-pointer items-center border-2 border-black bg-white p-2 hover:bg-green-700 hover:text-white"
              >
                Submit Review
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
