import React from 'react'

const Mensaje = ({children, tipo}) => {
  return (
    //Mezclar clase fija con clase dinámica
    <div className={`alerta ${tipo}`}>
        {children}
    </div>
  )
}

export default Mensaje
