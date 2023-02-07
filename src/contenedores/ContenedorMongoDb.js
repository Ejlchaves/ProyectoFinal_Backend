import mongoose from 'mongoose'
import config from '../config.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async listar(id) {
        const prod = await this.coleccion.find({id:`${id}`})
        return prod
    }

    async listarAll() {
        const listadoProd = await this.coleccion.find({})
        return listadoProd
    }

    async guardar(nuevoElem) {
        const listadoProd = await this.coleccion.find({})
        let id; 
            listadoProd.length === 0 ? (id = 1) : (id = listadoProd.length + 1);
        let timestamp = Date.now()
        const stock = 5
        let producto = {...nuevoElem, id, timestamp, stock}
        JSON.stringify[producto]
        const insertProd = new this.coleccion(producto)
        let insertedProd = insertProd.save()
        return insertedProd
    }

    async actualizar(nuevoElem, id) {
        const prod = await this.coleccion.updateOne({id:id}, {$set:nuevoElem})
        return prod
    }

    async borrar(id) {
        const prodDeleted = await this.coleccion.deleteOne({id:id})
        return prodDeleted
    }

    async borrarAll() {
        const collecDeleted = await this.coleccion.deleteMany({})
        return collecDeleted
    }
}

export default ContenedorMongoDb