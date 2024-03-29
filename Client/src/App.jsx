import React from 'react';
import LoginPage from './Component/Pages/LoginPage';
import ForeGroundPage from './Component/Pages/ForeGroundPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddForm from './Component/AddForm';
import UpdateForm from './Component/UpdateForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <div className='hidden md:block '>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/foreground" element={<ForeGroundPage />} />
            <Route path="/addpage" element={<AddForm />} />
            <Route path="/updatepage/:itemid" element={<UpdateForm />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="dark"
          />
        </Router>
      </div>
      <div className=' w-screen h-screen flex justify-center items-center text-center p-5 md:hidden bg-black text-white '>
        <p className="text-xl">This website is only accessible on desktop.</p>
      </div>
    </>
  );
}

export default App;
