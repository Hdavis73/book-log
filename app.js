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

app.get('/findBook', (req,res) => {
    res.render('findBook')
})

app.post('/bookDetails', (req,res) => {
    console.log(req.body)

    res.send({'redirectTo': 'showBookDetails'})
})

app.get('/showBookDetails', (req,res) => {
    console.log('in get request')
    res.render('book-details')    
})

