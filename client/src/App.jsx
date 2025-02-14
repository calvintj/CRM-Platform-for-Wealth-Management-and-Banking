import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/LoginPage.jsx'
import Overview from './pages/OverviewPage.jsx'
import CustomerDetails from './pages/CustomerDetailsPage.jsx'
import TaskManager from './pages/TaskManagerPage.jsx'
import News from './pages/NewsPage.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/customer-details" element={<CustomerDetails />} />
        <Route path="/task-manager" element={<TaskManager />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </>
  )
}

export default App
