import type { SearchTypeMapProps } from '../util/movieReview'

export interface MovieReviewInputProps {
  getMovieData: (e: React.FormEvent) => Promise<void>
  getMovieDataByList: (
    type: Exclude<keyof SearchTypeMapProps, 'search'>,
  ) => Promise<void>
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchTerm: string
}

export default function MovieReviewInput({
  getMovieData,
  getMovieDataByList,
  handleSearch,
  searchTerm,
}: MovieReviewInputProps) {
  return (
    <div className="bg-neutral-300 p-10 text-2xl font-bold">
      <div className="mb-2 flex flex-row justify-evenly text-lg">
        <button
          type="button"
          className="cursor-pointer hover:text-orange-500"
          onClick={() => getMovieDataByList('popular')}
        >
          Popular
        </button>
        <button
          type="button"
          className="cursor-pointer hover:text-orange-500"
          onClick={() => getMovieDataByList('upcoming')}
        >
          Upcoming
        </button>
        <button
          type="button"
          className="cursor-pointer hover:text-orange-500"
          onClick={() => getMovieDataByList('top rated')}
        >
          Top Rated
        </button>
      </div>
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
              placeholder="Search Movies..."
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
