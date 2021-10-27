import React from 'react'
import { Switch, useLocation, Route } from 'react-router-dom';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Home from './components/Home';
import { Layout } from './components/Layout';
import PokemonDetails from './features/pokemons/PokemonDetails';
import PokemonsDashboard from './features/pokemons/PokemonsDashboard';

const AppSwitch = () => {

    return (
        <Layout>
            <Switch>
                <Route exact path='/' children={<Home />} />
                <Route exact path='/pokemons/:paginationNumber' children={<PokemonsDashboard />} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} children={<ApiAuthorizationRoutes />}/>
                <Route exact path='/pokemons/details/:pokemonName' children={<PokemonDetails />} />
            </Switch>
        </Layout>
    )
}

export default AppSwitch;