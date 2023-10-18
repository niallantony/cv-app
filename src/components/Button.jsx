import "../styles/Button.css";

export function Button({buttonType,text,onClick}) {
    return (
        <button className={buttonType} onClick={onClick}>
            {text}
        </button>
    )
} 