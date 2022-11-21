const mongoose=require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`Data Base connected to the server: ${con.connection.host}`)
    }).catch(con => {
        console.log(`the connection to the data base was failed.`)
    })
}

module.exports=connectDatabase;