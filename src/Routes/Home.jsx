import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Option from "./../components/Option";
import { useState, useEffect } from "react";

function Home() {
  const [poliza,setPoliza] = useState()
  const [form, setForm] = useState({
    propiedad : "",
    ubicacion : "",
    metros : "",
  });
  const [historialCotizaciones, setHistorialCotizaciones] = useState(
    JSON.parse(localStorage.getItem("historialCotizaciones")) || []
  ) //se obtiene el historial del local storage
  const [cotizado,setCotizado] = useState(false) //estado para hacer aparecer el boton para guardar en el hsitorial

  const { data } = useFetch()
  const dataCategoria = data?.filter((item) => item.categoria === "propiedad"); //filtro de propiedades por categoria: propiedad
  const dataUbicacion = data?.filter((item) => item.categoria === "ubicacion"); //filtro de propiedades por categoria: ubicacion
  
  const handleChange = (e) => {
    const {name,value} = e.target //desestructura name y valye del evento

    setForm({
        ...form,
        [name] : value
    }) //setea el formulario con los valores
  }

  const guardarEnHistorial = () => { //funcion que guarda en el historial

    const tipoPropiedad = dataCategoria.find((item) => item.factor === parseFloat(form.propiedad))?.tipo //busca el tipo del objeto que coincide con el factor Propiedad que se encuentra en el formulario
    const tipoUbicacion = dataUbicacion.find((item) => item.factor === parseFloat(form.ubicacion))?.tipo
    
    const cotizacion = { //objeto que se va a guardar en el historial
      fechaCotizacion: new Date().toLocaleString(), //hora actual
      propiedad: tipoPropiedad,
      ubicacion: tipoUbicacion,
      metrosCuadrados: form.metros,
      poliza: poliza,
    }
    setHistorialCotizaciones((prevHistorial) => [...prevHistorial, cotizacion]) //setea el estado del historial de cotizaciones
    localStorage.setItem("historialCotizaciones", JSON.stringify([...historialCotizaciones, cotizacion]))
  }


  return (
    <>
      <div className="historial">
        <Link to="/Historial">
          <span title="Ver Historial">📋</span>
        </Link>
      </div>
      <h1 className="center separador">Seguros del hogar 🏡</h1>
      <div className=" center div-cotizador">
        <h2 className="center separador">Completa los datos solicitados</h2>
        <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
        <select id="propiedad" name="propiedad" value={form.propiedad} onChange={handleChange}>
          <option selected disabled>...</option>
          {dataCategoria?.map((propiedad) => (
            <Option value={propiedad.factor} desc={propiedad.tipo} key={propiedad.id} />
          ))}
        </select>
        <label htmlFor="ubicacion">Selecciona su ubicación</label>
        <select id="ubicacion" name="ubicacion" value={form.ubicacion} onChange={handleChange}>
          <option selected disabled>...</option>

          {dataUbicacion?.map((propiedad) => (
            <Option value={propiedad.factor} desc={propiedad.tipo} key={propiedad.id} />
          ))}
        </select>
        <label htmlFor="metros">Ingresa los Metros cuadrados:</label>
        <input
          onChange={handleChange}
          type="number"
          id="metros"
          name="metros"
          value={form.metros}
          min="20"
          max="500"
          required
        ></input>
        <div className="center separador">
          <button onClick={()=> {
            const costoM2 = 35.86
            let producto = (costoM2 * form.metros * form.propiedad * form.ubicacion).toFixed(2)
            setPoliza(producto)
            setCotizado(true)
          }} className="button button-outline">Cotizar</button>
        </div>
        <div className="center separador">
          <p className="importe">
            Precio estimado: $ <span id="valorPoliza">{poliza}</span>
            {cotizado && <span className="guardar" title="Guardar en historial" onClick={guardarEnHistorial}>
              💾
            </span>}
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
