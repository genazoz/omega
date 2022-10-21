import React from "react";
import {Route, Routes} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./layouts/MainLayout";
import {Loader} from "./components/Loader";
import {ToastContainer} from "react-toastify";

const Home = React.lazy(() => import(/* webpackChunkName: "Home" */ "./pages/Home"));
const Card = React.lazy(() => import(/* webpackChunkName: "Card" */ "./pages/Card"));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"));

function App() {
  return (
    <React.Suspense fallback={<Loader/>}>
      <ToastContainer autoClose={2000} />
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/card/:id" element={<Card/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Route>
      </Routes>
    </React.Suspense>
  );
}

export default App;
