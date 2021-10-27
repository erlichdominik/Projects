using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PokemonApp.Data;
using PokemonApp.Models;
using PokemonApp.Models.DTOs;

namespace PokemonApp.Services.LocalPokemonDB
{
    public class LocalPokemonDBService : ILocalPokemonDBService
    {
        private ApplicationDbContext _context;

        public LocalPokemonDBService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PokemonFavourite> AddPokemonAsync(PokemonFavouriteDTO pokemon)
        {
            var pokemonAbilities = new List<PokemonAbility>();
            var pokemonStats = new List<PokemonStat>();
            var pokemonTransformed = new PokemonFavourite
            {
                Id = pokemon.Id,
                Name = pokemon.Name,
                Weight = pokemon.Weight,
                Height = pokemon.Height
            };
            // change to better picutre
            //pokemonTransformed.Sprite = pokemon.Sprite;
            var pokemonImg = $"https://assets.pokemon.com/assets/cms2/img/pokedex/full/{pokemon.Id:D3}.png";
            pokemonTransformed.Sprite = pokemonImg;
            pokemonAbilities = pokemon.Abilities.Select(ability => new PokemonAbility
            {
                Id = Guid.NewGuid().ToString(),
                PokemonFavouriteId = pokemonTransformed.Id,
                Name = ability
            }).ToList();

            pokemonStats = pokemon.Stats.Select(stat => new PokemonStat
            {
                Id = Guid.NewGuid().ToString(),
                PokemonFavouriteId = pokemonTransformed.Id,
                Name = stat.Name,
                Value = stat.Value
            }).ToList();

            pokemonTransformed.PokemonStats = pokemonStats;
            pokemonTransformed.PokemonAbilities = pokemonAbilities;


            await _context.PokemonFavourites.AddAsync(pokemonTransformed);
            await _context.SaveChangesAsync();

            return pokemonTransformed;
        }

        public async Task<PokemonFavourite> GetPokemonAsync(int pokemonId)
        {
            var findPokemon = await _context.PokemonFavourites.FirstOrDefaultAsync(p => p.Id == pokemonId);

            if (findPokemon == null)
            {
                return null;
            }

            return findPokemon;
        }

        public async Task<List<PokemonFavourite>> GetPokemonsAsync()
        {
            return await _context.PokemonFavourites.OrderBy(p => p.Id).Include(p => p.PokemonAbilities).Include(p => p.PokemonStats).ToListAsync();
        }

        public async Task DeletePokemons()
        {
            var allPokemons = await _context.PokemonFavourites.Select(p => p).ToListAsync();
            foreach (PokemonFavourite pokemon in allPokemons)
            {
                _context.Remove(pokemon);
            }

            await _context.SaveChangesAsync();
        }

        public async Task<PokemonFavourite> GetPokemonAsync(string pokemonName)
        {
            var pokemon = await _context.PokemonFavourites.
                Include(p => p.PokemonAbilities).
                Include(p => p.PokemonStats).
                FirstOrDefaultAsync(p => p.Name == pokemonName);
            
            return pokemon ?? null;
        }

        public async Task DeletePokemonByNameAsync(string pokemonName)
        {
            var pokemon = await _context.PokemonFavourites.FirstOrDefaultAsync(pokemon => pokemon.Name == pokemonName);
            if (pokemon == null)
            {
                return;
            }
            _context.Remove(pokemon);
            await _context.SaveChangesAsync();
        }
    }
}
