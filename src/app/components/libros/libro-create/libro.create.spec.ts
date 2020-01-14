import {LibroCreateComponent } from './libro-create.component'
import { libroN } from '../models/libro';



describe('Test for libro create', () =>{
    it('debe regresar true porque los campos estan seteados', ()=>{
        const Libro = new libroN('Harry potter', 'J. K Rowling',new Date, 'De fantasia');
        const verifica = Libro.verificaDatos();
        expect(verifica).toEqual(true);
    })
})