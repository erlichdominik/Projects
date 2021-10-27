import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLocal, setIsLocal } from '../features/pokemons/pokemonsSlice';
import Switch from "react-switch";
import { Image } from 'react-bootstrap';
import { bounce } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import PokemonSearchBar from '../features/pokemons/PokemonSearchBar';

const styles = {
  bounce: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounce, 'bounce')
  }
}


const NavMenu = () => {
  const [collapsed, setCollapsed] = useState(true);
  const isLocal = useSelector(selectIsLocal)
  const dispatch = useDispatch()

  const toggleNavbar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Row>
      <Col>
        <header>
          <Navbar sticky="top" className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
            <Container>

              <NavbarBrand tag={Link} to="/">
                <StyleRoot>
                  <img className="pokemon-pixel-img pokemon-logo" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png" />
                </StyleRoot>

              </NavbarBrand>


              <NavbarToggler onClick={toggleNavbar} className="mr-2" />
              <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                <ul className="navbar-nav flex-grow">
                  <NavItem className="me-3">
                    <PokemonSearchBar visibleOnSmallScreen={false}/>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#" tag={Link} onClick={() => {
                      dispatch(setIsLocal(!isLocal))
                    }} className="text-dark">Favourites</NavLink>
                  </NavItem>
                  <LoginMenu>
                  </LoginMenu>
                </ul>
              </Collapse>
            </Container>
          </Navbar>
        </header>
      </Col>
    </Row>

  )

}

export default NavMenu;

// export class NavMenu extends Component {
//   static displayName = NavMenu.name;

//   constructor (props) {
//     super(props);

//     this.toggleNavbar = this.toggleNavbar.bind(this);
//     this.state = {
//       collapsed: true
//     };
//   }

//   toggleNavbar () {
//     this.setState({
//       collapsed: !this.state.collapsed
//     });
//   }

//   render () {
//     return (
//       <header>
//         <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
//           <Container>
//             <NavbarBrand tag={Link} to="/">PokemonApp</NavbarBrand>
//             <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
//             <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
//               <ul className="navbar-nav flex-grow">
//                 <NavItem>
//                   <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink tag={Link} className="text-dark" >Fetch data</NavLink>
//                 </NavItem>
//                 <LoginMenu>
//                 </LoginMenu>
//               </ul>
//             </Collapse>
//           </Container>
//         </Navbar>
//       </header>
//     );
//   }
// }
