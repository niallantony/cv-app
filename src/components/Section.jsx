import { useState } from "react"
import { Button } from "./Button";
import { InfoSection, InfoExp } from './Info';
import "../styles/Section.css"
import AddSvg from "../assets/add.svg";
import {v4 as uuidv4} from 'uuid';

export function Section({title}) {
    const [infoList, setInfoList] = useState([]);
    const [infoForm, setInfoForm] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const dateInputs = title === 'Education' || title === "Work" || title === "Projects" ? 2 : title === "Awards" ? 1 : 0 ;
    const hasTitle = title === "Personal" ? false : true ; 
    function buildSection(details) {
        setInfoList([...infoList, {id: uuidv4(), title: details.title, startDate: details.startDate, endDate: details.endDate, body: details.body}])
        setFormOpen(false);
        setInfoForm(null);
        console.log("Created: ", infoList)
    }
    function createSubSection() {
        setFormOpen(formOpen ? false : true);
        console.log("Creating SubSection")
        if (formOpen) {
            setInfoForm(<InfoSection onSubmit={buildSection} dateInputs={dateInputs} hasTitle={hasTitle}></InfoSection>)
        } 
    }

    return (<div className="section">
                <h2>{title}</h2>
                {infoList.map((info) => 
                    <InfoExp key={info.id} info={info}/>)}
                {infoForm}
                <Button buttonType='section-add' text={(<img src={AddSvg} alt="Add Button"/>)} onClick={createSubSection} />
            </div>)
}