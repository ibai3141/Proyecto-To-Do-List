import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

function AnadirTarea() {
  
  const [nuevaTarea, setNuevaTarea] = useState('')
  const navigate = useNavigate()

  const añadirTarea = async (e) => {
    e.preventDefault()
    if (!nuevaTarea.trim()) return

    await supabase
      .from('tareas')
      .insert([{ description: nuevaTarea, complete: false }])

    navigate('/')
  }

  return (
    <div className="app">
      <h1>Añadir Nueva Tarea</h1>
      
      <form onSubmit={añadirTarea} className="formulario">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Escribe la tarea..."
          className="input-tarea"
          autoFocus
        />
        <button type="submit" className="boton-añadir">
          Guardar Tarea
        </button>
      </form>

      <button onClick={() => navigate('/')} className="boton-secundario">
        ⬅ Volver
      </button>
    </div>
  )
}

export default AnadirTarea