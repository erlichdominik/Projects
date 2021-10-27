import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getPokemonByNameAsync } from '../../api/client'
import SpinnerComponent from '../../components/SpinnerComponent'
import PokemonSearchBar from './PokemonSearchBar'
import '../../styles/pokemon-details.css'
import _ from 'lodash'
import styled from 'styled-components'
import { Accordion, Row } from 'react-bootstrap'


const PokemonDetails = () => {
    const { pokemonName } = useParams()
    let history = useHistory();
    console.log("POKEMON NAME", pokemonName)
    // console.log("POKEMON NAME", pokemonName)
    const [pokemonData, setPokemonData] = useState([])
    // const [pokemonTypes, setPokemonTypes] = useState([])

    // console.log(pokemonData)
    if (pokemonData.length !== 0) {
        // console.log(pokemonData.types[0])
        // pokemonData.types.map((type, index) => {
        //     // console.log(type.type)
        // })
    }

    // console.log(pokemonTypes)

    const PokemonImage = styled.img`
        src: ${props => props.src};
    `;

    const PokemonTitleName = styled.p`
        background: linear-gradient(
            121deg,
            rgba(181, 234, 234, 0.5) 0%,
            rgba(237, 246, 229, 0.5) 33%,
            rgba(255, 188, 188, 0.5) 66%,
            rgba(243, 139, 160, 0.5) 100%
        );
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    `;


    useEffect(() => {
        console.log(pokemonName);
        (async () => {
            setPokemonData(await getPokemonByNameAsync(pokemonName))
            // setPokemonTypes(await fetchPokemonTypeAsync(pokemonName))
        })()
    }, [pokemonName])

    let content

    if (pokemonData.length === 0) {
        content = (
            <SpinnerComponent />
        )
    } else {
        content = (
            <div className="row justify-content-center">
                <div className="row pokemon-details-card" style={{ width: "100%", padding: "0px", borderRadius: "5px" }}>
                    <div className="col text-center pokemon-details-title-name" style={{ padding: "0px", margin: "0px" }}>
                        <PokemonTitleName>
                            {_.capitalize(pokemonData.name)}
                        </PokemonTitleName>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            {/* img */}
                            <PokemonImage className="w-100 mt-0 pokemon-holo-card img-fluid rounded img-thumbnail" src={pokemonData.sprite} />
                        </div>
                        <div className="col-md-6">
                            <Accordion>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>
                                        Types
                                    </Accordion.Header>
                                    <Accordion.Body className="pokemon-details-accordion-body">
                                        {
                                            pokemonData.types.map((type, index) => (
                                                <div className="col-md-8" key={index}>{type.type.name}</div>
                                            ))
                                        }
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        Abilities
                                    </Accordion.Header>
                                    <Accordion.Body className="pokemon-details-accordion-body">
                                        {
                                            pokemonData.abilities.map((ability, index) => (
                                                <div className="col-md-8" key={index}>{ability}</div>
                                            ))
                                        }
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        Sizes
                                    </Accordion.Header>
                                    <Accordion.Body className="pokemon-details-accordion-body">
                                        <Row>
                                            <div className="col-md-8">Weight: {pokemonData.weight}</div>
                                            <div className="col-md-8">Height: {pokemonData.height}</div>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        Stats
                                    </Accordion.Header>
                                    <Accordion.Body className="pokemon-details-accordion-body">
                                        <Row>
                                            {
                                                pokemonData.stats.map((stat, index) => (
                                                    <div className="col-md-8" key={index}>{stat.name}: {stat.value}</div>
                                                ))
                                            }
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        )
        // content = (
        //     <React.Fragment style={{height: "100vh"}}>
        //         <Row>
        //             <PokemonSearchBar />
        //         </Row>
        //         <div className="row justify-content-between">
        //             {/* <Card className="pokemon-details-card"> */}
        //                 <div className="col-5">
        //                     <Card.Img variant="top" src={pokemonData.sprite} />
        //                 </div>
        //                 <div className="col-6">
        //                     <Card.Body>
        //                         <Card.Title className="text-center">{pokemonData.name}</Card.Title>
        //                         <Accordion>
        //                             <Accordion.Item eventKey="3">
        //                                 <Accordion.Header>
        //                                     Types
        //                                 </Accordion.Header>
        //                                 <Accordion.Body className="pokemon-details-accordion-body">
        //                                     {
        //                                         pokemonData.types.map((type, index) => (
        //                                             <div className="col-md-8" key={index}>{type.type.name}</div>
        //                                         ))
        //                                     }
        //                                 </Accordion.Body>
        //                             </Accordion.Item>
        //                             <Accordion.Item eventKey="2">
        //                                 <Accordion.Header>
        //                                     Abilities
        //                                 </Accordion.Header>
        //                                 <Accordion.Body className="pokemon-details-accordion-body">
        //                                     {
        //                                         pokemonData.abilities.map((ability, index) => (
        //                                             <div className="col-md-8" key={index}>{ability}</div>
        //                                         ))
        //                                     }
        //                                 </Accordion.Body>
        //                             </Accordion.Item>
        //                             <Accordion.Item eventKey="1">
        //                                 <Accordion.Header>
        //                                     Sizes
        //                                 </Accordion.Header>
        //                                 <Accordion.Body className="pokemon-details-accordion-body">
        //                                     <Row>
        //                                         <div className="col-md-8">Weight: {pokemonData.weight}</div>
        //                                         <div className="col-md-8">Height: {pokemonData.height}</div>
        //                                     </Row>
        //                                 </Accordion.Body>
        //                             </Accordion.Item>
        //                             <Accordion.Item eventKey="0">
        //                                 <Accordion.Header>
        //                                     Stats
        //                                 </Accordion.Header>
        //                                 <Accordion.Body className="pokemon-details-accordion-body">
        //                                     <Row>
        //                                         {
        //                                             pokemonData.stats.map((stat, index) => (
        //                                                 <div className="col-md-8" key={index}>{stat.name}: {stat.value}</div>
        //                                             ))
        //                                         }
        //                                     </Row>
        //                                 </Accordion.Body>
        //                             </Accordion.Item>
        //                         </Accordion>
        //                     </Card.Body>
        //                 </div>

        //             {/* </Card> */}
        //         </div>

        //     </React.Fragment>
        // )
    }

    return (
        <>
            {content}
        </>
    );


}

export default PokemonDetails