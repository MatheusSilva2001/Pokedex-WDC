import { Link, useSearchParams } from "react-router-dom";
import { PokemonCard } from "../../components/PokemonCard";
import { Container } from "./styles";
import { useQueryPokemonFiltered } from "../../hooks/useQueryPokemonFiltered";

export function SearchPage() {
  const [searcParams] = useSearchParams();
  const queryPokemonName = searcParams.get("q");


  const { data, isLoading, isError} = useQueryPokemonFiltered(queryPokemonName!); // ...query

  return (
    <Container>

      {isLoading && <span className="loading">Loading...</span>}
      {!isLoading && isError && <span className="loading">Error... +_+</span>}

      {data && <h1>{`Encontrado ${data?.length} resultado(s) para "${queryPokemonName}"`}</h1>}

      <div className="gridCards">
        {data?.map((pokemon) => {
          return (
            <Link to={`/details/${pokemon.name}`} key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
