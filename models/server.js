const express = require('express');
const Cors = require('cors');
const {DBConnection} = require('../db/config')

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.crearUsuariosPath = '/api/crear'
        this.autPath = '/api/auth'

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
        this.app.use( express.json() )

        //Directorio publico
        this.app.use( express.static('public') )
    }

    routes(){
        
        
        this.app.use(this.crearUsuariosPath,require('../routes/user'))

        this.app.use(this.autPath,require('../routes/auth'))


        
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