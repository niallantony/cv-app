import "../styles/Menu.css"

export function Menu({children, menuName}) {
    return (
        <>
            <div className={menuName}>
                {children}
            </div>
        </>
    )
}