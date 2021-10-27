import { flatten } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectAllPokemons } from './pokemonsSlice'
import searchToX from 'react-useanimations/lib/searchToX'
import UseAnimations from 'react-useanimations'
import '../../styles/animations.css';
import Expand from 'react-expand-animated';

const PokemonSearchBar = (props) => {
    const pokemonData = useSelector(selectAllPokemons).data[0]
    const history = useHistory()
    const [isActive, setIsActive] = useState(false)
    const [visibleOnSmallScreen, setVisibleOnSmallScreen] = useState(false);
    let mergedPokemonData = flatten(pokemonData)

    useEffect(() => {
        console.log("PROPS", props)
        if (props.visibleOnSmallScreen !== undefined) {
            setVisibleOnSmallScreen(props.visibleOnSmallScreen)
        }
    }, [])

    const onPokemonClickListener = (event) => {
        const pickedPokemon = mergedPokemonData.find((pokemon) =>
            pokemon.name === event.target.value
        )
        if (pickedPokemon) {
            history.push(`/pokemons/details/${event.target.value}`)
        }
    }

    const onSearchActiveListener = () => {
        setIsActive(!isActive)
    }

    const handleSerachBar = () =>
        <UseAnimations
            reverse={isActive}
            pathCss={"stroke: #292929;"}
            size={40}
            onClick={onSearchActiveListener}
            animation={searchToX}
            wrapperStyle={{ border: "1px solid #292929", borderRadius: "5px" }}
        />

    let content = (
        <div className="row">
            <div className="col-9 ">
                <Expand open={isActive}>
                    <input className="form-control" onChange={(event) => onPokemonClickListener(event)} list="datalistOptions" id="exampleDataList" placeholder="Type to search pokemon..." />
                    <datalist id="datalistOptions" className="datalist-item">
                        {mergedPokemonData.map((data, index) => <option key={index} value={data.name} />)}
                    </datalist>
                </Expand>
            </div>
            <div
                style={{ cursor: "pointer" }}
                className={`col-3 ${!visibleOnSmallScreen ? 'd-none d-md-block' : 'd-md-none'}`}>
                <UseAnimations
                    reverse={isActive}
                    pathCss={"stroke: #292929;"}
                    size={35}
                    className="float-end"
                    onClick={onSearchActiveListener}
                    animation={searchToX}
                    wrapperStyle={{ border: "1px solid #292929", borderRadius: "5px" }}
                />
            </div>
        </div>
    )

    // let content = (
    //     <Row style={{marginBottom: "20px"}}>
    //         <Col>
    {/* <label htmlFor="exampleDataList" className="form-label">Search Pokemon</label> */ }
    // <input className="form-control" onChange={(event) => onPokemonClickListener(event)} list="datalistOptions" id="exampleDataList" placeholder="Type to search pokemon..." />
    // <datalist id="datalistOptions" className="datalist-item">
    //     {mergedPokemonData.map((data, index) => <option key={index} value={data.name}/>)}
    // </datalist>
    //         </Col>
    //     </Row>
    // )

    return (
        <>
            {content}
        </>
    )

}

export default PokemonSearchBar