import  {useState, useEffect}  from 'react'
import axios from 'axios'
import blogServices from './services/blogs'



const App = () => {

  const [blogs, setBlog] = useState([])
  const [newAutor, setNewAutor] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [newUrl, setNewUrl] = useState ("")


  //cargar todo
  const hook = () => {
    blogServices
    .getAll()
    .then(returnedBlog => {setBlog(returnedBlog)})
  }
  useEffect(hook,[])



  //CREAR UN NUEVO
  const addBlog = (event) => {
    event.preventDefault()
    
    const id = blogs.length + 1
    const newObject = {
      id: String(id),
      autor: newAutor,
      title: newTitle,
      url: newUrl,
      votes: 0 ,
    }

    blogServices
     .create(newObject)
     .then(returnedBlog => {
        setBlog(blogs.concat(returnedBlog))
        setNewAutor('')
        setNewTitle('')
        setNewUrl('')
     })
  }



  //ELIMINAR

  const eliminar = (id) => {
    blogServices
      .deleteObject(id)
      .then(returnedBlog => {
      blogServices
        .getAll()
        .then(returnedBlog => setBlog(returnedBlog))
       })
       
  }


  //update votos

  const addVote = (id) => {
    const blog = blogs.find(blog => blog.id === id )

    const n = blog.votes + 1
    const changeBlog =  {...blog, votes: Number(n)}

    blogServices
      .update(id,changeBlog)
      .then(response => {
        setBlog(blogs.map(blog => blog.id !== id ? blog : response))
      })
  }


  const handleAutorChange = (event) => {
    setNewAutor(event.target.value)
  }
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)

  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)

  }
  

  return(

    <div>
      <form onSubmit={addBlog} action="">
        <div>Autor: <input value={newAutor} onChange={handleAutorChange} type="text" /></div>
        <div>Titulo: <input value={newTitle} onChange={handleTitleChange} type="text" /></div>
        <div>Url: <input value={newUrl} onChange={handleUrlChange} type="text" /></div>
        <button>agregar</button>
      </form>

      {blogs.map(res => 
        <List 
          key={res.id} blog={res} eliminar={()=>eliminar(res.id)} vote={()=>addVote(res.id)}
        />
      )}
    </div>

  )
}



const List = (props) => {
  return(
    <div>
      <h2>{props.blog.id}</h2>

      <h2>{props.blog.autor}</h2>
      <h4>{props.blog.title}</h4>
      <h4>{props.blog.url}</h4>
      <h5>ESTE BLOG TIENE:  {props.blog.votes} Votos</h5>
      <button onClick={props.vote}>votar</button> <button onClick={props.eliminar}>Delete</button>
    </div>
    
  )
}

export default App
