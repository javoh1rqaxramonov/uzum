import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLay from "./layout/MainLayout";
import Home from "./components/home";
import ProductDetails from "./components/productDetails";
import Card from './components/Card'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLay>
            <Home />
          </MainLay>
        }
      />
      <Route
        path="/product/:id"
        element={
          <MainLay>
            <ProductDetails />
          </MainLay>
        }
      />
      <Route
        path="/card"
        element={
          <MainLay>
            <Card></Card>
          </MainLay>
        }
      ></Route>
    </Routes>
  );
}

export default App;
