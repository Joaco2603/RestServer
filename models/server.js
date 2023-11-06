const express = require('express');
const Cors = require('cors');
const {DBConnection} = require('../db/config');
const fileUpload = require('express-fileupload');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;
        
        this.path = {
            auth :      '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            usuarios :  '/api/crear',
            uploads :   '/api/uploads',
            productos:  '/api/productos'
        }

        //Conectar a base de datos
        this.conectarDB()

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }
    async conectarDB(){
        await DBConnection();
    }
  


    middlewares(){


        //Cors
        this.app.use( Cors() )

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public') );

        //Carga de archivo
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));

         // Middleware de manejo de errores (debería ir al final de tus rutas o en tu archivo principal)
         this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Algo salió mal!');
        }); 

    }

    routes(){
        
        
        this.app.use(this.path.auth,require('../routes/auth'));
        
        this.app.use(this.path.buscar,require('../routes/buscar'))

        this.app.use(this.path.categorias,require('../routes/categorias'));
        
        this.app.use(this.path.usuarios,require('../routes/user'));

        this.app.use(this.path.uploads,require('../routes/uploads'));

        this.app.use(this.path.productos,require('../routes/productos'));

        // let options = {
        //     root: path.join(__dirname)
        // };


        // this.app.get('/',(req,res)=>{
        //     res.sendFile("C:\\Users\\JOAQUIN\\Desktop\\Curso node js\\8-RESTserver\\public\\index.html");
        // })
        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en localhost ${this.port}`)
        })
    }
}


module.exports = Server;