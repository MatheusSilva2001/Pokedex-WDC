import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { API } from "../configs/api";
import { Pokemon } from "../@types/pokemon";
import { useNavigate, useSearchParams } from "react-router-dom";

export function useQueryPokemonPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [totalPage, setTotalPage] = useState(0);

  // function handleNextPage() {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  //   nextPage();
  // }

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  async function getPokemonPage({ page = 1, limit = 30 }) {
    if (page <= 0) page = 1;
    const offset = (page - 1) * limit; // 3
    const { data } = await API.get(`/pokemon?limit=${limit}&offset=${offset}`);

    const pokemonPromise = data.results.map(
      async (pokemon: { url: string }) => {
        const response = await fetch(pokemon.url);
        return response.json().then((data) => data as Pokemon);
      }
    );

    const pokemonData = await Promise.all(pokemonPromise);

    const totalPokemon = data.count;
    const totalPagesAPI = Math.ceil(totalPokemon / limit);
    setTotalPage(totalPagesAPI);

    return pokemonData as Pokemon[];
  }

  function nextPage() {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
      navigate(`?page=${page + 1}`);
      // handleNextPage;
    }
  }

  function prevPage() {
    if (page > 1) {
      setPage((prev) => prev - 1);
      navigate(`?page=${page - 1}`);
    }
  }

  console.log(searchParams);

  useEffect(() => {
    const pageQuery = Number(searchParams.get("page"));
    setPage(pageQuery || 1);

    if (totalPage > 0) {
      if (pageQuery > totalPage) {
        navigate(`?page=${totalPage - 1}`);
        setPage(totalPage);
        return;
      }

      if (pageQuery < 1) {
        navigate(`?page=1`);
        setPage(1);
        return;
      }
    }
  }, [searchParams, navigate, totalPage]);

  const query = useQuery({
    queryKey: [`getPokemonPage`, page, limit],
    queryFn: () => getPokemonPage({ page, limit }),
  });

  return {
    ...query,
    page,
    nextPage,
    prevPage,
    setLimit,
    totalPage,
  };
}
