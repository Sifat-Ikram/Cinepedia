"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const endpoint = query
        ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}&page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`;

      const res = await axios.get(endpoint);
      if (page === 1) setMovies(res.data.results);
      else setMovies((prevMovies) => [...prevMovies, ...res.data.results]);
      setTotalPages(res.data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, query]);

  const handleSearch = (data) => {
    setQuery(data.search);
    reset();
    setPage(1);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage);
    }
  };

  return (
    <div className="container w-11/12 mx-auto">
      <form
        onSubmit={handleSubmit(handleSearch)}
        className="my-10 flex justify-center items-center"
      >
        <input
          type="text"
          placeholder="Search for a movie..."
          {...register("search")}
          className="p-[5px] sm:p-2 md:p-3 border border-gray-400 rounded-md sm:w-[300px] md:w-[400px] lg:w-[600px]"
        />
        <button
          type="submit"
          className="p-2 sm:py-2 md:py-3 sm:px-5 md:px-10 text-sm sm:text-base md:text-lg bg-[#04734C] text-white rounded-md"
        >
          Search
        </button>
      </form>
      <h1 className="text-4xl font-bold mb-4">Popular Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <Link
            href={`/movieDetails/${movie.id}`}
            key={index}
            className="border-2 border-solid rounded-md flex flex-col space-y-10 pb-5 items-center"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto"
              height={100}
              width={100}
              priority
            />
            <h2 className="text-2xl font-bold">{movie.title}</h2>
          </Link>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      <div className="flex justify-center">
        {page < totalPages && (
          <button
            onClick={handleLoadMore}
            className="my-5 p-2 px-10 text-lg bg-[#04734C] text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
