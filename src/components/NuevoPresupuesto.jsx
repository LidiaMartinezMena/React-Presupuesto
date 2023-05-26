import {useState} from 'react'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState('');

    //Hacer una función para que compruebe que no escribamos letras o negativos en el input
const handlePresupuesto = (e) => {
    e.preventDefault();
    //Los inputs siempre dan strings, hay que añadir number para que te dé un número
    if(!presupuesto || presupuesto <0){
        setMensaje("No es un presupuesto válido")

        //Añadiendo el return no se ejecutan las siguientes líneas
        return
    }
    setMensaje("");
    setIsValidPresupuesto(true);
}

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      
      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'>
            <label>
                Definir presupuesto
            </label>
            <input 
            className='nuevo-presupuesto'
            type="number"
            placeholder='Añade tu presupuesto inicial'
            value={presupuesto}
            //Para que lo que se escriba en el input se vaya agregando a la variable de setPresupuesto
            onChange={ e => setPresupuesto(Number(e.target.value))}
            />
        </div>
        <input 
            type="submit" 
            value="Añadir presupuesto"
        />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto
