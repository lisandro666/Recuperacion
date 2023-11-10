import React from 'react'

const Fila = ({item}) => {
  return (
    <tr>
        <td>{item.fechaCotizacion}</td>
        <td>{item.propiedad}</td>
        <td>{item.ubicacion}</td>
        <td>{item.metrosCuadrados}</td>
        <td>{item.poliza}</td>
    </tr>
  )
}

export default Fila
