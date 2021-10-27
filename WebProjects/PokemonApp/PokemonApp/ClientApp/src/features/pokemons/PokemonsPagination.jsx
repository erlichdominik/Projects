import { uniqueId } from 'lodash'
import React from 'react'
import { withRouter } from 'react-router'
import { Pagination, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SpinnerComponent from '../../components/SpinnerComponent'
import { selectAllPokemons, selectPaginationPage, setPaginationPage } from './pokemonsSlice'

const PokemonsPagination = () => {
    const history = useHistory()
    const pokemons = useSelector(selectAllPokemons).data[0]
    const pokemonStatus = useSelector((state) => state.pokemons.pokemons.status)
    const currentPaginationPage = useSelector(selectPaginationPage)
    const dispatch = useDispatch()

    let content

    // console.log(currentPaginationPage)

    const onPaginationNumberClickedListener = (index) => {
        dispatch(setPaginationPage(index))
        // console.log(currentPaginationPage)
        history.push(`/pokemons/${index}`)
    }

    if (pokemonStatus === 'idle' || pokemonStatus === 'pending') {
        content = (
            <SpinnerComponent />
        )
    } else {

        let paginationItems = []
        paginationItems.push(
            <Pagination.First key={uniqueId('pagination-')} onClick={() => onPaginationNumberClickedListener(0)} />
        )
        paginationItems.push(
            <Pagination.Prev key={uniqueId('pagination-')} onClick={() => onPaginationNumberClickedListener(currentPaginationPage - 1)} />
        )

        const startingIndex = currentPaginationPage <= 10 ? 0 : currentPaginationPage - 5;

        console.log(pokemons)
        for (let index = startingIndex; index < pokemons.length; index++) {
            if (index < startingIndex + 10) {
                paginationItems.push(
                    <Pagination.Item key={uniqueId('pagination-')} onClick={() => onPaginationNumberClickedListener(index)}>
                        {index}
                    </Pagination.Item>
                )
            }
            if (index === startingIndex + 10) {
                paginationItems.push(
                    <Pagination.Ellipsis key={uniqueId('pagination-')} />
                )
            }
            if (index === pokemons.length - 1) {
                paginationItems.push(
                    <Pagination.Next key={uniqueId('pagination-')} onClick={() => onPaginationNumberClickedListener(parseInt(currentPaginationPage) + 1)} />
                )
                paginationItems.push(
                    <Pagination.Last key={uniqueId('pagination-')} onClick={() => onPaginationNumberClickedListener(pokemons.length - 1)} />
                )

            }
        }

        content = (
            <>
                <Pagination className="justify-content-center">
                    {paginationItems}
                </Pagination>

            </>
        )
    }

    return (
        <>
            <div className="row justify-content-center mt-5">
                <div className="col-md-8 text-center">
                    {content}
                </div>
            </div>
        </>
    )


}

export default PokemonsPagination