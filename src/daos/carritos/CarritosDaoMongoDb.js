import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('carritos', {
            productos: { type: [], required: true },
            id: {type: Number, required: true, unique: true},
            timestamp: {type: String, required: true}
        })
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }

    async crearCarrito() {
        try{
            const listadoCarts = await this.coleccion.find({})
            let id;
            listadoCarts.length === 0 ? (id = 1) : (id = listadoCarts.length + 1);
            let timestamp = Date.now()
            const newCart = {id, timestamp}
            const insertNewCart = new this.coleccion(newCart)
            let insertedNewCart = insertNewCart.save()
            return newCart.id;
        } catch(error) {
            console.log(error)
        }
    }

    async listarProductos(id) {
        try {
            const productosEnCarrito = await this.coleccion.find({id:`${id}`}, {productos:1, _id:0});
            return productosEnCarrito;
            
        } catch (error) {
            console.log(error)
        }
    }

    async agregarProducto(id, elem) {
        try {
            const carritoProductos = await this.coleccion.find({id:`${id}`}, {productos:1, _id:0});
            const productos = carritoProductos[0].productos
            productos.push(elem[0]);
            
            const productoAgregado = await this.coleccion.updateOne({id:`${id}`}, {$set:{productos: productos}});

            return  productoAgregado
            
        } catch (error) {
            console.log(error)
        }
    }

    async eliminarProducto(id, idProd) {
        try {
            const carritoProductos = await this.coleccion.find({id:`${id}`}, {productos:1, _id:0});
            const productos = carritoProductos[0].productos
            const prodEliminado = productos.filter(prod => prod.id != idProd)
            const deleted = await this.coleccion.updateOne({id:`${id}`}, {$set:{productos: prodEliminado}});
            return deleted
        } catch (error) {
            console.log(error)
        }
    }    

    async eliminarTodos(id) {
        try {
            const carritoSelect = await this.coleccion.updateMany({id}, {$set:{productos:[]}})
            return carritoSelect
        } catch (error) {
            console.log(error)
        }
    }


}

export default CarritosDaoMongoDb