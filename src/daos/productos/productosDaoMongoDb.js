import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class ProductosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('productos', {
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
            timestamp:{type: String, required: true},
            stock:{type: Number, required: true},
            id:{type: Number, required: true, unique:true}
        })
    }
}

export default ProductosDaoMongoDb