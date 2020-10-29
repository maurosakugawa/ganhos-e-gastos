# Ganhos e Gastos com react hooks

Esta é uma calculadora de faturamento para motoboys e entregadores, ele faz o cálculo de gastos e ganhos para um cálculo final de lucro por dia, período do mês, por mês ou período no ano.

## Conteúdo

1. [Conceitos e plataformas](#conceitos-plataformas)
2. [Pré-requisitos](#pre-requisitos)
3. [Tecnologias](#tecnologias)
4. [Bibliotecas](#bibliotecas)
5. [Como rodar o aplicativo](#como-rodar)
    1. [Dentro do diretório backend rodar o seguinte comando no terminal](#dentro-backend)
    2. [Dentro do diretório frontend rodar o seguinte comando no terminal](#dentro-frontend)
6. [Licença](#license)

## Conceitos e plataformas <a name="conceitos-plataformas"></a>

Este aplicativo de ganhos e gastos foi construído com a plataforma React-JS, utilizando-se de react-app, react-hooks e o conceito de componentes funcionais, a persistência foi construída utilizando-se do Mongodb.

## Pre-requisitos <a name="pre-requisitos"></a>

* Usuário e senha do mongodb, no aplicativo utilizou-se do ambiente Cloud, para utilizar o banco localmente é necessário algumas adaptações ao projeto.
* NPM instalado
* NodeJS instalado

### Tecnologias <a name="tecnologias"></a>

* NodeJS  
* NPM
* Mongodb

### Bibliotecas <a name="bibliotecas"></a>

* react
* react-dom
* react-router-dom
* bootstrap
* reactstrap
* axios
* react-calendar
* mongoose

### Como rodar o aplicativo <a name="como-rodar"></a>

* Clonar o repositório ou fazer download para seu computador.
* Modificar o arquivo backend/keys.js, inserindo o link gerado (mongoUrl) pelo mongodb para acesso ao seu atlas cluster, nesse link consta o usuário, a senha e o nome do cluster.
* Fazer login no seu Mongo DB cloud, nesse caso você precisará de conexão de internet, adaptando o código é possível instalar o mongodb no seu aparelho e fazer conexão local com seu banco de dados.
* Este aplicativo foi desenvolvido para ser instalado no computador, não foi desenvolvido nenhum apk para instalação em celular.

#### Dentro do diretório backend rodar o seguinte comando no terminal <a name="dentro-backend"></a>

```bash
nodemon
```

Este comando fará com que o servidor rode na porta 3101, e se tudo estiver certo aparecerá no terminal:

```bash
Rodando na porta 3101...
Conectado com o BD
```

#### Dentro do diretório frontend rodar o seguinte comando no terminal <a name="dentro-frontend"></a>

```bash
npm start
```

### License <a name="license"></a>

Este aplicativo está sob a licença  GNU GENERAL PUBLIC LICENSE Version 3.
