

import React, { useState } from 'react';
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
import { confirmAlert } from 'react-confirm-alert'; // https://www.npmjs.com/package/react-confirm-alert
import api from './api';
import '../estilos/React-alert.css'
import '../estilos/Geral.css';
import { chave } from './Icon';

export default function Atualizasenha() {

    const [senha, setSenha] = useState('');
    const [confirmacao, setConfirmacao] = useState('');
    const [erro, setErro] = useState('');
    const [msg, setMsg] = useState('');


    const enviar = (e) => {
        e.preventDefault();
        setErro('');
        if (senha === '')
            setSenha('Forneça a senha');
        else if (senha !== confirmacao)
            setErro('A senha e a confirmação precisam ser iguais');
        else {
            confirmAlert({
                message: 'Confirma mudança de senha?',
                buttons: [
                    {
                        label: 'Sim',
                        onClick: () => {

                            api.post('/password', { senha })
                                .then(res => {
                                    if (res.data.result) {
                                        setMsg(res.data.result);
                                        setSenha('');
                                    }
                                    else
                                        setErro(res.data.message);
                                })
                                .catch(e => setErro(e.message));
                        }
                    },
                    {
                        label: 'Não',
                    }
                ]
            });
        }
    }

    return (
        <Row className="justify-content-center mt-2">
            <Col xs='8' sm='6' md='4' lg='4' xl='3'>
                <h3 className='align-titulo'>Atualização de senha</h3>
                <Form onSubmit={enviar}>

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

                    <Button className="btn btn-primary btn-block">Atualizar senha</Button>
                    {erro !== '' &&
                        <Alert color="danger" className="mt-3">
                            {erro}
                        </Alert>}
                    {msg !== '' &&
                        <Alert color="success" className="mt-3">
                            {msg}
                        </Alert>}
                </Form>
            </Col>
        </Row>
    );

}
