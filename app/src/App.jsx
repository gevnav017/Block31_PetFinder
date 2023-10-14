import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Pets from './components/Pets'

function App() {

  return (
    <>
      <ul style={{ display:"flex", justifyContent:"center", listStyleType:"none" }}>
        <li style={{ margin:"10px" }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ margin:"10px" }}>
          <Link to="/pets">Pets</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets/*" element={<Pets />} />
      </Routes>
    </>
  )
}

export default App
