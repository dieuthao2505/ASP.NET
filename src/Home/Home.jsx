import React from "react";
import { Link, Outlet } from 'react-router-dom'; 
import Header from "../components/Header";
import Menu from "../components/Menu";
import Banner from "../components/Banner";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-[#f7fdfa] min-h-screen">
      {/* Header */}
      <Header />
      {/* Menu nhỏ bên trên */}
      <Menu />
      

      {/* Banner */}
      <Banner />
      <ProductList/>
      <Footer />

      {/* Promotion */}
      <section className="text-center p-8 bg-white shadow-lg mx-6 rounded-md">
        {/* <h3 className="text-3xl font-bold mb-2 text-gray-700">TUẦN LỄ THỜI TRANG</h3>
        <p className="text-orange-500 font-semibold mb-4">SALE LỚN MỪNG LỄ - DỌN KHO ĐÓN THU</p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          
        </div> */}
      </section>

      {/* Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        </section>
    </div>
  );
}
const styles ={
  
}
export default Home;
