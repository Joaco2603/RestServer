

const jwt = require('jsonwebtoken')

const { User } = require('../models');

const generarJWT = (uid = '')=>{
return new Promise ((res,rej)=>{
  

        const payload = { uid };
    
        jwt.sign( payload,process.env.SECRECTPROVATEKEY,{
            expiresIn:'4h'
        },(err,token)=>{
            if( err ){
                console.log(err)
                rej('No se pudo genera el token')
            }else{
                res(token)
            }
    
        } )
    })
}

const comprobarJWT = async( token = '') => {

    try {
        
        if(  token.length < 10 ) {
            return null;
        }

        const { uid } = jwt.verify( token, process.env.SECRECTPROVATEKEY );
        const usuario = await User.findById( uid );

        if ( usuario ) {
            if ( usuario.estado ) {
                return usuario;
            } else {
                return null;
            }
        } else {
            return null;
        }

    } catch (error) {
        return null;
    }

}


module.exports = {
    generarJWT,
    comprobarJWT
}