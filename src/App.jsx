import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListaPendientes from './pages/ListaPendientes'
import AnadirTarea from './pages/AnadirTarea'    
import TareasCompletadas from './pages/TareasCompletadas'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaPendientes />} />
        <Route path="/anadir" element={<AnadirTarea />} />
        <Route path="/completadas" element={<TareasCompletadas />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App