import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Cadastro from "./Cadastro";
import Dados from './Dados';
import Logout from './Logout';
import Atualizasenha from './AtualizarSenha';

export default function Switch() {
    return (
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/cadastro' component={Cadastro} />
            <Route path='/atualizasenha' component={Atualizasenha} />
            <Route path='/dados' component={Dados} />
            <Route path='/logout' component={Logout} />
        </Switch>
    );
}
