
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Row, Button } from 'reactstrap';
import '../estilos/Geral.css'
import { IconContext } from "react-icons";
import { FaUserPlus, FaSignInAlt, FaDatabase } from 'react-icons/fa';
import { sair } from './Icon';
import LogoGanhosegastosgrande from '../imagens/LogoGanhosegastosgrande.png';

export default function Header() {

    return (
        <Form className="justify-content-center" >
            
                <Row className="d-flex justify-content-center p-2 bd-highlight" 
                    style={{
                    backgroundColor: 'lightGray',
                    height: '50px',
                    margin: '4px 0 6px 0'
                }} >
                    <img src={LogoGanhosegastosgrande} alt="logo" style={{ width: 50, height: 35 }} className="mr-3" />
                    <h2 className="justify-content-center mt-1"> Gastos e Ganhos </h2>
                </Row>
        
            <FormGroup className="botao-header">
                <Link to='/'></Link>

                <Link to='/login'>
                    <Button outline className="mr-1 px-4" type='link'>
                        <IconContext.Provider value={{ className: 'iconeLogin' }}>
                            <FaSignInAlt />
                        </IconContext.Provider>
                    </Button>
                </Link>

                <Link to='/cadastro'>
                    <Button outline className="mr-1 px-4" type='link'>
                        <IconContext.Provider value={{ className: 'iconeCadastro' }}>
                            <FaUserPlus color="success" />
                        </IconContext.Provider>
                    </Button>
                </Link>

                <Link to='/dados'>
                    <Button outline className="mr-1 px-4" type='link'>
                        <IconContext.Provider value={{ className: 'iconeDados' }}>
                            <FaDatabase />
                        </IconContext.Provider>
                    </Button>
                </Link>

                <Link to='/logout'>
                    <Button outline className="mr-1 px-4" type='link'>
                        <IconContext.Provider value={{ className: 'iconeLogout' }}>
                            {sair}
                        </IconContext.Provider>
                    </Button>
                </Link>

            </FormGroup>

        </Form>
    );

}

