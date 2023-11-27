import { useState } from 'react'
import { Button } from './components/Button'
import { Menu } from './components/Menu'
import { Document } from './components/Document'
import { Info, InfoWarning } from './components/Info'
import { Dialog } from './components/Dialog'
import './App.css'

function App() {

  const [create, setCreate] = useState(null);
  const [cv, setCv] = useState(null);
  const [newOpen, setNewOpen] = useState(false)

  function createDocument() {
    setNewOpen(true)
    if (cv) {
      console.log("Warning activated")
      setCreate(<InfoWarning type="new-cv" onAccept={resetCv} onDecline={() => setNewOpen(false)} text="Delete current CV?"/>)
    } else {
      setCreate(<Info onSubmit={buildCv}/>)
    }
  }
  
  function resetCv() {
    setCreate(<Info onSubmit={buildCv}/>)
  }

  

  function buildCv(name) {
     setCv(<Document person={name} />);
     setNewOpen(false);
     setCreate(null);
  }


  return (
    <>
    <Menu menuName='file-menu'>
      <Button buttonType="new" text="New CV" onClick={createDocument} />
      <Button buttonType="load" text="Load CV" />
    </Menu>
    <Dialog dialogType="new-cv-dialog" isOpen={newOpen}>
      {create}
    </Dialog>
      {cv}
    </>
  )
}

export default App
