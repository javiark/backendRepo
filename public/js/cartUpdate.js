badgeHTMLbuy5 = document.getElementById("cart-count");


function countProducts(){
    Order = JSON.parse(sessionStorage.getItem('order')) || [];
    let quantity = 0;
    Order.forEach((prod) => {
        quantity += prod.cant; 
    })
    badgeHTMLbuy5.innerText = quantity;
    console.log(quantity)
}

countProducts();