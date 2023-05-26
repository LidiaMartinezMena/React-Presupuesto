import { useState, useEffect} from 'react'
import Mensaje from './Mensaje'
import CerrarModal from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [mensaje, setMensaje] = useState("")
    const[nombre, setNombre] = useState("")
    const[cantidad, setCantidad] = useState("")
    const[categoria, setCategoria] = useState("")
    const[fecha, setFecha] = useState("")
    const[id, setId] = useState("")

    useEffect (() => {
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
          }

    },[])

    const ocultarModal = () => {
        
        setAnimarModal(false)
        setGastoEditar({})

        setTimeout(() =>{
            setModal(false)
        },500);
    }

    const handleSubmit = e => {
            e.preventDefault();

            if([nombre, cantidad, categoria].includes('') ){
                setMensaje("Todos los campos son obligatorios")
                return;
            }
        setMensaje("");

        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }

  return (
    <div className="modal">
      <div className="cerrar-modal">
            <img 
                src={CerrarModal}
                alt="icono nuevo gasto"
                onClick={ocultarModal}
            />    
      </div>
       {/*Agregamos clases animadas, no estáticas*/}
       <form 
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? "animar":"cerrar"}`}>
                <legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>

                    {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                    <div className='campo'>
                        <label htmlFor='nombre'>Nombre del gasto</label>
                        <input 
                            id="nombre"
                            type="text"
                            placeholder='Añade el nombre del gasto'
                            value={nombre}
                            onChange={ e => setNombre(e.target.value)}
                        />
                        <label htmlFor='cantidad'>Cantidad</label>
                        <input 
                            id="cantidad"
                            type="number"
                            placeholder='Añade la cantidad. Ej:500'
                            value={cantidad}
                            onChange={ e => setCantidad(Number(e.target.value))}
                        />
                    </div>
                    <div className='campo'>
                        <label htmlFor='categoría'>Categoría</label>

                        <select
                            id="categoria"
                            value={categoria}
                            onChange={ e => setCategoria(e.target.value)}
                        >
                            <option value=""> Seleccione una categoría</option>
                            <option value="ahorro"> Ahorro</option>
                            <option value="comida"> Comida</option>
                            <option value="casa"> Casa</option>
                            <option value="ocio"> Ocio</option>
                            <option value="gastos_varios"> Gastos varios</option>
                            <option value="salud"> Salud</option>
                            <option value="subscripciones"> Subscripciones</option>

                        </select>
                    </div>
                    <input 
                        type="submit"
                        value={gastoEditar.nombre ? 'Guardar cambios' : 'Añadir gasto'}
                    />
            </form>
    </div>
  )
}

export default Modal
