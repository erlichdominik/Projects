import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { useParams } from 'react-router'
import { fetchLocalPokemons, fetchPokemons, fetchPokemonTypes, selectAllPokemons, selectIsLocal, selectLocalPokemons, selectLocalPokemonsStatus, selectPaginationPage, selectPokemonTypes, selectPokemonTypesStatus, setPaginationPage } from './pokemonsSlice'
import PokemonCard from './PokemonCard'
import { Container, Row, Col, Pagination } from 'react-bootstrap'
import { chunk, uniqueId } from 'lodash'
import PokemonSearchBar from './PokemonSearchBar'
import PokemonsPagination from './PokemonsPagination'
import SpinnerComponent from '../../components/SpinnerComponent'
import { useHistory, useParams, Link, useLocation } from 'react-router-dom'
import { fetchPokemonTypesAsync } from '../../api/client'

const PokemonsDashboard = () => {
    const { paginationNumber } = useParams()
    const pokemonsData = useSelector(selectAllPokemons)
    const isLocal = useSelector(selectIsLocal)
    const localPokemons = useSelector(selectLocalPokemons)
    const localPokemonStatus = useSelector(selectLocalPokemonsStatus)
    const dispatch = useDispatch()
    const localPokemonsStatus = useSelector((state) => state.pokemons.localPokemons.status)
    const pokemonStatus = useSelector((state) => state.pokemons.pokemons.status)
    const pokemonTypesStatus = useSelector(selectPokemonTypesStatus)
    const currentPaginationPage = useSelector(selectPaginationPage)
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        dispatch(setPaginationPage(paginationNumber))
        if (pokemonTypesStatus === 'idle') {
            dispatch(fetchPokemonTypes())
        }
        if (localPokemonStatus === 'idle') {
            dispatch(fetchLocalPokemons())
        }
        console.log('fetching pokemons')
        if (!isLocal) {
            if (pokemonStatus === 'idle') {
                dispatch(fetchPokemons())
            }
        } else {
            if (localPokemonsStatus === 'idle') {
                dispatch(fetchLocalPokemons())
            }
        }

        // console.log("HELLO")

    }, [pokemonStatus, currentPaginationPage, paginationNumber, dispatch, isLocal])

    let content

    if (!isLocal) {
        if (pokemonsData.status === 'pending') {
            content = (
                <SpinnerComponent />
            )
        } else if (pokemonsData.status === 'fulfilled') {
            const currentData = pokemonsData.data[0][currentPaginationPage]
            // console.log(currentData)
            const rows = chunk(currentData, 4)
            // console.log(pokemonsData)
            content = rows.map((row, index) => (
                <Row key={index} style={{ marginBottom: "10px" }}>
                    {
                        row.map((col, index) => {
                            console.log(col)
                            return (
                                <Col key={index}>
                                    <PokemonCard key={index} pokemonName={col.name} />
                                </Col>
                            )
                        })
                    }
                </Row>
            ))
        }
    } else {
        if (localPokemons.status === 'pending') {
            content = (
                <SpinnerComponent />
            )
        } else if (localPokemons.status === 'fulfilled') {
            // console.log(localPokemons.data)
            const currentData = localPokemons.data[currentPaginationPage]
            const rows = chunk(currentData, 4)

            content = rows.map((row, index) => (
                <Row key={index} style={{ marginBottom: "10px" }}>
                    {
                        row.map((col, index) => {
                            console.log(col)
                            return (
                                <Col key={index}>
                                    <PokemonCard key={index} pokemonName={col.name} />
                                </Col>
                            )
                        }
                        )
                    }
                </Row>
            ))
        }
    }


    return (
        <Container>
            <PokemonSearchBar visibleOnSmallScreen={true} />
            {content}
            <PokemonsPagination />
        </Container>
    )
}


export default PokemonsDashboard;