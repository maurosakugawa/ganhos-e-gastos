import React, { useState } from 'react';
import api from './api';
import {
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button,
    Row,
    Col,
    Alert
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import '../estilos/Geral.css';
import '../estilos/Componentes.css';
import { chave, envelope } from './Icon';

export default function Login() {
    const [mail, setMail] = useState('')
    const [senha, setSenha] = useState('')
    const [message, setMessage] = useState('')
    const [result, setResult] = useState('')
    const [logado, setLogado] = useState(false)

    const enviar = (e) => {
        e.preventDefault();
        setMessage('')
        if (mail === '')
            setMessage('Forneça o e-mail')
        else if (senha === '')
            setMessage('Forneça a senha')
        else {
            api.post('/login', { mail, senha })
                .then(res => {
                    if (res.data.result) {
                        setResult(res.data.result)
                        setMail('')
                        setSenha('')
                        setLogado(true)
                    }
                    else
                        setMessage(res.data.message)
                })
                .catch(e => setMessage(e.message))
        };
    }

    return (
        <Row className="justify-content-center mt-2">
            <Col xs='8' sm='6' md='4' lg='4' xl='3'>
                <Form onSubmit={enviar}>
                    <h2 className="align-titulo">Login</h2>
                    <InputGroup className='entrada'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>{envelope}</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="email"
                            placeholder="e-mail de login"
                            value={mail}
                            onChange={e => setMail(e.target.value.trim())}
                            required />
                    </InputGroup>
                    <InputGroup className='entrada'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>{chave}</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="password"
                            placeholder="senha de login"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value.trim())}
                            minLength="6" maxLength="10"
                            required />
                    </InputGroup>
                    <Button>Entrar</Button>
                    {
                        message !== '' &&
                        <Alert color="danger" className="mt-3">{message}</Alert>
                    }
                    {
                        result !== '' &&
                        <Alert color="success" className="mt-3">{result}</Alert>
                    }
                    {
                        logado && <Redirect to="/dados" />
                    }
                </Form>
            </Col>
        </Row>
    )
}
