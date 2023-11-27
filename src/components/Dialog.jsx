import "../styles/Dialog.css"

export function Dialog({children, dialogType, isOpen}) {

    const openModel = isOpen ? true : null ;

    return (
        <dialog className={dialogType} open={openModel}>
            {children}
        </dialog>
    )
}