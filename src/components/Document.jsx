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
    const [sectionOrder, setSectionOrder] = useState([]);
    const [addList, setAddList] = useState(sectionAddList)
    const [sectionList, setSectionList] = useState([])
    const [showAdd, setShowAdd] = useState(false)

    const orderedSections = () => {
        return sectionList.sort((a,b) => sectionOrder.indexOf(a.title) - sectionOrder.indexOf(b.title));
    }

    function addSection(name) {
        const displayed = sectionList.map((section) => section.title)
        displayed.push(name);
        setSectionList([...sectionList, {title: name, id: uuidv4()}]);
        setSectionOrder([...sectionOrder, name])

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
    
    function moveUp(section) {
        const order = [...sectionOrder];
        const currentIndex = order.indexOf(section.title);
        if (currentIndex === 0) return;
        order.splice(currentIndex-1,0,order.splice(currentIndex,1)[0])
        console.log("Moved up, new order: ", order);
        setSectionOrder(order);
    }

    function moveDown(section) {
        const order = [...sectionOrder];
        const currentIndex = order.indexOf(section.title);
        if (currentIndex >= order.length - 1) return;
        order.splice(currentIndex + 1,0, order.splice(currentIndex,1)[0]);
        console.log("Moved down, new order: ", order);
        setSectionOrder(order);
    }

    function deleteSection(toDelete) {
        const newList = sectionList.filter((section) => section.id != toDelete.id)
        const displayed = newList.map((section) => section.title)
        console.log(displayed)
        setAddList(addList.map((item) => {
            if (displayed.includes(item.name)) return {name:item.name, disabled:true}
            return {name:item.name, disabled:false}
        })) 
        setSectionList(newList);
    }


    return (<div className='resume'>
            <h1> {person}'s CV </h1>
            
            {orderedSections().map((section) => {
                return (<Section key={section.id} title={section.title} onUp={() => moveUp(section)}
                            onDown={() => moveDown(section)} onDelete={() => deleteSection(section)}/>)
            })}
            <AddButton buttonType="add" choices={addList} onClick={showMenu} onSelect={addSection} isOpen={showAdd}/>
        </div>)

}