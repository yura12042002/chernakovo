import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import useLenis from './hooks/useLenis';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import About from './components/About';
import Stats from './components/Stats';
import Crops from './components/Crops';
import Process from './components/Process';
import Gallery from './components/Gallery';
import Advantages from './components/Advantages';
import Geo from './components/Geo';
import Contacts from './components/Contacts';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <AnimatePresence>
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <MarqueeStrip />
        <About />
        <Stats />
        <Crops />
        <Process />
        <Gallery />
        <Advantages />
        <Geo />
        <Contacts />
      </main>

      <Footer />
    </>
  );
}
