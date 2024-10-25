"use client"; // This is now a client-side component

import useWatchlistStore from "@/store/useWatchlistStore";

const MovieDetailsClient = ({ movie, movieId }) => {
  const { addToWatchlist, removeFromWatchlist, watchlist } =
    useWatchlistStore();

  const isMovieInWatchlist = watchlist.some(
    (watchlistMovie) => watchlistMovie.id === Number(movieId)
  );

  return (
    <div className="flex justify-end">
      <button
        onClick={() => {
          if (isMovieInWatchlist) {
            removeFromWatchlist(Number(movieId));
          } else {
            addToWatchlist({
              id: Number(movieId),
              title: movie.title,
              poster_path: movie.poster_path
            });
          }
        }}
        className="p-2 sm:py-2 md:py-3 sm:px-5 md:px-10 lg:px-20 text-sm sm:text-base md:text-lg lg:text-3xl bg-[#04734C] hover:bg-[#124936] text-white rounded-md"
      >
        {isMovieInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
};

export default MovieDetailsClient;
