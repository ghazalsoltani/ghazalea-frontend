import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

function App() {
 return (
  <BrowserRouter>
    <Routes>
      {/* Home page _ Shows all products */}
      <Route path="/" element={<Home />} />

      {/* Product detail page - :id is a URL parameter */}
      <Route path="/product/:id" element={<ProductDetail />} />

    </Routes>
  </BrowserRouter>
 );
}

export default App;