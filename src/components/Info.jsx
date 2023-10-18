import { useState } from 'react'
import { Button } from './Button';

export function Info({onSubmit}) {
    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(name);
    }

    return (<form>
                <label htmlFor='cvName'> Name: 
                    <input type='text' id='cvName' onChange={(e) => setName(e.target.value)}/>
                </label>
                <Button buttonType='create' text='Create' onClick={(e) => handleSubmit(e)} />
            </form>)
}