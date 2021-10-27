using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PokemonApp.Services.PokeApi;

namespace PokemonApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PokemonController : ControllerBase
    {
        private readonly IPokeApiService _pokeApiService;

        public PokemonController(IPokeApiService pokeApiService)
        {
            _pokeApiService = pokeApiService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPokemons()
        {
            var data = await _pokeApiService.GetPokemonsAsync();

            if (data == null)
            {
                return NoContent();
            }

            return Ok(data);
        }

        [HttpGet("{pokemonName}")]
        public async Task<IActionResult> GetPokemonDetails(string pokemonName)
        {
            var data = await _pokeApiService.GetPokemonDetailsDTOAsync(pokemonName);

            if(data == null)
            {
                return NoContent();
            }

            return Ok(data);
        }


    }
}
