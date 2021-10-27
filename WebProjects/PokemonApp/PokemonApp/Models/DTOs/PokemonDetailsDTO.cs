using System;
using System.Collections.Generic;
using System.Linq;

namespace PokemonApp.Models.DTOs
{
    public class StatsDTO
    {
        public StatsDTO(string name, int value)
        {
            Name = name;
            Value = value;
        }

        public string Name { get; set; }
        public int Value { get; set; }
    }

    public class TypesDetailsDTO
    {
        public string Name { get; set; }
        public string Url { get; set; }

        public TypesDetailsDTO(string name, string url)
        {
            Name = name;
            Url = url;
        }
    }

    public class TypesDTO
    {
        public int Slot { get; set; }
        public TypesDetailsDTO Type { get; set; }
        public TypesDTO(int slot, TypesDetailsDTO type)
        {
            Slot = slot;
            Type = type;
        }
    }

    public class PokemonDetailsDTO
    {
        public int Id { get; set; }
        public List<string> Abilities { get; set; }
        public string Name { get; set; }
        public int Weight { get; set; }
        public string Sprite { get; set; }
        public int Height { get; set; }
        public List<StatsDTO> Stats { get; set; }
        public List<TypesDTO> Types { get; set; }


        public static PokemonDetailsDTO TransformIntoPokemonDetailsDTO(PokemonDetails pokemonDetails)
        {
            List<StatsDTO> _stats = new();
            
            var _extractedBaseStats = pokemonDetails.Stats.Select(p => p.BaseStat).ToList();
            var _extractedNameStats = pokemonDetails.Stats.Select(p => p.Stat).Select(s => s.Name).ToList();
            for (int i = 0; i < _extractedBaseStats.Count; i++)
            {
                var newStat = new StatsDTO(_extractedNameStats[i], _extractedBaseStats[i]);
                _stats.Add(newStat);
            }

            PokemonDetailsDTO pokemonDTO = new PokemonDetailsDTO
            {
                Id = (int)pokemonDetails.Id,
                Abilities = pokemonDetails.Abilities.Select(a => a.Ability).Select(a => a.Name).ToList(),
                Name = pokemonDetails.Name,
                Weight = pokemonDetails.Weight,
                Height = pokemonDetails.Height,
                Stats = _stats,
                Sprite = pokemonDetails.Sprites.FrontDefault,
                Types = pokemonDetails.Types.Select(t => new TypesDTO
                (
                   t.Slot,
                   new TypesDetailsDTO(t._Type.Name, t._Type.Url)
                )).ToList()
            };

            return pokemonDTO;
        }
    }
}
