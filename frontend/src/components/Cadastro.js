

import React, { useState } from 'react';
import {
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Button,
    Row,
    Col,
    Alert
} from 'reactstrap';
import { Link } from 'react-router-dom';
import api from './api';
import '../estilos/Geral.css';
import { chave, envelope } from './Icon';
/*
import { FaKey, FaEnvelope } from 'react-icons/fa';

const chave = <FaKey />
const envelope = <FaEnvelope />;*/

export default function Cadastrar() {
    const [mail, setMail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmacao, setConfirmacao] = useState('');
    const [erro, setErro] = useState('');
    const [msg, setMsg] = useState('');

    const enviar = (e) => {
        e.preventDefault();
        setErro('');
        if (mail === '')
            setErro('Forneça o e-mail');
        else if (senha === '')
            setSenha('Forneça a senha');
        else if (senha !== confirmacao)
            setErro('A senha e a confirmação precisam ser iguais');
        else {
            api.post(
                '/add',
                { mail, senha }
            )
                .then(res => {
                    if (res.data.result) {
                        setMsg(res.data.result);
                        setMail('');
                        setSenha('');
                    }
                    else
                        setErro(res.data.message);
                })
                .catch(e => setErro(e.message));
        }
    };

    return (
        <Row className="justify-content-center mt-2">
            <Col xs='8' sm='6' md='4' lg='4' xl='3'>
                <h2 className='align-titulo'>Cadastro</h2>
                <Form onSubmit={enviar} className="justify-content-center mt-2">
                    <Col xs='8' sm='6' md='4' lg='4' xl='3'></Col>

                    <InputGroup className='entrada'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>{envelope}</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="email"
                            placeholder="forneça o seu e-mail"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            required />
                    </InputGroup>

                    <InputGroup className='entrada'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>{chave}</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type= "password"
                            placeholder="senha para login"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            minLength="6" maxLength="10"
                            required />
                    </InputGroup>

                    <InputGroup className='entrada'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>{chave}</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="password"
                            placeholder="repetir a senha"
                            value={confirmacao}
                            onChange={(e) => setConfirmacao(e.target.value)}
                            minLength="6" maxLength="10"
                            required />   
                    </InputGroup>

                    <FormGroup className="d-flex justify-content-around">
                        <Button>Cadastrar usuário</Button>
                        <Link to='/atualizasenha'>
                            <Button variant="contained" type='link' style={{ backgroundColor: "#02735E" }} >Trocar senha</Button>
                        </Link>
                    </FormGroup>
                    <FormGroup>
                        {erro !== '' &&
                            <Alert color="danger" className="mt-3">
                                {erro}
                            </Alert>}
                        {msg !== '' &&
                            <Alert color="success" className="mt-3">
                                {msg}
                            </Alert>}
                    </FormGroup>

                </Form>
            </Col>
        </Row>
    );
}


/*
  return (
        <Row className="justify-content-center mt-2">
            <Col xs='8' sm='6' md='4' lg='4' xl='3'>
                <h2 className='align-titulo'>Cadastro</h2>
                <Form onSubmit={enviar} className="justify-content-center mt-2">
                    <Col xs='8' sm='6' md='4' lg='4' xl='3'></Col>
                    <FormGroup className="pass-wrapper">
                        <div className="input-group mb-3 justify-content-center mt-2">
                            <div className="input-group-prepend border border-gray rounded-left rounded-right-0">
                                <span className="input-group-text" id="basic-addon1">{envelope}</span>
                            </div>
                            <input
                                className='border border-gray rounded-right'
                                name="email"
                                type="email"
                                placeholder="forneça o seu e-mail"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                required />
                        </div>
                    </FormGroup>

                    <FormGroup className="pass-wrapper">
                        <div className="input-group mb-3 justify-content-center mt-2">
                            <div className="input-group-prepend border border-gray rounded-left rounded-right-0">
                                <span className="input-group-text" id="basic-addon1">{chave}</span>
                            </div>
                            <input
                                className='border border-gray rounded-right border-0.1'
                                type="password"
                                placeholder="senha para login"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                minLength="6" maxLength="10"
                                required />
                        </div>
                    </FormGroup>

                    <FormGroup className="pass-wrapper">
                        <div className="input-group mb-3 justify-content-center mt-2">
                            <div className="input-group-prepend border border-gray rounded-left rounded-right-0">
                                <span className="input-group-text" id="basic-addon1">{chave}</span>
                            </div>
                            <input
                                className='border border-gray rounded-right border-0.1'
                                type={passwordShown ? "text" : "password"}
                                placeholder="repetir a senha"
                                value={confirmacao}
                                onChange={(e) => setConfirmacao(e.target.value)}
                                minLength="6" maxLength="10"
                                required />
                            <i onClick={togglePasswordVisiblity}>{type === 'password' ? eye : eyeSlash}</i>
                        </div>
                    </FormGroup>

                    <FormGroup className="d-flex justify-content-around">
                        <Button>Cadastrar usuário</Button>
                        <Link to='/atualizasenha'>
                            <Button variant="contained" type='link' style={{ backgroundColor: "#02735E" }} >Trocar senha</Button>
                        </Link>
                    </FormGroup>
                    <FormGroup>
                        {erro !== '' &&
                            <Alert color="danger" className="mt-3">
                                {erro}
                            </Alert>}
                        {msg !== '' &&
                            <Alert color="success" className="mt-3">
                                {msg}
                            </Alert>}
                    </FormGroup>

                </Form>
            </Col>
        </Row>
    );
    */