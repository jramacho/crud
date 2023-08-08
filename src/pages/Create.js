import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"



const Create = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [date, setDate] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating || !date) {
      setFormError('Favor Preencher todos os campos.')
      return
    }

    const { data, error } = await supabase
      .from('crud')
      .insert([{ title, method, rating, date }])
      .select()

    if (error) {
      console.log(error)
      setFormError('Favor Preencher todos os campos.')
    }
    if (data) {
      //console.log(data)
      setFormError(null)
      navigate('/')
      
    }
  }

  return (
    <div className="page create">
    
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titulo:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Texto:</label>
        <textarea 
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Nota:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

<label htmlFor="data">Data:</label>
        <input 
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
                  />

        <button>Criar Dados</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create
