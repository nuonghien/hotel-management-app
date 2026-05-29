import { Routes, Route } from 'react-router-dom'
import RoomsAdmin from './pages/admin/RoomsAdmin'
import BookingAdmin from './pages/admin/BookingAdmin'
import CategoriesAdmin from './pages/admin/CategoriesAdmin'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>Register</h1>} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="rooms" element={<RoomsAdmin />} />
          <Route path="categories" element={<CategoriesAdmin />} />
          <Route path="bookings" element={<BookingAdmin />} />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App