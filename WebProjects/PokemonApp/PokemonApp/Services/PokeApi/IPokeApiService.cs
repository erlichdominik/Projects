using System.Collections.Generic;
using System.Threading.Tasks;
using PokemonApp.Models;
using PokemonApp.Models.DTOs;
using PokemonApp.Models.DTOs.PokemonApp.Models.DTOs;

namespace PokemonApp.Services.PokeApi
{
    public interface IPokeApiService
    {
        Task<Pokemon> GetPokemonsAsync();
        Task<PokemonDetailsDTO> GetPokemonDetailsDTOAsync(string pokemonName);
        Task<PokemonTypesDTO> GetPokemonTypesDTOAsync();
        Task<PokemonTypeDetailsDTO> GetPokemonTypeDetailsDTOAsync(string pokemonTypeName);
    }
}
