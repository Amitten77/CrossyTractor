const { MongoClient } = require('mongodb')
let dbConnection 
let uri = process.env.URI;
console.log(uri);


module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri, {useNewUrlParser: true, dbName: "Leaderboard"})
        .then((client) => {
            dbConnection = client.db()
            return cb()
        }).catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}