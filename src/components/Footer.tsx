import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ textAlign: 'center', padding: '1rem', background: '#f4f4f4', marginTop: '2rem' }}>
      &copy; {currentYear} <strong>Fashionify❤️</strong> – Destination for all fashion needs
    </footer>
  );
};

export default Footer;
