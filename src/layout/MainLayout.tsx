import React from 'react'
import './styles/MainLayout.scoped.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">{children}</div>
  )
}

export default MainLayout
