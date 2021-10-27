import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PokemonDashboard from '../features/pokemons/PokemonsDashboard'
import { selectPaginationPage } from '../features/pokemons/pokemonsSlice'

const Home = () => {
    const history = useHistory()
    const currentPaginationPage = useSelector(selectPaginationPage)

    useEffect(() => {
        history.push(`/pokemons/${currentPaginationPage}`)
    }, [currentPaginationPage, history])

    return (
        <div>
            <PokemonDashboard />
        </div>
    )



}

export default Home;