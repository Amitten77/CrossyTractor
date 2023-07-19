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

//PLAYER INFORMATION

/*
SAMPLE ENTRY
{
  "_id": "64b8101d3703e40cf5fdf3c2",
  "_player_id": 10,
  "orientation": {
    "x": 0,
    "y": 0,
    "z": 0
  },
  "acceleration": {
    "x": 0,
    "y": 0,
    "z": 0
  },
  "accelerationGx": {
    "x": 0,
    "y": 0,
    "z": 0
  },
  "gyroscope": {
    "x": 0,
    "y": 0,
    "z": 0
  }
}
*/


app.get('/playerInformation', (req, res) => {

    let players = []
    
    db.collection('playerInformation')
    .find()
    .sort({ _score: -1})
    .forEach(player => players.push(player))
    .then(() => {
        res.status(200).json(players)
    }).catch((err) => {
        console.log(err)
        res.status(500).json({error: "Could not fetch the playerInformation"})
    }) //returns a cursor
})

app.get('/playerInformation/:id', (req, res) => {

    

        db.collection('playerInformation')
        .findOne({_player_id: parseInt(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not fetch the playerInformation'})
        })
})






app.post('/playerInformation', (req, res) => {
    const book = req.body

    db.collection('playerInformation')
    .insertOne(book)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not create a new document'})
    })
})




app.delete('/playerInformation/:id', (req, res) => {



        db.collection('playerInformation')
        .deleteOne({_player_id: parseInt(req.params.id)})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not delete the document'})
        })
    


})


app.patch('/playerInformation/:id', (req, res) => {
    const updates = req.body



        db.collection('playerInformation')
        .updateOne({_player_id: parseInt(req.params.id)}, {$set: updates})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not update the document'})
        })
    } 


)