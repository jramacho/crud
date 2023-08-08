import supabase from "../config/supabaseClient.js"
import { useEffect,useState } from "react"


//componentes
import CrudCard from "../components/CrudCard.js"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [crud, setcrud] = useState(null)
  const [orderBy, setOrderBy] = useState('date')
  
  const handleDelete = (id) => {
setcrud(oldcrud => {
  return oldcrud.filter(old => old.id !== id)
  
})

  }
  
  useEffect(() => {
    const fetchcrud = async () => {
      const { data, error } = await supabase.from("crud")
      .select()
      .order(orderBy, {ascending: true})

      if (error) {

        setFetchError("Nada encontrado em crud")
        setcrud(null)
        console.log(error)
      }
      if (data) { 
        setcrud(data)
        setFetchError(null)

      }


    }

    fetchcrud()

  }, [orderBy])
  
  
  return (
    <div className="page home">
    {fetchError && (<p>{fetchError}</p>)}
      {crud && (
        <div className="crud">
        <div className="order-by">
            <p>Ordenar por:</p>
            <button onClick={() => setOrderBy('date')}>Data</button>
            <button onClick={() => setOrderBy('title')}>Titulo</button>
            <button onClick={() => setOrderBy('rating')}>Nota</button>
            
          </div>
          <div className="crud-grid">
            {crud.map(crud => (
              <CrudCard key={crud.id} crud={crud} 
              onDelete={handleDelete}/>
            ))}
          </div>
        </div>
      )}
    </div>
  )
  

}

export default Home
