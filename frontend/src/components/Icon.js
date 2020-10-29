
import React from 'react';
import {
    FaKey, 
    FaEnvelope,
    FaPlus,
    FaMinus,
    FaMoneyBillAlt,
    FaEye,
    FaCalendarAlt,
    FaCalendarTimes,
    FaUserAltSlash,
    FaEyeSlash,
    FaEdit
} from 'react-icons/fa';

const chave = <FaKey />
const envelope = <FaEnvelope />;
const mais = <FaPlus />;
const menos = <FaMinus />;
const money = <FaMoneyBillAlt className='money' />;
const sair = <FaUserAltSlash />;
const showCalendar = <p className='paragrafo'><FaEyeSlash />{' '}<FaCalendarTimes /></p>;
const hideCalendar = <p><FaEye />{' '}<FaCalendarAlt /></p>;
const descrever = <FaEdit />;

export {
    chave,
    envelope,
    mais,
    menos,
    money,
    sair,
    showCalendar,
    hideCalendar,
    descrever
};
