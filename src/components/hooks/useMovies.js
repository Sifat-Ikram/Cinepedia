"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMovies = () => {
const {
    data: movies = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie"],
    queryFn: async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&page=${page}`);
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching movies data:", err);
    },
  });

  return [movies, refetch, isLoading, error];
};

export default useMovies;
