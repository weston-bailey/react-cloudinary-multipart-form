import { useState } from 'react'
import axios from 'axios'
// import FormData from 'form-data'

export default function ImageUpload() {
  const [displayImg, setDisplayImg] = useState('')
  const [formImg, setFormImg] = useState('')
  const [msg, setMsg] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // build form and get headers
      const formData = new FormData()
      formData.append('image', formData)

      const options = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
      // make req
      const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/images', formData)
      console.log(data)
      
    } catch (err) {
      console.log(err)
      setMsg('shit fucked up 🤬')
    }
  }

  return (
    <>
      <h1>Upload a pic to the cloudinary API!</h1>
      
      <h3>{msg}</h3>

      {
        displayImg
        &&
        <img 
          src={displayImg}
          alt="image from the api"
      />
      }

      <form 
        onSubmit={handleSubmit}
        encType='multipart/form'
      >
        <div>
          <label htmlFor='image-upload'>Upload a photo:</label>
          <input 
            type='file'
            id='image-upload'
            onChange={e => setFormImg(e.target.files[0])}
          />
        </div>

        <input type="submit" />
      </form>
    </>
    

  )
}