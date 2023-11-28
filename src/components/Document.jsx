import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { AddButton, Button } from "./Button"
import { Section } from './Section';
import { Info } from './Info';
import EditSvg from '../assets/edit.svg'

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
    const [addList, setAddList] = useState(sectionAddList);
    const [sectionList, setSectionList] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [details, setDetails] = useState(person);
    const [editPane, setEditPane] = useState(null);

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

    function editDetails() {
        setEditPane(<Info onSubmit={(details) => submitEdit(details)} prevValues={details} />)
    }

    function submitEdit(details) {
        setDetails(details);
        setEditPane(null);
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

    function buildDetails() {
        const completedDetails = [];
        console.log(details);
        Object.keys(details).forEach((detail) => {
            if (details[detail] != '' && detail !== 'name') completedDetails.push(detail);
        }) 
        return completedDetails;
    }

    return (<div className='resume'>
            <h1> {details.name}</h1>
            <Button buttonType="update-details" text={<img src={EditSvg} alt="Edit Details Button"/>} onClick={editDetails} />
            {buildDetails().map((detail) => {
                return (<h3 key={uuidv4()}>{detail} : {details[detail]}</h3>)
            })}
            {editPane}
            {orderedSections().map((section) => {
                return (<Section key={section.id} title={section.title} onUp={() => moveUp(section)}
                            onDown={() => moveDown(section)} onDelete={() => deleteSection(section)}/>)
            })}
            <AddButton buttonType="add" choices={addList} onClick={showMenu} onSelect={addSection} isOpen={showAdd}/>
        </div>)

}