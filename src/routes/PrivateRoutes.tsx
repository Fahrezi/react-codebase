import React, { useState } from 'react'
import { Navigate } from 'react-router';

interface PrivateRoutesProps {
  children: React.ReactNode;
}

function PrivateRoutes({ children }: PrivateRoutesProps) {
  const [isAutheticated, setIsAutheticated] = useState(false);

  if (!isAutheticated) {
    return <Navigate to="/login" />
  }

  return (
    <>{children}</>
  )
}

export default PrivateRoutes