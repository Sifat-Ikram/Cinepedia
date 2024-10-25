"use client";
import Image from "next/image";
import useWatchlistStore from "../../store/useWatchlistStore";
import Link from "next/link";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlistStore();

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">My Watchlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchlist.length === 0 ? (
          <p className="text-lg text-center text-gray-500">
            No movies in your watchlist.
          </p>
        ) : (
          watchlist.map((movie) => (
            <div
              key={movie.id}
              className="border rounded-lg group shadow-lg overflow-hidden bg-white"
            >
              <Link href={`/movies/${movie.id}`}>
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    height={300} 
                    width={200}
                    className="w-full h-auto object-cover transition-transform transform ease-in-out  duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-48 w-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
              </Link>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {movie.title}
                </h3>
                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="mt-3 w-full p-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
                >
                  Remove from Watchlist
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;
