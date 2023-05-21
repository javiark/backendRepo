//----------------ACTUALIZAR CANTIDAD EN CARRITOS DE COMPRA--------------
let productOrder4 = JSON.parse(sessionStorage.getItem("order")) || [];
let badgeHTMLbuy4=document.getElementById("cart-count");

function cartUpdate(){
    let countCart=0;
productOrder4.forEach(productOrder4 => {
    countCart += parseInt(productOrder4.quantity)
})

badgeHTMLbuy4.innerText=countCart;
console.log(countCart)
}


cartUpdate()