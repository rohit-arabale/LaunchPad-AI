import React, { use } from 'react'
import { useAuth } from './useAuth.js'
import { Navigate } from 'react-router'
import { Loader } from 'lucide-react'

function Protected({children}) {
    const{loading,user} = useAuth();

    if (loading) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center gap-4">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <p className="text-lg font-medium text-foreground animate-pulse">
          Loading...
        </p>
      </main>
    );
  }
  if(!user){
    return <Navigate to="/login" />;
  }
  return children;
}

export default Protected