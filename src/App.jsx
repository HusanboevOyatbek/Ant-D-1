import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LayoutAdmin from './components/layout/Layout'
import Teachers from './page/teachers/Teachers'
import Students from './page/students/Students'
import Login from './page/login/Login'

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<LayoutAdmin />}>
          <Route path='teachers' element={<Teachers />} />
          <Route path='students' element={<Students />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App