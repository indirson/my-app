
import './App.css'
import Products from './products'
import Cart from './assets/cart'
import { Routes, Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const totalItems = useSelector((state) => state.cart.items.reduce((s, i) => s + i.quantity, 0))
  return (
    <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <Link to="/" style={{textDecoration:'none',color:'inherit'}}><h1>welcome Paradise Nursery</h1></Link>
      <nav>
        <Link to="/cart" style={{marginRight:12}}>Cart ({totalItems})</Link>
      </nav>
    </header>
  )
}

function Home(){
  return (
    <div className="app">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis ratione ut quam deserunt maxime aliquid nulla, dicta minus nihil eveniet provident perferendis sint tempora quo corporis, natus, fuga tenetur molestias!</p>
      <button onClick={() => window.scrollTo({top: 500, behavior: 'smooth'})}>Get Started</button>
      <Products/>
    </div>
  )
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </>
  )
}

export default App
