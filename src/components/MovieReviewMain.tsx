import { useState } from 'react'
import { type MovieDataItem } from '../util/movieReview'
import Popover from './Popover'

export interface MovieDataState {
  data: MovieDataItem[] | null
}

interface ClickCoordinates {
  x: number
  y: number
}

export default function MovieReviewMain(movieData: MovieDataState) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [popoverCoords, setPopoverCoords] = useState<ClickCoordinates | null>(
    null,
  )
  const [popoverData, setPopoverData] = useState<number | null>(null)

  const handleClickToOpenPopover = (e: React.MouseEvent, MovieId: number) => {
    setPopoverCoords({ x: e.clientX, y: e.clientY })
    setPopoverData(MovieId)
    setIsPopoverOpen(true)
  }

  const handleClosePopover = () => {
    setIsPopoverOpen(false)
    setPopoverCoords(null)
    setPopoverData(null)
  }

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
                      className="flex h-10 w-full cursor-pointer items-center justify-center border-2 border-black bg-white p-2 hover:bg-green-700 hover:text-white"
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
        {isPopoverOpen && popoverCoords && popoverData && (
          <Popover
            onClose={handleClosePopover}
            x={popoverCoords.x}
            y={popoverCoords.y}
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-col rounded-sm border-1 border-black shadow-xs shadow-stone-600">
                hello !!!!
              </div>
            </div>
          </Popover>
        )}
      </div>
    </>
  )
}
