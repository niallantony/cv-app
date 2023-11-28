import { useState } from "react"
import { Button } from "./Button";
import { InfoWarning, InfoSection, InfoExp } from './Info';
import "../styles/Section.css"
import AddSvg from "../assets/add.svg";
import DeleteSvg from "../assets/delete.svg";
import UpSvg from "../assets/up.svg"
import DownSvg from "../assets/down.svg"
import {v4 as uuidv4} from 'uuid';

export function Section({title, onUp, onDown, onDelete}) {
    const [infoList, setInfoList] = useState([]);
    const [infoForm, setInfoForm] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const dateInputs = title === 'Education' || title === "Work" || title === "Projects" ? 2 : title === "Awards" ? 1 : 0 ;
    const hasTitle = title === "Personal" ? false : true ; 

    function buildSection(details) {
        setInfoList([...infoList, {id: uuidv4(), title: details.title, startDate: details.startDate, endDate: details.endDate, body: details.body}])
        setInfoForm(null);
        setFormOpen(false);
        console.log(infoList);
    }

    const deleteConfirm = () => {
        if (!confirm) {
            setConfirm(<InfoWarning type="warning" text="Delete this Section?" onAccept={onDelete} onDecline={() => setConfirm(null)}/>)
        }
    }

    function editSubmit(toDelete, edited) {
        const editEntry = {
            id: uuidv4(),
            title: edited.title,
            startDate: edited.startDate,
            endDate: edited.endDate,
            body:edited.body,
            }
        const tempList = infoList.filter((info) => info.id != toDelete.id);
        const newList = tempList.length ? [...tempList, editEntry] : [editEntry]
        console.log("Temp : ", tempList, "new: " , newList);
        setInfoList(newList);
    }

    function closeForm() {
        setInfoForm(null);
        setFormOpen(false);
    }
    
    function changeDateFormat(date) {
        return Number(date.split('-').join(''));
    }

    function sortDates() {
        return infoList.sort((a,b) => changeDateFormat(a.startDate) - changeDateFormat(b.startDate));
    }

    function deleteSection(toDelete) {
        setInfoList(infoList.filter((info) => info.id != toDelete))
    }
    
    function closeEdit(cancelled) {
        cancelled.editing = false;
        const tempList = infoList.filter((info) => info.id != cancelled.id);
        const newList = tempList.length ? [...tempList, cancelled] : [cancelled] ;
        setInfoList(newList);
    }

    function editInfo(toEdit) {
        toEdit.editing = true;
        const tempList = infoList.filter((info) => info.id != toEdit.id);
        const newList = tempList.length ? [...tempList, toEdit] : [toEdit] ;
        setInfoList(newList);        
    }

    function decideInfoForm(info) {
        if (!info.editing) {
            return <InfoExp key={info.id} info={info} onDelete={() => deleteSection(info.id)} onEdit={() => editInfo(info)}/>
        } else {
            return <InfoSection key={info.id} onSubmit={(newInfo) => editSubmit(info,newInfo)} onCancel={() => closeEdit(info)} dateInputs={dateInputs} hasTitle={hasTitle} inputValue={info}/>
        }
    }
    
    function createSubSection() {
        setFormOpen(formOpen ? false : true);
        console.log("Creating SubSection")
        if (!formOpen) {
            setInfoForm(<InfoSection onSubmit={buildSection} onCancel={closeForm} dateInputs={dateInputs} hasTitle={hasTitle} inputValue={null}></InfoSection>)
        } 
    }

    return (<div className="section">
                <h2>{title}</h2>
                <Button buttonType='section-delete' text={<img src={DeleteSvg} alt="Delete Button"/>} onClick={deleteConfirm} />
                <Button buttonType='section-up' text={<img src={UpSvg} alt="Move Up Section Button"/>} onClick={onUp} />
                <Button buttonType='section-down' text={<img src={DownSvg} alt="Move Down Section Button"/>} onClick={onDown} />
                {confirm}
                {sortDates(infoList).map((info) => decideInfoForm(info))}
                {infoForm}
                <Button buttonType='section-add' text={(<img src={AddSvg} alt="Add Button"/>)} onClick={createSubSection} />
            </div>)
}