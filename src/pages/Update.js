import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import supabase from "../config/supabaseClient"
const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState(null)
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
      .update({ title, method, rating, date })
      .eq('id', id).select()

    if (error) {
      setFormError('Favor Preencher todos os campos.')
    }
    if (data) {
      setFormError(null)
      navigate('/')
    } alert("Dados atualizados")
  }

  useEffect(() => {
    const fetchcrud = async () => {
      const { data, error } = await supabase 
        .from('crud')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
        setDate(data.date)
      }
    } 
    fetchcrud()
  }, [id, navigate]) 

    return title !== null && (
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

        <button>Atualiza dados</button>
       
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}
export default Update