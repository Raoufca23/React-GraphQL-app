require("dotenv").config();
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())

mongoose.connect(`mongodb+srv://cluster0.nb0qo.mongodb.net/${process.env.DB_NAME}`, {
    auth: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }, 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

mongoose.connection.once('open', () => {
    console.log('Connected succesfully')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('Server listening for requests at port 4000')
})