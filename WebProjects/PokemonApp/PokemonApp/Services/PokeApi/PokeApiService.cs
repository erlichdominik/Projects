using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Json;
using PokemonApp.Models;
using PokemonApp.Models.DTOs;
using PokemonApp.Data;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using PokemonApp.Models.DTOs.PokemonApp.Models.DTOs;

namespace PokemonApp.Services.PokeApi
{
    public class PokeApiService : IPokeApiService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private ApplicationDbContext _context;

        public PokeApiService(IHttpClientFactory httpClientFactory, ApplicationDbContext context)
        {
            _httpClientFactory = httpClientFactory;
            _context = context;
        }

        public async Task<PokemonDetailsDTO> GetPokemonDetailsDTOAsync(string pokemonName)
        {
            var client = _httpClientFactory.CreateClient();

            var callUri = $"https://pokeapi.co/api/v2/pokemon/{pokemonName}/";

            var pokemonDetails = await client.GetFromJsonAsync<PokemonDetails>(callUri);

            var pokemonImg = $"https://assets.pokemon.com/assets/cms2/img/pokedex/full/{pokemonDetails.Id:D3}.png";

            var pokemonDetailsDTO = PokemonDetailsDTO.TransformIntoPokemonDetailsDTO(pokemonDetails);

            pokemonDetailsDTO.Sprite = pokemonImg;

            return pokemonDetailsDTO;
        }


        public async Task<Pokemon> GetPokemonsAsync()
        {
            var uri = "https://pokeapi.co/api/v2/pokemon?limit=898";
            var data = await GetPokeApiDataAsync<Pokemon>(uri);
            return data;
        }

        public async Task<T> GetPokeApiDataAsync<T>(string uri)
        {
            var client = _httpClientFactory.CreateClient();

            T fetchedData = await client.GetFromJsonAsync<T>(uri);

            return fetchedData;
        }

        public async Task<PokemonTypesDTO> GetPokemonTypesDTOAsync()
        {
            var uri = "https://pokeapi.co/api/v2/type";
            var data = await GetPokeApiDataAsync<PokemonTypesDTO>(uri);
            return data;
        }

        public async Task<PokemonTypeDetailsDTO> GetPokemonTypeDetailsDTOAsync(string pokemonTypeName)
        {
            var uri = $"https://pokeapi.co/api/v2/type/{pokemonTypeName}";
            var data = await GetPokeApiDataAsync<PokemonTypeDetailsDTO>(uri);
            return data;
        }
    }
}
