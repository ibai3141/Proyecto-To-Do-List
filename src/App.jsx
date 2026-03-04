/**
 * useState	Hook de React que permite crear variables que, al cambiar, actualizan automáticamente la pantalla.
 * useEffect	Hook de React que ejecuta código cuando el componente se carga por primera vez o cuando cambian ciertos valores
 * supabase	Cliente configurado para conectarse a la base de datos Supabase (viene del archivo ./lib/supabase.js)
 */

import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'


function App() {

  /**
   * @param tareas es una variable que se crea y empieza siendo un array vacio pero setTareas 
   * la modifica si se añaden valores y se iran almacenando
   */
  const [tareas, setTareas] = useState([])

  /**
   *@param nuevaTarea es una variable que por defecto esta vacia y setNuevaTarea la ira actualizando
   */
  const [nuevaTarea, setNuevaTarea] = useState('')

  /**
   * carga todas las tareas de la BD al iniciar el programa en la variable "tareas"
   * si no hay tareas en la BD se almacenara un array vacio
   * setTareas(data || []) si hay datos se usa data si no || se usara el []
   */
  useEffect(() => {
    const cargarTareas = async () => {
      const { data } = await supabase.from('tareas').select('*')
      setTareas(data || [])
    }
    cargarTareas()
  }, [])


  /**
   * este metodo revive un valor del formulario que tiene que estar lleno
   * @param data guardara la tarea que se envio
   * si en data se guarda algo entra en el if la funcion setTareas coge todas
   * las tareas que ya habian(...tareas) y añade la nueva tarea (data[0])
   * y se vacia el iinput con la funcion setNuevaTarea
   * @param {*} e evento del formulario (automático al enviar)
   * @returns 
   */
  const añadirTarea = async (e) => {
    e.preventDefault()//evita que el formulario recargue la página.
    if (!nuevaTarea.trim()) return //si el input está vacío (o solo espacios), no hace nada.

    const { data } = await supabase
      .from('tareas')
      .insert([{ description: nuevaTarea }])// insert siempre recibe un array aunque solo sea una cosa
      .select()// devuelve la tarea con su id

    if (data) {
      setTareas([...tareas, data[0]])
      setNuevaTarea('')
    }
  }



  return (
    <div style={{ padding: '20px' }}>
      <h1>Mi Lista de Tareas</h1>

      {/* Campo de texto controlado: su valor es nuevaTarea y cada vez que el usuario escribe, se actualiza nuevaTarea con setNuevaTarea.*/}
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
        {/* Recorre el array tareas y por cada elemento devuelve un <li>*/}
        {tareas.map(tarea => (
          <li key={tarea.id}>
            {tarea.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App