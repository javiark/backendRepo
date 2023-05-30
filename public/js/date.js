function formatearFecha(fechaTimestamp) {

    const fecha = new Date(fechaTimestamp)

    let dia = fecha.getDate() //día de la semana 20
    let mes = fecha.getMonth() + 1 //Get month me devuelve el número del mes pero comenzando como un array por lo tanto Enero es 0, Diciembre 11, etc
    const year = fecha.getFullYear(); //2022
    
    // Corregir la falta de dígito cuando el valor de día o mes sea menor que 10
    if(dia < 10) { dia = '0' + dia };

    mes = String(mes).padStart(2, '0')
    // retorno la fecha formateada para guardar en una variable y utilizar al pintar mi fila de la tabla
    return `${dia}/${mes}/${year}`;
}

const fecha = formatearFecha(Date.now())

// console.log(fecha)

