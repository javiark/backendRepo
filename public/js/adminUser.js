const userAdmin = JSON.parse(localStorage.getItem('users'));
const productsDefault = JSON.parse(localStorage.getItem('products'));


function adminUser(){
    if(!userAdmin){

        const newUser = {
            fullName: 'Admin',
            email: 'admin@hotmail.com',
            password: 'alfabeta',
            role: 'ADMIN_ROLE',
        }
        const adminUser = [];
        adminUser.push(newUser);
        localStorage.setItem('users',JSON.stringify(adminUser))
    }}
adminUser()

function prodDefault(){
    if(!productsDefault){

        const newProd =[{
            name: 'BOX ABASCAY - NUEVA EDICIÓN',
            image:"https://snipboard.io/VPHger.jpg",
            price: parseInt(9200),
            description :"Caja especial con productos organicos.",
            detail:"1 Halloumi (300 g aprox) - 1 Orégano (300 g aprox) - 1 Gouda (300 g aprox) - 1 Sardo (300 g aprox) - 1 Sbrinz (300 g aprox) -1 Queso Tybo (300 g aprox)"  
        },
        {
            name: 'CUARTIROLO PORTEÑO - NUEVO!',
            image:"https://snipboard.io/MY3h2V.jpg",
            price: parseInt(8500),
            description :"Queso Cuartirolo - LIBRE DE GLUTEN",
            detail:"Contiene 350 g aproximadamente. Producto fresco.INGREDIENTES: LECHE ORGÁNICA PASTEURIZADA DE VACA, CREMA DE LECHE ORGÁNICA PASTEURIZADA, CLORURO DE CALCIO, ENZIMAS COAGULNTES, CULTIVOS DE BACTERIAS ESPECÍFICAS, SAL, FÉCULA DE MAÍZ."  
        },
        {
            name: 'MAPLE POR 30 HUEVOS',
            image:"https://snipboard.io/N85oHD.jpg",
            price: parseInt(900),
            description :"Huevos de gallinas libres de jaula",
            detail:"Sistema de crianza libre de jaulas (cage-free), que no solo rechaza y evita cualquier tipo de confinamiento en jaulas, sino que también respeta los principios del bienestar animal"  
        },
        {
            name: 'MIEL',
            image:"https://snipboard.io/DK1IXj.jpg",
            price: parseInt(750),
            description :"Miel Floral, 100 % natural",
            detail:"1 frasco x 500 g. "  
        },
        {
            name: 'QUESO EN FLOR - NUEVO!',
            image:"https://snipboard.io/6MxA08.jpg",
            price: parseInt(1350),
            description :"Queso semiduro organico.",
            detail:"Queso semiduro cubierto con aceite de oliva, cera de abejas, flores de aciano, caléndula y pétalos de rosas. "  
        },
        {
            name: 'DULCE DE LECHE X 1 KG',
            image:"https://snipboard.io/Zto4OD.jpg",
            price: parseInt(660),
            description :"Dulce de leche - LIBRE DE GLUTEN",
            detail:"Contiene 1 kg.INGREDIENTES: LECHE DE VACA, AZÚCAR ORGÁNICA, BICARBONATO DE SODIO, GLUCOSA. "  
        },
        {
            name: 'CAMPECHE',
            image:"https://snipboard.io/mazLSX.jpg",
            price: parseInt(7250),
            description :"Horma de Campeche - LIBRE DE GLUTEN",
            detail:"Contiene 3 kg aproximadamente. 35 días de maduración. INGREDIENTES: LECHE ORGÁNICA PASTEURIZADA DE VACA, CLORURO DE CALCIO, ENZIMAS COAGULNTES, CULTIVOS DE BACTERIAS ESPECÍFICAS, SAL. "  
        },
        {
            name: 'TOTE BAG EL ABASCAY',
            image:"https://snipboard.io/MmdZsV.jpg",
            price: parseInt(850),
            description :"Bolsa de tela 30 x 40 cm",
            detail:"Bolsa reciclabl"  
        },
    ]
        
        // const adminProd = [];
        // adminProd.push(newProd);
        localStorage.setItem('products',JSON.stringify(newProd))
    }}
prodDefault()
        

