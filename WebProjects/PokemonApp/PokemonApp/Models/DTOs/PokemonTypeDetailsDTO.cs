using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace PokemonApp.Models.DTOs
{
    // Root myDeserializedClass = JsonSerializer.Deserialize<Root>(myJsonResponse);
    public class DoubleDamageFrom
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }
    }

    public class HalfDamageTo
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }
    }

    public class NoDamageFrom
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }
    }

    public class NoDamageTo
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }
    }

    public class DamageRelations
    {
        [JsonPropertyName("double_damage_from")]
        public List<DoubleDamageFrom> DoubleDamageFrom { get; set; }

        [JsonPropertyName("double_damage_to")]
        public List<object> DoubleDamageTo { get; set; }

        [JsonPropertyName("half_damage_from")]
        public List<object> HalfDamageFrom { get; set; }

        [JsonPropertyName("half_damage_to")]
        public List<HalfDamageTo> HalfDamageTo { get; set; }

        [JsonPropertyName("no_damage_from")]
        public List<NoDamageFrom> NoDamageFrom { get; set; }

        [JsonPropertyName("no_damage_to")]
        public List<NoDamageTo> NoDamageTo { get; set; }
    }

    public class Generation
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }
    }

    public class GameIndice
    {
        [JsonPropertyName("game_index")]
        public int GameIndex { get; set; }

        [JsonPropertyName("generation")]
        public Generation Generation { get; set; }
    }

    public class MoveDamageClass
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }
    }

    public class Move
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }
    }

    public class Language
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }
    }

    public class Name
    {
        [JsonPropertyName("language")]
        public Language Language { get; set; }

        [JsonPropertyName("name")]
        public string LanguageName { get; set; }
    }

    public class PokemonNameAndUrl
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("url")]
        public string Url { get; set; }
    }

    public class PokemonTypeDetailsPokemon
    {
        //[JsonPropertyName("name")]
        //public string Name { get; set; }

        //[JsonPropertyName("url")]
        //public string Url { get; set; }

        [JsonPropertyName("pokemon")]
        public PokemonNameAndUrl Pokemon { get; set; }

        [JsonPropertyName("slot")]
        public int Slot { get; set; }
    }

    public class PokemonTypeDetailsDTO
    {
        [JsonPropertyName("damage_relations")]
        public DamageRelations DamageRelations { get; set; }

        [JsonPropertyName("game_indices")]
        public List<GameIndice> GameIndices { get; set; }

        [JsonPropertyName("generation")]
        public Generation Generation { get; set; }

        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("move_damage_class")]
        public MoveDamageClass MoveDamageClass { get; set; }

        [JsonPropertyName("moves")]
        public List<Move> Moves { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("names")]
        public List<Name> Names { get; set; }

        [JsonPropertyName("pokemon")]
        public List<PokemonTypeDetailsPokemon> Pokemon { get; set; }
    }


}
