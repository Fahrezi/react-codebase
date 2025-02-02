import { BrowserRouter as Router, Routes, Route } from 'react-router'
import PrivateRoutes from './PrivateRoutes'
import HomePage from '../pages/HomePage'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<PrivateRoutes children={undefined} />}>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
