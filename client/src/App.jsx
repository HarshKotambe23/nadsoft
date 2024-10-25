import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
const Home = lazy(() => import("./components/Home"))
const Marks = lazy(() => import("./components/Marsk"))
const Subject = lazy(() => import("./components/Subject"))
import Navbar from './components/Navbar'

const App = () => {
  return <>
    <ToastContainer />
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Suspense fallback={() => <p>Please Wait</p>}>
          <Home />
        </Suspense>} />

        <Route path='/subject' element={<Suspense fallback={() => <p>Please Wait</p>}>
          <Subject />
        </Suspense>} />
        <Route path='/marks' element={<Suspense fallback={() => <p>Please Wait</p>}>
          <Marks />
        </Suspense>} />
      </Routes>
    </BrowserRouter>

  </>
}

export default App