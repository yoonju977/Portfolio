import Hero from './components/Hero'
import Works from './components/Works'
import Terminal from './components/Terminal'
import { ScrollProgress, SideRail } from './components/Chrome'
import { Contact, Endurance, Numbers, Path, Stack } from './components/Sections'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <SideRail />
      <main>
        <Hero />
        <Endurance />
        <Numbers />
        <Works />
        <Stack />
        <Path />
        <Terminal />
      </main>
      <Contact />
    </>
  )
}
