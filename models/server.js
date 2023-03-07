const express = require('express')
const path = require('path');


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares(){
        this.app.use( express.static('/public') )
    }

    routes(){
        // let options = {
        //     root: path.join(__dirname)
        // };


        this.app.get('/',(req,res)=>{
            res.sendFile("C:\\Users\\JOAQUIN\\Desktop\\Curso node js\\8-RESTserver\\public\\index.html");
        })
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en localhost ${this.port}`)
        })
    }
}


module.exports = Server;