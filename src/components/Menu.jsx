import "../styles/Menu.css"

export function Menu({children, menuName}) {
    return (
        <>
            <div className={`${menuName} no-print`}>
                {children}
                <h1 className="header">CV Builder</h1>
            </div>
        </>
    )
}