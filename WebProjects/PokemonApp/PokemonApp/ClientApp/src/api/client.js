import authService from '../components/api-authorization/AuthorizeService'
import { fetchLocalPokemons } from '../features/pokemons/pokemonsSlice';

export const getPokemonsAsync = async () => {
    const token = await authService.getAccessToken();
    const response = await fetch('api/pokemon', {
        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    return data.results;
}

export const getPokemonByNameAsync = async (pokemonName) => {
    const token = await authService.getAccessToken();

    const response = await fetch(`api/pokemon/${pokemonName}`, {
        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    // console.log(response)
    const data = await response.json();

    return data;
}

export const getLocalPokemonsAsync = async () => {
    const token = await authService.getAccessToken();
    const response = await fetch('api/localpokemons', {
        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    // console.log(data)
    return data
}

export const getLocalPokemonAsync = async (pokemonId) => {
    const token = await authService.getAccessToken();

    const response = await fetch(`api/localpokemons/${pokemonId}`, {
        headers: !token ? {} : {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    // console.log(data);

    return data;
}

export const deleteLocalPokemonAsync = async (pokemonName) => {
    const token = await authService.getAccessToken();

    const response = await fetch(`api/localpokemon/${pokemonName}`, {
        method: 'DELETE',
        headers: !token ? {} : {
            'Accept': '*/*'
        }
    })

    const data = await response.json();

    return data
}

export const postPokemonAsync = async (pokemon) => {
    const token = await authService.getAccessToken();



    const response = await fetch(`api/localpokemons`, {
        method: 'PUT',
        headers: !token ? {} : {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pokemon)
    })

    // console.log(JSON.stringify(pokemon))
}

export const fetchPokemonTypesAsync = async () => {
    const token = await authService.getAccessToken();
    const response = await fetch(`api/pokemontypes`, {
        headers: !token ? {} : {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()
    return data
}

export const fetchPokemonTypeAsync = async (pokemonName) => {
    const token = await authService.getAccessToken();
    const response = await fetch(`api/pokemontypes/${pokemonName}`, {
        headers: !token ? {} : {
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    return data
}

