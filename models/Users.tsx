export class User{
    ci : string
    nombre : string
    cargo : string
    regional : string
    imagen : string
    

    constructor(ci : string, nombre : string, cargo : string, regional : string, imagen : string){
        this.ci = ci,
        this.nombre = nombre
        this.cargo = cargo
        this.regional = regional
        this.imagen = imagen
    }
}