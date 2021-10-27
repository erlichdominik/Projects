using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PokemonApp.Models;
using PokemonApp.Models.DTOs;
using PokemonApp.Services.LocalPokemonDB;
using PokemonApp.Services.PokeApi;

namespace PokemonApp.Controllers
{
    [ApiController]
    [Route("api/localpokemons")]
    public class LocalPokemonController : ControllerBase
    {

        private readonly ILocalPokemonDBService _dbService;

        public LocalPokemonController(ILocalPokemonDBService dbService)
        {
            _dbService = dbService;
        }

        [HttpGet]
        public async Task<IActionResult> GetLocalPokemons()
        {
            var data = await _dbService.GetPokemonsAsync();

            return data != null ? Ok(data) : NotFound();

        }

        //[HttpGet("{pokemonId}")]
        //public async Task<IActionResult> GetLocalPokemon(int pokemonId)
        //{
        //    var data = await _dbService.GetPokemonAsync(pokemonId);

        //    return data != null ? Ok(data) : NotFound();
        //}

        [HttpGet("{pokemonName}")]
        public async Task<IActionResult> GetLocalPokemon(string pokemonName)
        {
            var pokemon = await _dbService.GetPokemonAsync(pokemonName);

            return pokemon != null ? Ok(pokemon) : NotFound();
        }

        [HttpPut]
        public async Task<IActionResult> AddLocalPokemon([FromBody] PokemonFavouriteDTO pokemon)
        {
            await _dbService.AddPokemonAsync(pokemon);

            return Ok();
       
        }

        [HttpDelete]
        public async Task<IActionResult> DeletePokemons()
        {
            await _dbService.DeletePokemons();

            return Ok();
        }

        [HttpDelete("{pokemonName}")]
        public async Task<IActionResult> DeletePokemonByName(string pokemonName)
        {
            await _dbService.DeletePokemonByNameAsync(pokemonName);
            return Ok();
        }
    }
}
