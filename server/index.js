// required packages
require('dotenv').config()
const express = require('express')
const path = require('path')
const { unlinkSync } = require('fs')
const multer = require('multer')
const cloudinary = require('cloudinary').v2

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

app.post('/image', uploads.single('image'), async (req, res) => {
  if (!req.file) return res.json({ msg: 'no file uploaded! ' })
 process.env.CLOUDINARY_URL
  const test = await  cloudinary.uploader.upload(req.file.path)
  console.log(test)
  // remove the file after finishing up with it
  unlinkSync(req.file.path)
  res.json({ msg: 'file upload successfully!' })
})

app.listen(PORT, () => console.log(`listening to smooth sounds of port ${PORT} in the morning 🌊`))
