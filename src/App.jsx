import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import './App.css'  // <-- ESTO ES CRÍTICO

function App() {
  const [tareas, setTareas] = useState([])
  const [nuevaTarea, setNuevaTarea] = useState('')
  const [cargando, setCargando] = useState(true)

  const cargarTareas = async () => {
    setCargando(true)
    const { data, error } = await supabase
      .from('tareas')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error al cargar tareas:', error)
    } else {
      setTareas(data || [])
    }
    setCargando(false)
  }

  const añadirTarea = async (e) => {
    e.preventDefault()
    
    if (nuevaTarea.trim() === '') return

    const { data, error } = await supabase
      .from('tareas')
      .insert([{ descripcion: nuevaTarea, completada: false }])
      .select()

    if (error) {
      console.error('Error al añadir tarea:', error)
    } else {
      setTareas([data[0], ...tareas])
      setNuevaTarea('')
    }
  }

  const toggleCompletada = async (id, completadaActual) => {
    const { error } = await supabase
      .from('tareas')
      .update({ completada: !completadaActual })
      .eq('id', id)

    if (error) {
      console.error('Error al actualizar tarea:', error)
    } else {
      setTareas(tareas.map(tarea => 
        tarea.id === id 
          ? { ...tarea, completada: !completadaActual }
          : tarea
      ))
    }
  }

  useEffect(() => {
    cargarTareas()
  }, [])

  return (
    <div className="app">
      <h1>Mi Lista de Tareas</h1>
      
      <form onSubmit={añadirTarea} className="formulario">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Escribe una nueva tarea..."
          className="input-tarea"
        />
        <button type="submit" className="boton-añadir">
          Añadir
        </button>
      </form>

      {cargando ? (
        <p className="cargando">Cargando tareas...</p>
      ) : (
        <ul className="lista-tareas">
          {tareas.map(tarea => (
            <li key={tarea.id} className="tarea-item">
              <input
                type="checkbox"
                checked={tarea.completada}
                onChange={() => toggleCompletada(tarea.id, tarea.completada)}
              />
              <span style={{
                textDecoration: tarea.completada ? 'line-through' : 'none'
              }}>
                {tarea.descripcion}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App