

export function filterPokemon(pokemon, filterName, filterSource, filterType) {
    
    const filteredPokemon = pokemon.filter((p) => {
        const nameMatch = filterName === "" || p.nombre.toLowerCase() === filterName.toLowerCase();
        const sourceMatch =
          filterSource === "" ||
          (filterSource === "api" && typeof p.id === "number") ||
          (filterSource === "database" && typeof p.id === "string");

        const typeMatch = filterType === "" || filterType === "all"|| p.tipo.includes(filterType);
        return nameMatch && sourceMatch && typeMatch;
      });
    return filteredPokemon;
  }
  
  export function sortPokemon(pokemon, sortOrder, filterAttack) {
    // Sorting logic here
    const sortedPokemon = [...pokemon].sort((a, b) => {
        if (sortOrder === "ascendente") {
          return a.nombre.localeCompare(b.nombre);
        } else if (sortOrder === "descendente") {
          return b.nombre.localeCompare(a.nombre);
        }
        return 0; // Default case, no sorting
      });

      const sortedPokemonByAttack = [...sortedPokemon].sort((a, b) => {
        if (filterAttack === "ascendente") {
          return a.ataque - b.ataque;
        } else if (filterAttack === "descendente") {
          return b.ataque - a.ataque;
        } else {
          return 0;
        }
      });

      const sortedPokemonCombined = [...sortedPokemonByAttack].sort((a, b) => {
        if (sortOrder === "ascendente") {
          if (a.nombre === b.nombre) {
            return a.ataque - b.ataque;
          }
        } else if (sortOrder === "descendente") {
          if (a.nombre === b.nombre) {
            return b.ataque - a.ataque;
          }
        }
        return 0;
      });
    return sortedPokemonCombined;
  }
  
  
