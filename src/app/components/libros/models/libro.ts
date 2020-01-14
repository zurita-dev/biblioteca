export interface libro {
    titulo: string;
    autor: string;
    anio: Date;
    descripcion: string;
}

export class libroN{
    titulo: string;
    autor: string;
    anio: Date;
    descripcion: string;
    constructor ( titulo: string, autor: string, anio: Date, descripcion: string){
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.descripcion = descripcion;
    }

    verificaDatos():boolean{
        if(this.titulo !== '' && this.anio !== null && this.autor !== '' && this.descripcion !== '' ){
            return true;
          }else{
            return false;
          }
    }

}