import { useState } from 'react'
import { Button } from './Button';
import "../styles/Info.css";
import DeleteSvg from "../assets/delete.svg";
import EditSvg from "../assets/edit.svg"


export function Info({onSubmit}) {
    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(name);
    }

    return (
                <form className="info-form">
                    <label htmlFor='cvName'> Name:
                        <input type='text' id='cvName' onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <Button buttonType='create' text='Create' onClick={(e) => handleSubmit(e)} />
                </form>
)
}

export function InfoSection({onSubmit,dateInputs,hasTitle,onCancel, inputValue}) {
    const [title, setTitle] = useState(inputValue ? inputValue.title : '');
    const [startDate, setStartDate] = useState(inputValue ? inputValue.startDate : '');
    const [endDate, setEndDate] = useState(inputValue ? inputValue.endDate : '');
    const [body, setBody] = useState(inputValue ? inputValue.body : '');
    const [initialise, setInitialise] = useState(true);    
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({title:title,
                    startDate:startDate,
                    endDate:endDate,
                    body:body});
    }
    const buildFields = () => {
       return  (<>
                    {titleField(title)}
                    {dateFields(startDate, endDate)}
                    <label className='body-in' htmlFor='bodyText'>
                        <textarea value={body} id='bodyText' rows="5" onChange={(e) => setBody(e.target.value)}/>
                    </label>
                </>)
    }

    const dateFields = (startValue, endValue) => {
        switch(dateInputs) {
            case 0:
                return;
            case 1:
                return (<label className='start-in' htmlFor='startDate'> Date:
                    <input type='date' value={startValue} id='startDate' onChange={(e) => setStartDate(e.target.value)}/>
                </label>)
            case 2:
                return (<><label className='start-in' htmlFor='startDate'> Start Date:
                            <input type='date' value={startValue} id='startDate' onChange={(e) => setStartDate(e.target.value)}/>
                        </label>
                        <label className='end-in' htmlFor='endDate'> End Date:
                            <input type='date' value={endValue} id='endDate' onChange={(e) => setEndDate(e.target.value)}/>
                        </label></>);
            default:
                return
        }
    }
    const titleField = (title) => {
        if (hasTitle) {
            return (<label className='title-in' htmlFor='title'>Title: 
                <input type='text' value={title} id='title' onChange={(e) => setTitle(e.target.value)}/>
            </label>)
        }
    }
    const handleCancel = (e) => {
        e.preventDefault();
        onCancel();
    }
    return (<form className='section-form'>
        {buildFields()}
        <Button buttonType="section-submit" text="Add" onClick={(e) => handleSubmit(e)}/>
        <Button buttonType="section-cancle" text="Cancel" onClick={(e) => handleCancel(e)}/>
    </form>)
}

export function InfoExp({info, onDelete, onEdit}) {
    const [confirm, setConfirm] = useState(null);

    const deleteConfirm = () => {
        if (!confirm) {
            setConfirm(<InfoWarning type="warning" text="Delete this Info?" onAccept={onDelete} onDecline={() => setConfirm(null)}/>)
        }
    }
    const title = () => {
        if (info.title != '') {
            return (<div className='title'>{info.title}</div>)
        } else {
            return;
        };
    };
    const startDate = () => {
        if (info.startDate) {
            return (<div className='start'>Started: {info.startDate}</div>)
        };
    }
    const editSection = () => {
        onEdit(info);
    }
    const endDate = () => {
        if (info.endDate) {
            return (<div className='finished'>Finished: {info.endDate}</div>)
        }
    };
    const body = (<div className="body-text">{info.body}</div>)

    return (<div className="info-pane">
        {confirm}
        {title()}
        {startDate()}
        {endDate()}
        {body}
        <button className="delete-info" onClick={deleteConfirm}>
            <img src={DeleteSvg} alt="Delete Button" />
        </button>
        <button className="edit-info" onClick={editSection}>
            <img src={EditSvg} alt="Edit Button" />
        </button>
    </div>)
    
}

export function InfoWarning({onAccept,onDecline,text,type}) {
    return (<div className={type}>
                <h2>{text}</h2>
                <Button buttonType="accept-new" text="OK" onClick={onAccept}/>
                <Button buttonType="cancel-new" text="Cancel" onClick={onDecline}/>
            </div>)
}