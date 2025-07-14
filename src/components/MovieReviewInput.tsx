export interface MovieReviewInputProps {
  getMovieData: (e: React.FormEvent) => Promise<void>
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchTerm: string
}

export default function MovieReviewInput({
  getMovieData,
  handleSearch,
  searchTerm,
}: MovieReviewInputProps) {
  return (
    <div className="bg-neutral-300 p-10 text-2xl font-bold">
      <form onSubmit={getMovieData}>
        <div className="flex flex-row justify-center">
          <div>
            <input
              name="searchTerm"
              id="searchTerm"
              value={searchTerm}
              type="text"
              onChange={handleSearch}
              className="mr-2 h-10 border-2 border-black bg-white p-2 outline-0"
            />
          </div>
          <div>
            <button
              type="submit"
              id="search"
              name="search"
              className="flex h-10 cursor-pointer items-center border-2 border-black bg-white p-2 hover:bg-green-700 hover:text-white"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
