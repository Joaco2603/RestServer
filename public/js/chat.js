

let usuario = null;
let socket = null;

const validarJWT = async()=>
{
    const token = localStorage.getItem('token') || '';

    if(token.length <= 10)
    {
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch( 'http://localhost:8080/api/auth/',{
        headers: { 'x-token':token}
    });

    const { usuario: userDB, token:tokenDB  } = await resp.json();

    localStorage.setItem('token',tokenDB);

    usuario = userDB;
    document.title = usuario.nombre;

    await conectarSocket();
}

const conectarSocket = async() => {

    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () =>{
        console.log('Sockets online')
    });

    socket.on('disconnect', () =>{
        console.log('Sockets offline')
    });

    socket.on('recibir-mensajes', dibujarMensajes );

    socket.on('usuarios-activos',dibujarUsuarios);

    socket.on('mensaje-privado', ( payload ) => {
        console.log('Privado:', payload )
    });
}

const dibujarMensajes = (payload = []) =>
{
    let mensajeHTML = '';
    payload.forEach(({nombre,mensaje})=>{
        mensajeHTML += `
        <li>
            <p>
                <h5 class="text-success">${nombre}</h5>
                <span class="fs-6 text-muted">${mensaje}</span>
            </p>
        </li>
        `;
    });
    ulMensajes.innerHTML = mensajeHTML; 
};

const dibujarUsuarios = (usuarios = [])=>
{
    let userHtml = '';
    usuarios.forEach(({nombre,uid})=>{
        userHtml += `
        <li>
            <p>
                <h5 class="text-success">${nombre}</h5>
                <span class="fs-6 text-muted">${uid}</span>
            </p>
        </li>
        `
    })

    ulUsuarios.innerHTML = userHtml;
}

txtMensaje.addEventListener('keyup',({keyCode})=>{
    const mensaje = txtMensaje.value;
    const uid  = txtUid.value;

    if(keyCode !== 13){return;}
    if(mensaje.length === 0){return;}
    if(mensaje === ''){return;}
    if(uid.length === 0){return;}
    if(uid === ''){return;}

    txtMensaje.value = '';

    socket.emit('enviar-mensaje',{mensaje,uid});
})


const main= async()=>
{
    await validarJWT();
}


main();