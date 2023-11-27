import "../styles/Button.css";
import AddSvg from "../assets/add.svg";
import {useRef} from "react";

export function Button({buttonType,text,onClick,disabled = false}) {
    return (
        <button className={buttonType} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
} 

export function AddButton({buttonType,onClick,onSelect,choices,isOpen}) {

    function returnChoice(choice) {
        console.log( "Creating ", choice);
        onSelect(choice);
    }

    const menuPan = useRef(null);
    const dropdownClasses = isOpen ? 'open' : 'closed' ;
    
    const dropDownChoices = choices.map((choice) => {
        return (<li key={choice.name}><Button buttonType="dropdown-option" onClick={() => returnChoice(choice.name)} text={choice.name} disabled={choice.disabled}/></li>)
    })

    const closeOpenMenus = (e) => {
        if(menuPan.current && isOpen && !menuPan.current.contains(e.target)) {
            onClick();
        }
    }
    document.addEventListener('mousedown', closeOpenMenus)

    return (
        <div className={`add-button-container ${buttonType}`}>
            <button className={buttonType} onClick={onClick}>
                <img src={AddSvg} alt="Add Button"/>
            </button>
            <div ref={menuPan} className={`dropdown ${dropdownClasses}`} display={isOpen}>
                <ul>
                    {dropDownChoices}
                </ul>
            </div>
        </div>
    )
}