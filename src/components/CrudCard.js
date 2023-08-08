import supabase from "../config/supabaseClient"
import { Link } from 'react-router-dom'
const CrudCard = ({ crud, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('crud')
      .delete()
      .eq('id', crud.id)
      .select()
      

    if (error) {
      console.log(error)
    }
    if (data) {
      //console.log(data)
      onDelete(crud.id)
    }
  }
    return (

        <div className="crud-card">
            <h3>{crud.title}</h3>
            <p>{crud.method}</p>
            <p>{crud.date}</p>
            <div className="rating">{crud.rating}</div>
            <div className="buttons">
        <Link to={"/" + crud.id}>
        <i className="material-icons">edit</i>
        </Link>
        <Link to={"/"}><i className="material-icons" onClick={handleDelete}>delete</i></Link>
        
      </div>
    </div>
  )
}
export default CrudCard