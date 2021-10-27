using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PokemonApp.Models;
using PokemonApp.Models.DTOs;

namespace PokemonApp.Services.LocalPokemonDB
{
    public interface ILocalPokemonDBService
    {
        Task<List<PokemonFavourite>> GetPokemonsAsync();
        Task<PokemonFavourite> GetPokemonAsync(int pokemonId);
        Task<PokemonFavourite> GetPokemonAsync(string pokemonName);
        Task<PokemonFavourite> AddPokemonAsync(PokemonFavouriteDTO pokemon);
        Task DeletePokemons();
        Task DeletePokemonByNameAsync(string pokemonName);
    }
}
