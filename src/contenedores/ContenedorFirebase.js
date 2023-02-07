import admin from "firebase-admin"
import config from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async listar(id) {
        try {
            const listadoProd = await this.coleccion.get()
            let docs = listadoProd.docs

            const response = docs.map((doc) =>( {
                idFirebase: doc.id,
                id: doc.data().id,
                title: doc.data().title,
                price: doc.data().price,
                thumbnail: doc.data().thumbnail,
                stock:doc.data().stock,
                timestamp:doc.data().timestamp
            }))
            const prodFiltrado = response.filter(prod => prod.id == id)

            return prodFiltrado
        } catch (error) {
            console.log(error)
        }

    }

    async listarAll() {
        const listadoProd = await this.coleccion.get()
            let docs = listadoProd.docs

            const response = docs.map((doc) =>( {
                idFirebase: doc.id,
                id: doc.data().id,
                title: doc.data().title,
                price: doc.data().price,
                thumbnail: doc.data().thumbnail,
                stock:doc.data().stock,
                timestamp:doc.data().timestamp
            }))

            return response
    }

    async guardar(nuevoElem) {
        try {
            const listadoProd = await this.coleccion.get()
            let docs = listadoProd.docs

            const response = docs.map((doc) =>( {
                idFirebase: doc.id,
                id: doc.data().id,
                title: doc.data().title,
                price: doc.data().price,
                thumbnail: doc.data().thumbnail,
                stock:doc.data().stock,
                timestamp:doc.data().timestamp
            }))

            const doc = this.coleccion.doc()

            let id; 
            response.length === 0 ? (id = 1) : (id = response.length + 1);
            let timestamp = Date.now()
            const stock = 5
            let producto = {...nuevoElem, id, timestamp, stock}
            const nuevoProd = await doc.create(producto)
            return nuevoProd
        } catch (error) {
            console.log(error)
            
        }
    }

    async actualizar(id, nuevoElem) {
        
    }

    async borrar(id) {

    }

    async borrarAll() {

    }

    async desconectar() {
    }
}

export default ContenedorFirebase