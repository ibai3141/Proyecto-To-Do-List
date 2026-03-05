import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

function ListaPendientes() {
  const [tareas, setTareas] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const cargarTareas = async () => {
      const { data } = await supabase
        .from('tareas')
        .select('*')
        .eq('complete', false)
      setTareas(data || [])
    }
    cargarTareas()
  }, [])

  const completarTarea = async (id) => {
    try {
      await supabase
        .from('tareas')
        .update({ complete: true })
        .eq('id', id)

      setTareas(tareas.filter(t => t.id !== id))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="app">
      <h1>Tareas Pendientes</h1>
      
      <div className="botones-navegacion">
        <button onClick={() => navigate('/anadir')} className="boton-nav">
          ➕ Añadir Tarea
        </button>
        <button onClick={() => navigate('/completadas')} className="boton-nav">
          ✅ Ver Completadas
        </button>
      </div>

      <ul className="lista-tareas">
        {tareas.map(tarea => (
          <li key={tarea.id} className="tarea-item">
            <span>{tarea.description}</span>
            <button
              onClick={() => completarTarea(tarea.id)}
              className="boton-completar"
            >
              Completar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaPendientes