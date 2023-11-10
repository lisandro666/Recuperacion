import { useState } from 'react';
import { Link } from 'react-router-dom';
import Fila from '../components/Fila';


function Historial() {


    const [historialCotizaciones, setHistorialCotizaciones] = useState(
        JSON.parse(localStorage.getItem("historialCotizaciones")) || []
    ) //se obtiene el historial del local storage
    
    return (
    <> 
    <h1 className="center separador">Ver Historial 📋</h1>
    <div className=" center div-cotizador">
        <table>
            <thead>
                <tr>
                    <th>Fecha de cotización</th>
                    <th>Propiedad</th>
                    <th>Ubicación</th>
                    <th>Metros cuadrados</th>
                    <th>Póliza mensual</th>
                </tr>
            </thead>
            <tbody>
                {historialCotizaciones.map(item => <Fila
                    key={item.fechaCotizacion}
                    item={item}
                ></Fila>)} 
                {/* POR CADA OBJETO DEL HISTORIAL RENDERIZA UNA FILA */}
            </tbody>
        </table>
        <div className="center separador">
            <Link to="/Home"><button className="button button-outline">VOLVER</button></Link>
        </div>
    </div>
    </>
    );
  }
  
  export default Historial;
  