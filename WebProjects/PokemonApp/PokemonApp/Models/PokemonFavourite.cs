using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PokemonApp.Models
{
    public class PokemonFavourite
    {

        public PokemonFavourite()
        {

        }
        [Key]
        public int Id { get; set; }
        public virtual IEnumerable<PokemonAbility> PokemonAbilities { get; set; } = new HashSet<PokemonAbility>();
        public string Name { get; set; }
        public int Weight { get; set; }
        public string Sprite { get; set; }
        public int Height { get; set; }
        public virtual IEnumerable<PokemonStat> PokemonStats { get; set; } = new HashSet<PokemonStat>();
    }

    public class PokemonStat
    {
        [Key]
        public string Id { get; set; }
        public virtual PokemonFavourite Pokemon { get; set; }
        public int PokemonFavouriteId { get; set; }
        public string Name { get; set; }
        public int Value { get; set; }
    }

    public class PokemonAbility
    {
        [Key]
        public string Id { get; set; }
        public virtual PokemonFavourite Pokemon { get; set; }
        public int PokemonFavouriteId { get; set; }
        public string Name { get; set; }
    }
}
