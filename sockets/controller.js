const { comprobarJWT } = require("../helpers/generarjwt");

const ChatMensajes = require('../models/chat-mensajes')

const chatMensajes = new ChatMensajes();

const socketController = async(socket, io)=>
{
    const token = await comprobarJWT(socket.handshake.headers['x-token']);

    if(!token)
    {
        return socket.disconnect();
    }
    chatMensajes.agregarUsuario(token);
    io.emit('usuarios-activos',chatMensajes.usuariosArr);
    socket.emit('recibir-mensajes',chatMensajes.ultimos10);

    socket.join(token.id);

    socket.on('disconnect',()=>{
        chatMensajes.desconectarUsuario( token.id );
        io.emit('usuarios-activos',chatMensajes.usuariosArr)     
    })

    socket.on('enviar-mensaje',({uid,mensaje})=>{

        if( uid )
        {
            socket.to( uid ).emit('mensaje-privado',{de:token.nombre, mensaje})
        }else
        {
            chatMensajes.enviarMensaje(token.id,token.nombre,mensaje);
            io.emit('recibir-mensajes',chatMensajes.ultimos10);
        }
    })
}

module.exports = {
    socketController
}