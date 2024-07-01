import React from 'react'
import '../css/App.css'

function Footer() {
  const date = new Date();
  return (
    <div>
        <footer className="footer-component py-3 mt-4">
        <div className="container text-center">
          <p className="text-light mb-0">© {date.getFullYear()} MindMend. All rights reserved.</p>
        </div>
        </footer>
    </div>
  )
}

export default Footer