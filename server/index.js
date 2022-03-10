// required packages
const express = require('express')
const path = require('path')
const { readdirSync } = require('fs')
const multer = require('multer')

// config express app
const app = express()
const PORT = 8000

// middlewares
app.use(express.static('uploads'))
app.use((req, res, next) => {
  console.log(`incoming request: ${new Date().toLocaleTimeString()} ${req.method} ${req.url}`)
  if (req.body) console.log(`body: ${req.body}`)
  next()
})

const uploads = multer({ dest: 'uploads/' })


app.get('/', (req, res) => {
  res.json({ msg: 'welcome to the image upload API 👋' })
})

app.post('/image', uploads.single('image'), (req, res) => {
  const files = readdirSync('uploads')

  console.log(files)

  if (files.length === 0) return res.json({ msg: 'no file uploaded! ' })

  res.json({ files })
})

app.listen(PORT, () => console.log(`listening to smooth sounds of port ${PORT} in the morning 🌊`))
