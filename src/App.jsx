import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'


function App() {

  //
  const [tareas, setTareas] = useState([])
  const [nuevaTarea, setNuevaTarea] = useState('')

  // Cargar tareas al iniciar
  useEffect(() => {
    const cargarTareas = async () => {
      const { data } = await supabase.from('tareas').select('*')
      setTareas(data || [])
    }
    cargarTareas()
  }, [])

  // Añadir tarea
  const añadirTarea = async (e) => {
    e.preventDefault()
    if (!nuevaTarea.trim()) return

    const { data } = await supabase
      .from('tareas')
      .insert([{ description: nuevaTarea }])
      .select()

    if (data) {
      setTareas([...tareas, data[0]])
      setNuevaTarea('')
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mi Lista de Tareas</h1>
      
      <form onSubmit={añadirTarea}>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea"
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 20px' }}>
          Añadir
        </button>
      </form>

      <ul style={{ marginTop: '20px' }}>
        {tareas.map(tarea => (
          <li key={tarea.id}>
            {tarea.descripcion}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App