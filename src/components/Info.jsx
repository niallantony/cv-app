import { useState } from 'react'
import { Button } from './Button';
import "../styles/Info.css";
import DeleteSvg from "../assets/delete.svg";
import EditSvg from "../assets/edit.svg"


export function Info({onSubmit, prevValues = null}) {
    const [name, setName] = useState(prevValues ? prevValues.name :'');
    const [phone, setPhone] = useState(prevValues ? prevValues.phone : '');
    const [email, setEmail] = useState(prevValues ? prevValues.email : '');
    const [website, setWebsite] = useState(prevValues ? prevValues.website : '');
    const [inputWarning, setInputWarning] = useState(null);

    function handleSubmit(e) {
        console.log("Previous Values: ",prevValues);
        e.preventDefault();
        if (name === '') {
            setInputWarning('Please Input Name...');
            return;
        } 
        onSubmit({
            name:name,
            phone:phone,
            email:email,
            website:website,
        });
    }

    return (
                <form className="info-form">
                    <label htmlFor='cvName'> Name:
                        <input type='text' placeholder={inputWarning ? inputWarning : ''} required={true} id='cvName' value={name} onChange={(e) => setName(e.target.value)}/>

                    </label>
                    <label htmlFor="cvPhone"> Phone:
                        <input type="input" id='cvPhone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </label>
                    <label htmlFor="cvMail"> eMail: 
                        <input type="email" id="cvMail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label htmlFor="cvWebsite"> Website: 
                        <input type="text" id="cvWebsite" value={website} onChange={(e) => setWebsite(e.target.value)}/>                   
                    </label>
                    <Button buttonType='create' text='submit' onClick={(e) => handleSubmit(e)} />
                </form>
)
}

export function InfoSection({onSubmit,dateInputs,hasTitle,onCancel,inputValue}) {
    const [title, setTitle] = useState(inputValue ? inputValue.title : '');
    const [startDate, setStartDate] = useState(inputValue ? inputValue.startDate : '');
    const [endDate, setEndDate] = useState(inputValue ? inputValue.endDate : '');
    const [body, setBody] = useState(inputValue ? inputValue.body : '');
 
    function handleSubmit(e) {
        e.preventDefault();
        console.log("Body: ",body);
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
    const bodyTransform = () => {
        const splitBody = info.body.split('\n');
        return (<div className='body-text'>{splitBody.map((para) =>(<>{para}<br /></>))}</div>)
    }
    const title = () => {
        if (info.title != '') {
            return (<div className='title'>{info.title}</div>)
        } else {
            return;
        }
    };
    const startDate = () => {
        if (info.startDate) {
            return (<div className='start'>Started: {info.startDate}</div>)
        }
    }
    const editSection = () => {
        onEdit(info);
    }
    const endDate = () => {
        if (info.endDate) {
            return (<div className='finished'>Finished: {info.endDate}</div>)
        }
    };

    return (<div className="info-pane">
        {confirm}
        {title()}
        {startDate()}
        {endDate()}
        {bodyTransform()}
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