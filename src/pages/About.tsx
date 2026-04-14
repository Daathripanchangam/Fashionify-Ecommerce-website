import React from 'react';

const styles = {
  container: {
    maxWidth: '900px',
    margin: '2rem auto',
    padding: '2rem',
    fontFamily: 'sans-serif',
    lineHeight: 1.6,
    backgroundColor: '#F9FAFB',
    borderRadius: '12px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    marginBottom: '1.5rem',
  },
  h1: {
    fontSize: '2.2rem',
    marginBottom: '1rem',
    color: '#8B5CF6',
    textAlign: 'center',
  },
  h2: {
    marginTop: '1rem',
    fontSize: '1.3rem',
    color: '#1F2937',
  },
  ul: {
    listStyle: 'none',
    paddingLeft: '1rem',
  },
  li: {
    marginBottom: '0.5rem',
  },
  highlight: {
    color: '#F472B6',
    fontWeight: 'bold',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center',
    marginTop: '1rem',
  },
  statBox: {
    flex: 1,
  },
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  reviewBox: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    marginBottom: '1rem',
  },
};

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>About Fashionify</h1>

      {/* Intro */}
      <div style={styles.card}>
        <p>
          <strong>Welcome to <span style={styles.highlight}>Fashionify</span> – Your One-Stop Fashion Destination!</strong>
        </p>
        <p>
          At Fashionify, we bring you the perfect blend of <b>style, comfort, and affordability</b>.
          From trendy outfits to timeless classics, we ensure you always stay ahead in fashion.
        </p>
      </div>

      {/* What We Offer */}
      <div style={styles.card}>
        <h2 style={styles.h2}>✨ What We Offer</h2>
        <ul style={styles.ul}>
          <li style={styles.li}>✔ Trendy collections updated every season</li>
          <li style={styles.li}>✔ Premium quality fabrics</li>
          <li style={styles.li}>✔ Affordable pricing</li>
          <li style={styles.li}>✔ Smooth & secure shopping experience</li>
        </ul>
      </div>

      {/* Why Choose Us */}
      <div style={styles.card}>
        <h2 style={styles.h2}>💜 Why Choose Fashionify?</h2>
        <ul style={styles.ul}>
          <li style={styles.li}>✔ Customer-first approach</li>
          <li style={styles.li}>✔ Fast delivery & easy returns</li>
          <li style={styles.li}>✔ Ethical & sustainable sourcing</li>
        </ul>
      </div>

      {/* Stats Section */}
      <div style={styles.card}>
        <h2 style={styles.h2}>📊 Our Impact</h2>
        <div style={styles.statsContainer}>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>50K+</div>
            <div>Happy Customers</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>10K+</div>
            <div>Orders Delivered</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>4.8⭐</div>
            <div>Customer Rating</div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={styles.card}>
        <h2 style={styles.h2}>⭐ What Our Customers Say</h2>

        <div style={styles.reviewBox}>
          <p>"Absolutely love the quality! Fashionify never disappoints."</p>
          <b>- Priya S.</b>
        </div>

        <div style={styles.reviewBox}>
          <p>"Trendy clothes at affordable prices. Highly recommended!"</p>
          <b>- Rahul K.</b>
        </div>

        <div style={styles.reviewBox}>
          <p>"Fast delivery and amazing customer support!"</p>
          <b>- Anjali M.</b>
        </div>
      </div>

      {/* Mission */}
      <div style={styles.card}>
        <h2 style={styles.h2}>🎯 Our Mission</h2>
        <p>
          To make fashion <b>accessible, affordable, and enjoyable</b> for everyone,
          while promoting sustainability and customer satisfaction.
        </p>
      </div>
    </div>
  );
};

export default About;