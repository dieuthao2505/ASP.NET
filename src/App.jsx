import React from 'react';
import Header from './components/Header';
import Admin from './admin/Admin';
import Home from './Home/Home';
import { BrowserRouter as Router, Routes, Route, Link, Outlet  } from 'react-router-dom';
import ProductAdmin from './admin/ProductAdmin';
import CategoryAdmin from './admin/CategoryAdmin';
import UserAdmin from './admin/UserAdmin';
import OrderAdmin from './admin/OrderAdmin';
import ProductAdd from './admin/ProductAdd';
import ProductEdit from './admin/ProductEdit';
import CategoryAdd from './admin/CategoryAdd';
import CategoryEdit from './admin/CategoryEdit';
import OrderAdd from './admin/OrderAdd';
import OrderEdit from './admin/OrderEdit';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Order from './components/Order';
import Wishlist from './components/Wishlist';
import Contact from './components/Contact';


function App() {
  return (
    <Router>
      <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/productdetail/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/products" element={<ProductAdmin />} />
            <Route path="/admin/categories" element={<CategoryAdmin />} />
            <Route path="/admin/users" element={<UserAdmin />} />
            <Route path="/admin/orders" element={<OrderAdmin />} />
            <Route path="/admin/productadd" element={<ProductAdd />} />
            <Route path="/admin/productedit/:id" element={<ProductEdit/>} />
            <Route path="/admin/categoryadd" element={<CategoryAdd />} />
            <Route path="/admin/categoryedit/:id" element={<CategoryEdit />} />
            <Route path="/admin/orderadd" element={<OrderAdd />} />
            <Route path="/admin/orderedit/:id" element={<OrderEdit />} />


          </Routes>
       
      </div>
    </Router>
  );
}

export default App;
