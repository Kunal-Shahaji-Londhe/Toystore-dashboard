import Layout from './components/Layout/Layout'
import { BrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home'

function App() {

  return (
    <>
    <BrowserRouter>
      <Layout />            
    </BrowserRouter> 
    </>
  )
}

export default App
