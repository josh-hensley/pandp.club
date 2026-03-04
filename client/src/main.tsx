import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import { Header, Footer } from './Components'
import { Login, Search, App } from './Pages'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route index element={<App />} />
      <Route path='/login' element={<Login />} />
      <Route path='/search' element={<Search />} />
    </Routes>
    <Footer />
  </BrowserRouter>
)
