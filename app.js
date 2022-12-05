const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.listen(5000)

app.use(express.static('Public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req,res) => {
    res.render('index')
})