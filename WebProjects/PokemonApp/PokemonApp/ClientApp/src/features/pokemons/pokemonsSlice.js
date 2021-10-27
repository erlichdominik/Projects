import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { chunk } from "lodash";
import { getPokemonsAsync, getPokemonByNameAsync, getLocalPokemonsAsync, fetchPokemonTypesAsync } from "../../api/client";


const initialState = {
    pokemons: {
        data: [],
        status: 'idle',
        error: null
    },
    localPokemonsData: {
        data: []
    },
    currentPokemonsDetails: {
        data: [],
        status: 'idle',
        error: null
    },
    localPokemons: {
        data: [],
        status: 'idle',
        error: null
    },
    pagination: {
        paginationPage: 0,
    },
    isLocal: false,
    types: {
        data: [],
        status: 'idle',
        error: null
    }
}

export const fetchPokemonTypes = createAsyncThunk(
    'pokemons/fetchPokemonTypes',
    async () => {
        const data = await fetchPokemonTypesAsync()
        return data
    }
)

export const fetchPokemons = createAsyncThunk(
    'pokemons/fetchPokemons',
    async () => {
        const data = await getPokemonsAsync()
        return data
    }
)

export const fetchLocalPokemons = createAsyncThunk(
    '/pokemons/fetchLocalPokemons',
    async () => {
        const data = await getLocalPokemonsAsync()
        return data
    }
)

export const fetchPokemonByName = createAsyncThunk(
    'pokemons/fetchPokemonByName',
    async (pokemonName) => {
        const pokemonDetails = await getPokemonByNameAsync(pokemonName)
        return pokemonDetails
    }
)

// const chunk = (array, size) =>
//     Array.from({ length: Math.ceil(array.length / size) }, (value, index) => array.slice(index * size, index * size + size));

const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        setPaginationPage(state, action) {
            state.pagination.paginationPage = action.payload
        },
        setIsLocal(state, action) {
            state.isLocal = action.payload
        },
        setLocalPokemonData(state, action) {
            state.localPokemonsData = action.payload
        }
        
    },
    extraReducers: {
        [fetchPokemons.pending]: (state, action) => {
            state.pokemons.status = 'pending'
        },
        [fetchPokemons.fulfilled]: (state, action) => {
            state.pokemons.status = 'fulfilled'
            const dataChunks = chunk(action.payload, 20)
            state.pokemons.data.push(dataChunks)
        },
        [fetchPokemons.rejected]: (state, action) => {
            state.pokemons.status = 'rejected'
        },
        [fetchLocalPokemons.pending]: (state, action) => {
            state.localPokemons.status = 'pending'
        },
        [fetchLocalPokemons.fulfilled]: (state, action) => {
            state.localPokemons.status = 'fulfilled'
            // const dataChunks = chunk(action.payload, 20)
            state.localPokemons.data.push(action.payload)
        },
        [fetchLocalPokemons.rejected]: (state, action) => {
            state.localPokemons.status = 'rejected'
        },
        [fetchPokemonByName.pending]: (state, action) => {
            state.currentPokemonsDetails.status = 'pending'
        },
        [fetchPokemonByName.fulfilled]: (state, action) => {
            state.currentPokemonsDetails.status = 'fulfilled'
            state.currentPokemonsDetails.data = action.payload
        },
        [fetchPokemonByName.rejected]: (state, action) => {
            state.currentPokemonsDetails.status = 'rejected'
        },
        [fetchPokemonTypes.pending]: (state, action) => {
            state.types.status = 'pending'
        },
        [fetchPokemonTypes.fulfilled]: (state, action) => {
            state.types.data = action.payload.results
            state.types.status = 'fulfilled'
        },
        [fetchPokemonTypes.rejected]: (state, action) => {
            state.types.status = 'rejected'
        },
        
    }
})

export const { setPaginationPage, setIsLocal, setLocalPokemonData } = pokemonsSlice.actions
export default pokemonsSlice.reducer

export const selectPokemonTypesStatus = (state) => state.pokemons.types.status
export const selectPokemonTypes = (state) => state.pokemons.types.data
export const selectLocalPokemons = (state) => state.pokemons.localPokemons
export const selectLocalPokemonsStatus = (state) => state.pokemons.localPokemons.status
export const selectIsLocal = (state) => state.pokemons.isLocal
export const selectAllPokemons = (state) => state.pokemons.pokemons
export const selectPokemonByName = (state, pokemonName) => {

    const pokemons =  state.pokemons.currentPokemonsDetails.data.find((pokemon) => pokemon.name === pokemonName)
    if (pokemons) {
        return pokemons
    } else {
        return null
    }
}
export const selectIsLocalPokemon = (state, pokemonName) => state.localPokemons
export const selectPokemonsDetails = (state) => state.pokemons.currentPokemonsDetails
export const selectPaginationPage = (state) => state.pokemons.pagination.paginationPage