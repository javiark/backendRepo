function showAlert(text, type = 'sucess') {
    // * VAMOS A HACER NUESTRO ALERT CUSTOM
    // Crea unm elemento HTML Node
    
    const alertDialog = document.createElement('div');
    // Añade una clase
    alertDialog.classList.add('alert-dialog');
    alertDialog.innerText = text;
    document.body.appendChild(alertDialog);
    if(type === 'succes') {
        alertDialog.style.backgroundColor = ' #827433';
    }
    
    
    if(type === 'error') {
        alertDialog.style.backgroundColor = '#d9544d';
    }
    if(type === 'warning') {
        alertDialog.style.backgroundColor =  '#f0ac4b'
    }
    // Para demorar su aparición luego de haberlo creado lineas anterior con document createElement
    setTimeout(() => alertDialog.classList.add('show'), 10)

    setTimeout(() => {
        alertDialog.classList.remove('show');

        setTimeout(() => {
            alertDialog.remove();
        }, 1000)
        // window.location.href = '/pages/login/login.html'     
    },  1500);
}