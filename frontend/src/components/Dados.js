import React, { useState, useEffect } from 'react';
import {
    Alert, 
    Row, 
    Col, 
    Form, 
    FormGroup, 
    Label, 
    Input, 
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button
} from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import api from './api'
import { moneyFormat, dateFormat, dateTimeFormat, groupDadosByDate } from './operations'
import Grafico from './Grafico'
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import * as locales from 'react-date-range/dist/locale';
import { confirmAlert } from 'react-confirm-alert'; // https://www.npmjs.com/package/react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';
import { IconContext } from "react-icons";

import {
    mais,
    menos,
    money,
    showCalendar,
    hideCalendar,
    descrever
} from './Icon';
import Logout from './Logout';


export default function Dados() {
    const [ganhos, setGanhos] = useState([])
    const [gastos, setGastos] = useState([])
    const [grafGastos, setGrafGastos] = useState([])
    const [grafGanhos, setGrafGanhos] = useState([])
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [result, setResult] = useState('')
    const [message, setMessage] = useState('')
    const [showDatePicker, setShowDatePicker] = useState(false)

    const [intervalo, setIntervalo] = useState([
        {
            startDate: addDays(new Date(), -30),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        if (!showDatePicker)
            list()
    }, [showDatePicker])


    const add = (op) => {
        const url = op === 'ganho' ? '/addganho' : '/addgasto'
        api.post(url, {
            descricao: descricao,
            valor: valor
        })
            .then(res => {
                if (res.data.result) {
                    setResult(res.data.result)
                    setMessage('')
                    setDescricao('')
                    setValor('')
                    list()
                }
                else
                    setMessage(res.data.message)
            })
            .catch(e => setMessage(e.message))
    }

    const deletar = (oid, tipo) => {
        confirmAlert({
            message: `Quer excluir este ${tipo}?`,
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        const url = tipo === 'ganho' ? '/deleteganho' : '/deletegasto'
                        api.post(url, { oid })
                            .then(res => {
                                if (res.data.result) {
                                    setResult(res.data.result)
                                    setMessage('')
                                    list()
                                }
                                else
                                    setMessage(res.data.message)
                            })
                            .catch(e => setMessage(e.message))
                    }
                },
                {
                    label: 'Não'
                }
            ]
        });
    }

    const list = () => {
        const [syear, smonth, sday, eyear, emonth, eday] = [
            intervalo[0].startDate.getFullYear(),
            intervalo[0].startDate.getMonth(),
            intervalo[0].startDate.getDate(),
            intervalo[0].endDate.getFullYear(),
            intervalo[0].endDate.getMonth(),
            intervalo[0].endDate.getDate()
        ]
        api.post('/listByInterval', { syear, smonth, sday, eyear, emonth, eday })
            .then(res => {
                if (res.data.ganhos || res.data.gastos) {
                    const ganhos = res.data.ganhos.map(ganho =>
                        <option key={ganho._id} {...ganho} onClick={() => deletar(ganho._id, 'ganho')}>
                            {ganho.descricao} {moneyFormat(ganho.valor)} {dateTimeFormat(ganho.data)}
                        </option>
                    )
                    const gastos = res.data.gastos.map(gasto =>
                        <option key={gasto._id} {...gasto} onClick={() => deletar(gasto._id, 'gasto')}>
                            {gasto.descricao} {moneyFormat(gasto.valor)} {dateTimeFormat(gasto.data)}
                        </option>
                    )
                    setGanhos(ganhos)
                    setGastos(gastos)
                    const [tempGanho, tempGasto] = groupDadosByDate(res.data.ganhos, res.data.gastos)
                    setGrafGanhos(tempGanho)
                    setGrafGastos(tempGasto)
                    setMessage('')
                }
                else
                    setMessage(res.data.message)
            })
            .catch(e => setMessage(e.message))
    }

    const startDate = dateFormat(intervalo[0].startDate);
    const endDate = dateFormat(intervalo[0].endDate);

    const series = [
        {
            name: 'Ganho',
            data: grafGanhos
        },
        {
            name: 'Gasto',
            data: grafGastos
        },
    ];


    return (
        <Form>
           
            {message !== '' &&
                <Row className="justify-content-center mt-5">
                    <Col xs='8' sm='6' md='4' lg='4' xl='3'>
                        <Alert color="danger">{message}</Alert>
                    </Col>
                </Row>
            }
            {result !== '' &&
                <Row className="justify-content-center mt-5">
                    <Col xs='8' sm='6' md='4' lg='4' xl='3'>
                        <Alert color="success">{result}</Alert>
                    </Col>
                </Row>
            }
            <Row className="justify-content-center mt-3">
                
                <Col xs='8' sm='7' md='5' lg='4' xl='3'>
                <InputGroup className='entrada mt-3 mb-3'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>{descrever}</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="text"
                            id="descricao"
                            placeholder="digite algo para identificar"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)} />
                    </InputGroup>
                    <InputGroup className='entrada mb-4'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>R$</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="number"
                            id="valor"
                            placeholder="digite o valor"
                            value={valor}
                            onChange={e => setValor(e.target.value)} />
                    </InputGroup>
                    <FormGroup className="d-flex justify-content-around">
                        <Button outline className='mr-2 ml-0 botao-middle' onClick={add.bind(this, 'ganho')}>
                            <IconContext.Provider value={{ className: 'iconeGanho' }}>
                                {mais} {' '} {money}
                            </IconContext.Provider>
                        </Button>
                        <Button outline className='mr-2 ml-0 botao-middle' onClick={add.bind(this, 'gasto')}>
                            <IconContext.Provider value={{ className: 'iconeGasto' }}>
                                {menos} {' '} {money}
                            </IconContext.Provider>
                        </Button>
                        <Button outline className='botao-middle1' onClick={() => setShowDatePicker(!showDatePicker)}>
                            {showDatePicker ? showCalendar : hideCalendar}
                        </Button>
                    </FormGroup>
                    <FormGroup>
                        {showDatePicker &&
                            <DateRange
                                onChange={item => setIntervalo([item.selection])}
                                months={1}
                                showMonthAndYearPickers={false}
                                moveRangeOnFirstSelection={false}
                                ranges={intervalo}
                                maxDate={new Date()}
                                locale={locales['pt']}
                                dateDisplayFormat="dd/MM/yyyy"
                                direction="vertical"
                                scroll={{ enabled: true }}
                            />
                        }
                    </FormGroup>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs='8' sm='7' md='5' lg='4' xl='3'>
                    <FormGroup>
                        <Label for="ganhos">Ganhos</Label>
                        <Input className='ganhosegastos' type="select" id="ganhos" style={{ height: '200px' }} multiple>
                            {ganhos}
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs='8' sm='7' md='5' lg='4' xl='3'>
                    <FormGroup>
                        <Label for="gastos">Gastos</Label>
                        <Input className='ganhosegastos' type="select" id="gastos" style={{ height: '200px' }} multiple>
                            {gastos}
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs='8' sm='7' md='5' lg='4' xl='3'>
                    <FormGroup className='grafico' style={{ height: '300px' }}>
                        <Grafico startDate={startDate} endDate={endDate} series={series} />
                    </FormGroup>
                </Col>
            </Row>
            <Switch>
                <Route path='/logout' component={Logout} />
            </Switch>
        </Form>
    )
}

