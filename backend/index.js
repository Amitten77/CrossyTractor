require('dotenv').config({path: './.env'})



const express = require('express')
const cors = require('cors');
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb')
//init app and middleware
const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3001

//db connection
let db
connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`app listening on port ${PORT}`)
        })
        db = getDb()
    }
})




//routes
app.get('/leaderboard', (req, res) => {

    let books = []
    
    db.collection('leaderboard')
    .find()
    .sort({ _score: -1})
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books)
    }).catch((err) => {
        console.log(err)
        res.status(500).json({error: "Could not fetch the leaderboard"})
    }) //returns a cursor
})

app.get('/leaderboard/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {

        db.collection('leaderboard')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not fetch the document'})
        })
    } else {
        res.status(500).json({error: "Ya objectId ain't valid"})
    }
})

app.post('/leaderboard', (req, res) => {
    const book = req.body

    db.collection('leaderboard')
    .insertOne(book)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not create a new document'})
    })
})

app.delete('/leaderboard/:id', (req, res) => {


    if (ObjectId.isValid(req.params.id)) {

        db.collection('leaderboard')
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not delete the document'})
        })
    } else {
        res.status(500).json({error: "Ya objectId ain't valid"})
    }


})


app.patch('/leaderboard/:id', (req, res) => {
    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {

        db.collection('leaderboard')
        .updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not update the document'})
        })
    } else {
        res.status(500).json({error: "Ya objectId ain't valid"})
    }


})