import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'




function App() {
 //Buscar primer en local storage si tenemos guardado un presupuesto
  const[presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );


  const[isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  //Registrar una ventana modal:
  const[modal, setModal] = useState(false);
  const[animarModal, setAnimarModal] = useState(false);

  //Pasar el objeto gasto desde el compuesto: Modal.JSX al APP.JSX
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);
  

  //Identificar y guardar el gasto que pulsamos en editar. Se guarda un objeto
  const [gastoEditar, setGastoEditar] = useState({});

  //Definir un nuevo State para los filtros
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);


  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
        setModal(true)
        setTimeout(() => {
          setAnimarModal(true)
        },500);
    }
  },[gastoEditar])

  //Almacenar los datos en Local Storage, va a ejecutarse cuando "presupuesto" cambie
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  },[presupuesto])

//Almacenar los datos en Local Storage, va a ejecutarse cuando "gastos" cambie
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  },[gastos])

// Actúa cuando cambia filtro:
useEffect (() => {
  if(filtro){
      //Filtrar los gatos por categoría
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)

      setGastosFiltrados(gastosFiltrados)
  }
},[filtro])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0 ){
        setIsValidPresupuesto(true)
    }
  },[])

  //Añadir la función del botón de Nuevo Gasto
  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    },500);
  }

  const guardarGasto = (gasto) => {
    if(gasto.id){
      //Actualizar el gasto
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({})

    }else{
      //Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
        setGastos([...gastos, gasto])
    }
   
      setAnimarModal(false)

        setTimeout(() =>{
            setModal(false)
        },500);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados)
  }


  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
      gastos={gastos}
      setGastos={setGastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {/*Introducir botón de agregar gastos*/}
      {isValidPresupuesto ? (
        <>
          <main>
          <Filtros 
                filtro={filtro}
                setFiltro={setFiltro}
              />
            <ListadoGastos 
              setGastoEditar={setGastoEditar}
              gastos={gastos}
              eliminarGasto={eliminarGasto}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
                src={IconoNuevoGasto}
                alt="icono nuevo gasto"
                onClick={handleNuevoGasto}
            />
          </div>
        </>
      ) : null}
      {/*POngo null en el ternario porque no necesito que pase nada en caso de que NO*/}
      
      {modal ?(
        <Modal 
        gastoEditar={gastoEditar}
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        setGastoEditar={setGastoEditar}
        />
      ):null}
    </div>
  )
}

export default App
