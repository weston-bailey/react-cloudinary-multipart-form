import { 
  useState,
  useRef 
} from 'react'
import axios from 'axios'

export default function ImageUpload() {
  const [displayImg, setDisplayImg] = useState('')
  const [formImg, setFormImg] = useState('')
  const [msg, setMsg] = useState('')

  const inputRef = useRef(null) 

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // build form and headers
      const formData = new FormData()
      formData.append('image', formImg)
      const options = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      // make req
      const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/images', formData, options)
      console.log(data)
      // update state
      setDisplayImg(data.cloudinaryUrl)
      // reset input val
      if (inputRef) inputRef.current.value = ''
    } catch (err) {
      console.log(err)
      setMsg('ooooooooo noooooo 🤬')
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
            ref={inputRef}
            onChange={e => setFormImg(e.target.files[0])}
          />
        </div>

        <input type="submit" />
      </form>
    </>
    

  )
}