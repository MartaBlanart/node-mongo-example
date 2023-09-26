const mongoose = require('mongoose')

const { URL_MONGO } = require('./common')

const initializeMongoConnection = async () => {
    mongoose.set('strictQuery', true)

    mongoose
        .connect(URL_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('Could not connect to MongoDB', err))
}

module.exports = {
    initializeMongoConnection,
}
