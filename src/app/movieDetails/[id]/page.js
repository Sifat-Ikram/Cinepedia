import useWatchlistStore from "@/store/useWatchlistStore";
import axios from "axios";
import Image from "next/image";

export async function generateStaticParams() {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const movies = res.data.results;

  // Generate static params based on popular movies
  return movies.map((movie) => ({
    id: movie.id.toString(), // Ensure id is a string
  }));
}

export async function getMovieData(id) {
  const movieRes = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  return movieRes.data;
}

const MovieDetails = async ({ params }) => {
  const { id } = await params;
  const { addToWatchlist, removeFromWatchlist, watchlist } =
    useWatchlistStore();

  const isMovieInWatchlist = watchlist.some((movie) => movie.id === Number(id));

  const movie = await getMovieData(id);

  return (
    <div className="container w-11/12 mx-auto my-20">
      <div className="flex flex-col space-y-10">
        <div className="mb-6 md:mb-0 flex justify-center">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={550}
            priority
            className="w-[500px] h-[550px] rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-4">
            {movie.overview}
          </p>
          <p className="mt-2">
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className="mt-2">
            <strong>Rating:</strong> {movie.vote_average} / 10
          </p>
          <p className="mt-2">
            <strong>Genres:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (isMovieInWatchlist) {
                removeFromWatchlist(Number(id));
              } else {
                addToWatchlist({ id: Number(id), title: "Movie Title" }); // Add actual movie details
              }
            }}
            className="p-2 sm:py-2 md:py-3 sm:px-5 md:px-10 lg:px-20 text-sm sm:text-base md:text-lg lg:text-3xl bg-[#04734C] hover:bg-[#124936] text-white rounded-md"
          >
            {isMovieInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
