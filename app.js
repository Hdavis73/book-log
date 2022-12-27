const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.listen(5000)

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

