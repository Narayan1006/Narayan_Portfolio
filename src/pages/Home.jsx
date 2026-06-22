import Hero from '../components/Hero'
import Beginning from '../components/Beginning'
import Foundations from '../components/Foundations'
import Projects from '../components/Projects'
import Education from '../components/Education'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

/**
 * Home page — assembles all sections in order.
 * Sections are self-contained; layout responsibility lives here.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Beginning />
      <Foundations />
      <Projects />
      <Education />
      <Experience />
      <Contact />
      <Footer />
    </>
  )
}
