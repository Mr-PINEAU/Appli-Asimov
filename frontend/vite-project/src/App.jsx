import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Dashboard from '../../pages/Dashboard'
import EleveProfile from '../../pages/EleveProfile'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/eleve/:id" element={<EleveProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
