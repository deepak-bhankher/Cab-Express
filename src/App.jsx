import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Service from './Pages/Service'
import Pricing from './Pages/Pricing'
import Faq from './Pages/Faq'
import Contact from './Pages/Contact'
import Footer from './Pages/Footer'

const App = () => {
  return (
   <>
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/services' element={<Service/>}/>
    <Route path='/pricing' element={<Pricing/>}/>
    <Route path='/faq' element={<Faq/>}/>
    <Route path='/contact'  element={<Contact/>}/>

   </Routes>
   <Footer/>
   </BrowserRouter>
   </>
  )
}

export default App
