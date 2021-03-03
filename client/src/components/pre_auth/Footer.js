import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <>
            <footer>
                <nav className="flex-row">
                    <p><Link to="/privacy">Privacy Policy</Link></p>
                    <p>© 2021 Zaid Allam</p>
                    <p><Link to="/terms">Terms and Conditions</Link></p>
                </nav>
            </footer>
        </>
    )
}