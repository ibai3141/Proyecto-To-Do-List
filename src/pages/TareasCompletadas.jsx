import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

function TareasCompletadas() {
  const [completadas, setCompletadas] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const cargarCompletadas = async () => {
      const { data } = await supabase
        .from('tareas')
        .select('*')
        .eq('complete', true)
      setCompletadas(data || [])
    }
    cargarCompletadas()
  }, [])

  const eliminarTarea = async (id) =>{
    try {
        await supabase
        .from('tareas')
        .delete()
        .eq('id', id)

        setCompletadas(completadas.filter(c => c.id !== id))

    } catch (error) {
        console.error('Error:', error)

    }

  }

  return (
    <div className="app">
      <h1>Tareas Completadas</h1>
      
      <button onClick={() => navigate('/')} className="boton-secundario">
        ⬅ Volver a Pendientes
      </button>

      {completadas.length === 0 ? (
        <p className="mensaje-vacio">No hay tareas completadas</p>
      ) : (
        <ul className="lista-tareas">
          {completadas.map(tarea => (
            <li key={tarea.id} className="tarea-item completada">
              <span style={{color: '#888' }}>
                {tarea.description}
              </span>
              <button 
                 onClick={() => eliminarTarea(tarea.id)}
                 className="boton-eliminar">
                eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TareasCompletadas