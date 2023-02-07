import express  from "express";
const {Router} = express;
import {productosDao as productosApi, carritosDao as carritosApi} from './daos/index.js';


const app = express();

// permisos de administrador

const esAdmin = true

function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin())
    } else {
        next()
    }
}

//------------------------------------------------------------------------------------------------------------
// configuro router de productos

const productosRouter = new Router();

productosRouter.get('/', async (req, res) => {
    const listadoProd = await productosApi.listarAll()

    res.send(listadoProd)
    
})

productosRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const producto = await productosApi.listar(id)

    res.send(producto)
    
})

productosRouter.post('/', soloAdmins, async (req, res) => {
    const producto = req.body;
    const nuevoProd = await productosApi.guardar(producto)

    res.json(nuevoProd)
})

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    const id = req.params.id;
    const producto = req.body;
    const prodUpdate = await productosApi.actualizar(producto, id)     

    res.json(prodUpdate)
})

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    const id = req.params.id
    const deleteProd = await productosApi.borrar(id)

    res.json(deleteProd)
})

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router()

carritosRouter.get('/', async (req, res) => {
    const listadoCarritos = await carritosApi.listarAll()
    res.send(listadoCarritos)
    
})

carritosRouter.post('/', async (req, res) => {
    const carritoNuevo = await carritosApi.crearCarrito()
    res.json(carritoNuevo)
 
})

carritosRouter.delete('/:id', async (req, res) => {
    const id = req.params.id
    const carritoBorrado = await carritosApi.borrar(id)
    res.json(carritoBorrado)
    
})

//--------------------------------------------------
// router de productos en carrito

carritosRouter.get('/:id/productos', async (req, res) => {
    try {
        const id= req.params.id;
        const productosEnCarrito = await carritosApi.listarProductos(id)
        res.send(productosEnCarrito)
    } catch (error) {
        console.log(error)
    }
    
})

carritosRouter.post('/:id/productos', async (req, res) => {
    const idProd = req.body.id
    const producto = await productosApi.listar(idProd)
    const id = req.params.id
    const productoAgregado = await carritosApi.agregarProducto(id, producto);
    res.send(productoAgregado)
    
})

carritosRouter.delete('/:id/productos/:idProd', async (req, res) => {
    try {
        const id = req.params.id
        const idProd= req.params.idProd
        const eliminarProducto = await carritosApi.eliminarProducto(id, idProd)
        res.send(eliminarProducto)
    } catch (error) {
        
    }
    
})

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

export default app