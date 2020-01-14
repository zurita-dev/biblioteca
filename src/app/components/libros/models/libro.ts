import { autorConId } from '../../autor/models/autor';

export interface libro {
    titulo: string;
    autor: string;
    anio: Date;
    descripcion: string;
}
