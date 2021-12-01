let fs = require("fs");

let peliculas = require('./peliculas')
let generos = require('./generos')

module.exports = {
    "peliculas": peliculas,
    "generos": generos,
    "getGeneros": generos.data,

    "aniosEnLista": lista => {
        let mySet = new Set()
        lista.forEach(pelicula => {
            mySet.add(pelicula.anio)
        });

        return Array.from(mySet)
    }

}
/* 
// extraer generos 
let saveGeneros = () => {
    let mySet = new Set()
    getPeliculas.forEach(pelicula => {
        pelicula.genero.forEach(genero => {
            mySet.add(genero)
        });
    });
    let generos = Array.from(mySet)

    let tablaGeneros = []

    generos.forEach((genero, index) => {
        let registro = {id: index+1, nombre: genero}
        tablaGeneros.push(registro)
    });

    fs.writeFileSync('generos.json', JSON.stringify(tablaGeneros), 'utf-8')
}
saveGeneros() */