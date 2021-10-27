import React, { useEffect, useState } from 'react'
import { Card, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation, withRouter } from 'react-router-dom';
import { deleteLocalPokemonAsync, getLocalPokemonAsync, getPokemonByNameAsync, postPokemonAsync } from '../../api/client';
import SpinnerComponent from '../../components/SpinnerComponent';
import { selectIsLocal, selectLocalPokemons, selectLocalPokemonsStatus } from './pokemonsSlice';
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart'

const PokemonCard = props => {
    const pokemonName = props.pokemonName
    const [pokemonDetails, setPokemonDetails] = useState([])
    const [isActiveMouseMove, setIsActiveMouseMove] = useState(false)
    const history = useHistory()
    const allLocalPokemons = useSelector(selectLocalPokemons)
    const allLocalPokemonsStatus = useSelector(selectLocalPokemonsStatus)
    const [isSavedAnimation, setIsSavedAnimation] = useState(false)
    const distapch = useDispatch();
    const isLocal = useSelector(selectIsLocal)
    let location = useLocation()

    // console.log("LOCATION", location)

    useEffect(() => {
        setPokemonDetails([])
        let mounted = true;

        (async () => {
            let pokemon = isLocal ? await getLocalPokemonAsync(pokemonName) : await getPokemonByNameAsync(pokemonName);
            // console.log(pokemon)

            if (mounted) {
                setPokemonDetails(pokemon)
            }
            // if (allLocalPokemonsStatus !== 'fulfilled') {
            if (allLocalPokemons.data[0] !== undefined) {
                const findPokemon = allLocalPokemons.data[0].find(pokemon => pokemon.name === pokemonName)
                findPokemon === undefined ? setIsSavedAnimation(false) : setIsSavedAnimation(true)
            }
            // }
        })()

        return () => mounted = false;
    }, [history, pokemonName, allLocalPokemonsStatus])

    const onDetailsClickListener = (pokemonName) => {
        history.push(`/pokemons/details/${pokemonName}`)
    }

    const onSavedToFavouriteListener = async (pokemonName) => {
        isSavedAnimation ? await deleteLocalPokemonAsync(pokemonName) : await postPokemonAsync(pokemonDetails)
        setIsSavedAnimation(!isSavedAnimation)
        isSavedAnimation ? console.log(`${pokemonName} has been saved!`) : console.log(`you've deleted ${pokemonName} from favourites!`)
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let content

    if (pokemonDetails.length === 0) {
        content = (
            <SpinnerComponent />
        )
    } else {
        content = (
            <Card
                style={{ position: 'relative' }}
                className={`pokemon-holo-card text-center ${isActiveMouseMove ?
                    "active" : ""}`}>
                <Card.Title className="pokemon-name">
                    <Row>
                        <div className="col-sm-8 text-start">
                            <p className="pokemon-title" style={{ marginLeft: "5px" }}>
                                {capitalizeFirstLetter(pokemonDetails.name)}
                            </p>

                        </div>
                        <div className="col-sm-4">
                            <UseAnimations
                                onClick={() => onSavedToFavouriteListener(pokemonName)}
                                strokeColor={'#292929'}
                                reverse={isSavedAnimation}
                                pathCss="stroke: #292929; stroke-width: 4%; cursor: pointer;"
                                animation={heart}
                                size={40}
                                wrapperStyle={{ float: "right" }} />
                        </div>
                    </Row>
                </Card.Title>
                <Card.Img
                    className="pokemon-img cursor-pokemon"
                    variant="bottom"
                    src={pokemonDetails.sprite}
                    onClick={() => onDetailsClickListener(pokemonName)} />
            </Card>
        )
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default PokemonCard;