import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { AddButton } from "./Button"
import { Section } from './Section';

import "../styles/Document.css"

export function Document({person}) {
    const sectionAddList = [
            {name:"Education", disabled:false},
            {name:"Work", disabled:false},
            {name:"Projects", disabled:false},
            {name:"Awards", disabled:false},
            {name:"Personal", disabled:false},
        ]

    const [addList, setAddList] = useState(sectionAddList)
    const [sectionList, setSectionList] = useState([])
    const [showAdd, setShowAdd] = useState(false)


    function addSection(name) {
        const displayed = sectionList.map((section) => section.title)
        displayed.push(name);
        setSectionList([...sectionList, {title: name, id: uuidv4()}]);

        // Update the list to disable already displayed sections
        setAddList(addList.map((item) => {
            if (displayed.includes(item.name)) return {name:item.name, disabled:true}
            return item
        }))
        setShowAdd(false);
    }

    function showMenu() {
        setShowAdd(showAdd ? false : true);
    }


    return (<div className='resume'>
            <h1> {person}'s CV </h1>
            {sectionList.map((section) => {
                return (<Section key={section.id} title={section.title} />)
            })}
            <AddButton buttonType="add" choices={addList} onClick={showMenu} onSelect={addSection} isOpen={showAdd}/>
        </div>)

}