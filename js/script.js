import tabs  from'./modules/tabs';
import modal  from'./modules/modal';
import timer  from'./modules/timer';
import cards  from'./modules/cards';
import calc  from'./modules/calc';
import form  from'./modules/form';
import slider  from'./modules/slide';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {

    const modalTimerId = setTimeout(()=> openModal('.modal', modalTimerId), 300000);

    tabs();
    modal('[data-modal]', '.modal', modalTimerId);
    timer();
    cards();
    calc();
    form(modalTimerId);
    slider();
});