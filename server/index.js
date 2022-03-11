// required packages
require('dotenv').config()
const express = require('express')
const path = require('path')
const { unlinkSync } = require('fs')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const cors = require('cors')
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
app.use(cors())

const uploads = multer({ dest: 'uploads/' })

app.get('/', (req, res) => {
  res.json({ msg: 'welcome to the image upload API 👋' })
})

app.get('/', (req, res) => {
  res.json({  msg: 'show all images '})
})

app.post('/images', uploads.single('image'), async (req, res) => {
  if (!req.file) return res.json({ msg: 'no file uploaded! ' })
  const cloudImageData = await cloudinary.uploader.upload(req.file.path)
  console.log(cloudImageData)
  const cloudinaryUrl = `https://res.cloudinary.com/dkchpbore/image/upload/v1593119998/${cloudImageData.public_id}.png`
  // remove the file after finishing up with it
  unlinkSync(req.file.path)
  res.json({ cloudinaryUrl })
})

app.listen(PORT, () => console.log(`listening to smooth sounds of port ${PORT} in the morning 🌊`))
