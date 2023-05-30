const token = localStorage.getItem('token');
const userForm2 = document.getElementById('add-user');
const passName = document.getElementById("passwordName")
const passName1 = document.getElementById("passwordName1")
console.log(userForm2)
// console.log(token)

const URL = 'http://localhost:4000/api';
const URL_public = 'http://localhost:4000';
let editIndexUser;
// console.log(editIndexUser)

let users = [];

async function obtenerUsuarios() {
    try {
        const token = localStorage.getItem("token"); // no hay que hacer json|pars pq eltoken es una key y una string
        const response = await axios.get(`${URL}/users`, { 
            headers: {
                Authorization: token
            }
        });
        // console.log(response)
        users=response.data.users;
        console.log(users)
        renderizarTablaUser(users)
    } catch (error) {
        console.log(error);
       
    }

}
obtenerUsuarios()









const userForm = document.getElementById("add-user");
const submitBtn = document.getElementById("submit-btn-user");


//1- Obtener el body de la tabla para poder modificarlo desde JS
const tableBody = document.querySelector('#table-body-Users');

let editIndex;


//2- Definir una función para iterar el array
function renderizarTablaUser() {
    tableBody.innerHTML = '';
    if (users.length === 0) {
        tableBody.innerHTML = "<p class='disabled'>NO SE ENCONTRARON USUARIOS</p>"
        return
    }
    //3- Iterar el array para acceder a cada producto
    users.forEach((usuario, index) => {

        //4- Introducir dentro del tbody una fila por producto con sus respectivas celdas
        const tableRow = `<tr class="user">
                            <td class="user__name" onclick="editName(${index}")>${usuario.fullName}</td>
                            <td class="user__name" onclick="editName(${index}")>${usuario.surname}</td>
                            <td class="user__desc">${usuario.email}</td>
                            <td class="user__name"> ${usuario.role}</td>
                            <td class="user__desc"> ${usuario._id}</td>
                            <td class="user__actions">
                                <button class="product__action-btnDetail" onclick="deleteUser('${usuario._id}')">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                           
                                <button class="product__action-btn product__btn-edit"  onclick="editUser('${usuario._id}')">
                                    <i class="fa-solid fa-pencil " ></i>
                                </button>

                            
                            </td>
                        </tr>`
        tableBody.innerHTML += tableRow;

    });

}

renderizarTablaUser();

// //****ADD EDIT USER*** */








// function deleteUser(indice) {
//     users.splice(indice, 1);
//     localStorage.setItem("users", JSON.stringify(users))
//     renderizarTablaUser();
//     showAlert("El producto se borro correctamente", "succes")

// }


async function editProduct1(idx) {
    console.log(idx)
    try {


        // submitBtn.classList.add("edit-btn");
        // submitBtn.innerText = "Modificar Producto";
        const indice = await axios.get(`${URL}/product/${idx}`)
        // console.log(indice.data.product)
        let productoElegido = indice.data.product
        // console.log(productoElegido)

        const el = productForm2.elements;  
        el.description.value = productoElegido.description;
        el.name.value = productoElegido.name;
        el.price.value = productoElegido.price;
        inputImg.style.display="none";
        el.detail.value = productoElegido.detail;
        

        editIndex = idx; // id del producto
        // console.log(editIndex)
        const productoEditar = await axios.get(`${URL}/product/${editIndex}`)
        // console.log(productoEditar)


    } catch (error) {
        console.log(error);

    }
}


async function editUser(id){
    console.log(id)
    try {
      submitBtn.classList.add('edit-btn');
      submitBtn.innerText = 'Modificar'
  
      const token = localStorage.getItem('token');
      response = await axios.get(`${URL}/users/${id}`,{
        headers: {
            Authorization: token
        }
      });  
      const userElegido = response.data.user;
      console.log(userElegido)
      const el = userForm2.elements;  
      console.log(el)
     
  
    el.fullName.value = userElegido.fullName;
    el.surname.value = userElegido.surname;
    el.email.value = userElegido.email;
    el.password.style.display="none";
    el.password2.style.display="none";
    el.country.value = userElegido.country;
    el.gender.value = userElegido.gender;
    el.role.value = userElegido.role;

    editIndex =id; // id del producto
    // console.log(editIndex)
    passName.classList.add("oculto");
    passName1.classList.add("oculto");
    
    // passwordInput.classList.add("oculto");
    // passwordInput2.classList.add("oculto");

  
    } catch (error) {
      console.log(error)
    }
      
  }
  


// async function editUser(id){
//     console.log(id)
//     try {
//         const token = localStorage.getItem("token"); // no hay que hacer json|pars pq eltoken es una key y una string
//         const response1 = await axios.get(`${URL}/users/${id}`, { 
//             headers: {
//                 Authorization: token
//             }
//         });
//         console.log("indice:", idx)
//         console.log("usuario:", user)
//         submitBtn.classList.add("visible")
    
    
    
//         // console.table(product);
//         const el = userForm.elements;
    
//         el.fullName.value = user.fullName;
//         el.surname.value = user.surname;
//         el.mail.value = user.email;
//         el.rol.value = user.role;
//         // console.log("indice", idx)
//         // console.log("product:", product)
//         editIndex = idx;

//     } catch (error) {
//         console.log(error);
       
//     }
    
// }

async function addUser(evt){
    console.log(evt)
    try {
        evt.preventDefault();
        const elements = evt.target.elements;
        const formFile = new FormData(evt.target);
        console.log(editIndex) // si cargo un producto  de 0 es undefined, si cargo un producto precargado me trae el ID
        // const idProd = editIndex;
        // console.log(idProd)
        const userNew = {
            fullName: elements.fullName.value,
            surname: elements.surname.value,
            email: elements.email.value,
            password: elements.password.value,
            // date: elements.createdAt.value,
            country: elements.country.value,
            gender: elements.gender.value,
            role: elements.role.value
        }
            // console.log(res)
            if (editIndex) {
                const response = await axios.put(`${URL}/users/${editIndex}`,userNew,{
                  headers: { Authorization: token } }); 
                  if(!response)
                  swal ({
                    title:"El usuario no pudo ser editado",
                    icon: 'error',
                })  
                  else{    
                    swal ({
                        title:"el usuario se edito correctamente",
                        icon: 'success',
                    })
                  }
              }else {
                  const response = await axios.post(`${URL}/users`,userNew);  
                  if(!response)
                  swal ({
                    title:"El usuario no pudo ser añadido",
                    icon: 'error',
                })  
                  else      
                  swal ({
                    title:"Usuario añadido correctamente",
                    icon: 'success',
                }) 
              }
          
          
          
          editIndex = undefined;
          submitBtn.classList.remove('edit-btn');
          submitBtn.innerText = 'Cargar'
          
          cargarUsuarios()
          cleanTableUser();
        } catch (error) {
            console.log(error)
        }
    }

    function cargarUsuarios(){
        const el = userForm.elements;
         
        el.fullName.value = '';
        el.surname.value = '';
        el.email.value = '';
        el.password.value = '';
        el.password2.value = ''; 
        el.country.value = '';
        el.gender.value = '';
        el.role.value = 'CLIENT_ROLE';
       
      }

// function setFavoriteProduct(index) {
//     //Checkear si en el array productos hay algun producto cuyo indice sea distinto al elegido con la propiedad favorite: true tenemos que setearla en falso.
//     // Setear el producto elegido como favorite: true


//     products.forEach((prod,idx)=>{
//         if(index===idx) prod.favorite = true;
//         else prod.favorite = false;
//     });



// //     localStorage.setItem("favorites", JSON.stringify(favorites))
// //     renderizarTabla();
// }