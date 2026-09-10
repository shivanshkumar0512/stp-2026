import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AIChat from './components/AIChat/AIChat'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <AIChat />
    </>
  )
}

export default Layout