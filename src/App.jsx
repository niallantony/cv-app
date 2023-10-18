import { useState } from 'react'
import { Button } from './components/Button'
import { Menu } from './components/Menu'
import { Document } from './components/Document'
import { Info } from './components/Info'
import './App.css'

function App() {

  const [create, setCreate] = useState(null);
  const [cv, setCv] = useState(null);

  function createDocument() {
    setCreate(<Info onSubmit={buildCv}/>)
  }

  function buildCv(name) {
     setCv(<Document person={name} />);
     setCreate(null);
  }

  return (
    <>
    <Menu menuName='file-menu'>
      <Button buttonType="new" text="New CV" onClick={createDocument} />
      <Button buttonType="load" text="Load CV" />
      {create}
      {cv}
    </Menu>
    </>
  )
}

export default App
