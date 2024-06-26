import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Category from './components/Category/Category'
import SingleProduct from './components/SingleProduct/SingleProduct'
import Newsletter from './components/Footer/Newsletter/Newsletter'
import AppContext from './context/context'
import Login from './components/Login/Login'
import Signin from './components/Register/Signin'
import Contact from './components/Contact/Contact'
import Profile from './components/Profile/Profile'



function App() {

  return (
    <BrowserRouter>
      <AppContext>
          <Header/>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/category/:id' element={<Category/>}></Route>
              <Route path='/product/:id' element={<SingleProduct/>}></Route>
              <Route path='/register' element={<Signin/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/contact' element={<Contact/>}></Route>
              <Route path='/profile' element={<Profile/>}></Route>
            </Routes>
          <Newsletter/>
          <Footer/>
      </AppContext>
    </BrowserRouter>
  )
}

export default App
