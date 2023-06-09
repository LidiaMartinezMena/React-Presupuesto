import {useState, useEffect} from "react"
import {CircularProgressbar, buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto, gastos, setPresupuesto, setGastos, setIsValidPresupuesto}) => {

  const[porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => 
    gasto.cantidad + total, 0
    )

    const totalDisponible = presupuesto - totalGastado;

    //Calcular el porcentaje gastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible)/presupuesto)*100).toFixed(2);
   

    setDisponible(totalDisponible)
    setGastado(totalGastado);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    },1000)
  },[gastos])



    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style:'currency',
            currency: 'EUR'
        })
    }

    //Función para formatear la APP
    const handleResetApp = () => {
      const resultado = confirm('¿Deseas reinicar el presupuesto y los gastos?');

      if(resultado){
          setGastos([])
          setPresupuesto(0)
          setIsValidPresupuesto(false)
      }else{
        console.log('No')
      }
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
            <CircularProgressbar 
              styles={buildStyles({
                pathColor: porcentaje > 100 ? '#DC2626' : '#498163',
                trailColor: '#C2E7D4',
                textColor: porcentaje > 100 ? '#DC2626' : '#498163'
              })}
              value={porcentaje}
              text={`${porcentaje}% Gastado`}
            />
      </div>
      <div className="contenido-presupuesto">
        <button
          className="reset-app"
          type="button"
          onClick={handleResetApp}
        >
          Resetear APP
        </button>
        <p>
            <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : '' }`}>
            <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
            <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto
