
const mongoose = require('mongoose');

const DBConnection = async()=>{

    try {
        
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('Base de datos conectada')

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    DBConnection
}