

const { Schema,model } = require('mongoose')


const RoleSchema = Schema({

    rol:{
        type:String,
        required:[true,'El rol es obligatorio']
    }

})

RoleSchema.methods.toJSON = function(){
    const { _id,__v,...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario
}

module.exports = model('Role', RoleSchema);