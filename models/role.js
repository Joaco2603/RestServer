

const { Schema,model } = require('mongoose')


const RoleSchema = Schema({

    rol:{
        type:String,
        require:[true,'El rol es obligatorio']
    }

})
console.log("Hola mundo")

module.exports = model('Role', RoleSchema);