using System;
namespace PokemonApp.Models.DTOs
{
    using System;
    using System.Collections.Generic;
    using System.Text.Json.Serialization;

    namespace PokemonApp.Models.DTOs
    {
        // PokemonTypesDTO myDeserializedClass = JsonSerializer.Deserialize<PokemonTypesDTO>(myJsonResponse);
        public class Result
        {
            [JsonPropertyName("name")]
            public string Name { get; set; }

            [JsonPropertyName("url")]
            public string Url { get; set; }
        }
        
        public class PokemonTypesDTO
        {
            [JsonPropertyName("count")]
            public int Count { get; set; }

            [JsonPropertyName("next")]
            public object Next { get; set; }

            [JsonPropertyName("previous")]
            public object Previous { get; set; }

            [JsonPropertyName("results")]
            public List<Result> Results { get; set; }
        }


    }

}
