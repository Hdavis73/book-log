const express = require('express')
// const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')

app.listen(5000)

// app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/chooseLog', (req,res) => {
    res.render('choose-log')
})

app.get('/bookLog', (req,res) => {
    res.render('fullLog')
})

app.get('/chapterLog', (req,res) => {
    res.render('chapterLog')
})

app.get('/findBookLoad', (req,res) => {
    res.render('findBookLoad')
})

app.post('/renderBestSellers',(req,res) => {
    console.log(req.body)
    console.log(req.body.bestSellers[1].volumeInfo)
    // res.send({response: 'done'})
    // res.redirect('/findBook')
    res.send({'redirectTo': 'findBook'}, {bestSellers: req.body.bestSellers})
})

// app.get('/showBestSellers', (req,res) => {
//     res.render('findBook')
// })


app.post('/bookDetails', (req,res) => {
    console.log(req.body)

    res.send({'redirectTo': 'bookDetails'})
})



app.get('/showBookDetails', (req,res) => {
    console.log('in get request')
    res.render('book-details')    
})

