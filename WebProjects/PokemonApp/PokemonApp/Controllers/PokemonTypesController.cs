using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PokemonApp.Services.PokeApi;

namespace PokemonApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PokemonTypesController : ControllerBase
    {
        private readonly IPokeApiService _pokeApiService;

        public PokemonTypesController(IPokeApiService pokeApiService)
        {
            _pokeApiService = pokeApiService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPokemonTypes()
        {
            var data = await _pokeApiService.GetPokemonTypesDTOAsync();

            return data != null ? Ok(data) : NotFound();
        }

        [HttpGet("{pokemonTypeName}")]
        public async Task<IActionResult> GetPokemonTypeDetails(string pokemonTypeName)
        {
            var data = await _pokeApiService.GetPokemonTypeDetailsDTOAsync(pokemonTypeName);

            return data != null ? Ok(data) : NotFound();
        }

    }
}
