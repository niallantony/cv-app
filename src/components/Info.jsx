import { useState } from 'react'
import { Button } from './Button';

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

export function InfoSection({onSubmit,dateInputs,hasTitle}) {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [body, setBody] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({title:title,
                    startDate:startDate,
                    endDate:endDate,
                    body:body});
    }
    const dateFields = () => {
        switch(dateInputs) {
            case 0:
                return;
            case 1:
                return (<label htmlFor='startDate'> Date:
                    <input type='date' id='startDate' onChange={(e) => setStartDate(e.target.value)}/>
                </label>)
            case 2:
                return (<><label htmlFor='startDate'> Start Date:
                            <input type='date' id='startDate' onChange={(e) => setStartDate(e.target.value)}/>
                        </label>
                        <label htmlFor='endDate'> End Date:
                            <input type='date' id='endDate' onChange={(e) => setEndDate(e.target.value)}/>
                        </label></>);
            default:
                return
        }
    }
    const titleField = () => {
        if (hasTitle) {
            return (<label htmlFor='title'>Title: 
                <input type='text' id='title' onChange={(e) => setTitle(e.target.value)}/>
            </label>)
        }
    }
    return (<form className='section-form'>
        {titleField()}
        {dateFields()}
        <label htmlFor='bodyText'>
            <textarea id='bodyText' onChange={(e) => setBody(e.target.value)}/>
        </label>
        <Button buttonType="section-submit" text="Add" onClick={(e) => handleSubmit(e)}/>
    </form>)
}

export function InfoExp({info}) {
    const title = () => {
        if (info.title != '') {
            return (<div>{info.title}</div>)
        } else {
            return;
        };
    };
    const startDate = () => {
        if (info.startDate) {
            return (<div>Started: {info.startDate}</div>)
        };
    }
    const endDate = () => {
        if (info.endDate) {
            return (<div>Finished: {info.endDate}</div>)
        }
    };
    const body = (<div>{info.body}</div>)

    return (<div className="info-pane">
        {title()}
        {startDate()}
        {endDate()}
        {body}
    </div>)
    
}

export function InfoWarning({onAccept,onDecline}) {
    return (<>
                <h2>Discard current CV?</h2>
                <Button buttonType="accept-new" text="OK" onClick={onAccept}/>
                <Button buttonType="cancel-new" text="Cancel" onClick={onDecline}/>
            </>)
}