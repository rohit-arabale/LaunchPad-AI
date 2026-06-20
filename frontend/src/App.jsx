import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import { AuthProvider } from "./features/auth/auth.context";
import Protected from "./features/auth/Protected.jsx";

import Landing from "./features/landing/Landing.jsx";
import Home from "./features/interview/Home.jsx";
import InterviewResult from "./features/interview/InterviewResult.jsx";
import { InterviewProvider } from "./features/interview/interview.context.jsx";
import ViewReports from "./features/interview/ViewReports.jsx";
import {Toaster} from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster/>
    <AuthProvider>
      
        {/* ── Global page border frame ── */}
        <div className="fixed inset-3 border border-white/10 rounded-2xl pointer-events-none z-[9999]" />
      <InterviewProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={
          <Protected>
           <Home/>
          </Protected>
        } />
        <Route path="/interview/reports" element={
          <Protected>
            <ViewReports />
          </Protected>
        } />
        <Route path="/interview/:interviewId" element={
          <Protected>
            <InterviewResult />
          </Protected>
        } />
      </Routes>

      </InterviewProvider>
    </AuthProvider>
 </>
  );
}

export default App;
