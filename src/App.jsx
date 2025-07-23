import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// Components
import Navbar from './components/Navbar'

// Pages
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Assignments from './pages/Assignments'
import Admin from './pages/Admin'

function App() {
  return (
    <Router>
      <Navbar />
      <main className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/assignments/:id" element={<Assignments />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
