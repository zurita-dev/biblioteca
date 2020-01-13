export interface autor {
    nombre: string;
    nacionalidad: string;
    anio: Date;
}

export interface autorConId{
    idAutor: string;
    autor: autor;
}