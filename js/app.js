const iconShopping = document.querySelector('.icon-cart')
const closeList =document.querySelector('.close')
const body =document.querySelector('body')
const listProductElm = document.querySelector('.listProduct')
const listCartElm = document.querySelector('.listCart')
const NotifactionIconElm = document.querySelector('.Notifaction')
const totalPriceElm = document.querySelector('.totalPrice')

const chir = []
const cartItems = new Set([])

//Add items with list cart
const btnAddToCart = (id) =>{
    if(cartItems.has(id)){
        return
    }
    cartItems.add(id)
    const findCart = chir.find((item)=>item.id===id)
    const addToCartElm = document.createElement('ul')
    addToCartElm.id=`Cart-Item-${id}`
    addToCartElm.innerHTML = `
        <li class="item">
            <div class="image">
                <img src="${findCart.img}">
            </div>
            <div class="name">
                <p>${findCart.title}</p>
            </div>
            <div class="totalPrice">
                <span>$${findCart.price}</span>
            </div>
        </li>   
    `;
    addToCartElm.addEventListener('click',removeHandlerItem.bind(null,findCart.id))

   listCartElm.append(addToCartElm) 
   updatePriceTotal()
   updateCartNotifiation()
}
//remove Item with List
const removeHandlerItem=(id)=>{ 
    if(!cartItems.has(id))return;
    cartItems.delete(id)
    document.getElementById(`Cart-Item-${id}`).remove()
    updateCartNotifiation()
    updatePriceTotal()
}
//Add Items with page
let addNewproducts =(id,title,prevPrice,price,img)=>{
    const newproduct={
        id,
        title,
        prevPrice,
        price,
        img,
        shoPrice(){
            if(!prevPrice){
            return  `<span class="price">$${price}</span>`
            }return `<span class="prevPrice">$${prevPrice}</span> <span class="price">$${price}</span>`
        }       
    }
    chir.push(newproduct)
    genarationHtmlProducts(newproduct)
}
const genarationHtmlProducts = (chir) =>{
    let newDiv = document.createElement("div")
    newDiv.innerHTML=`
        <div class="item">
            <img class="img" src="${chir.img}">
            <p class="title">${chir.title}</p>
            <div class="flex-help">
                <p class="price">${chir.shoPrice()}</p>
            </div>
            <a id="btn" class="button" href="#">ADD TO CART</a>
        </div>
    `;
    newDiv.querySelector('#btn').addEventListener('click',btnAddToCart.bind(null,chir.id))
    listProductElm.appendChild(newDiv);   
}
const addcartproduct = ()=>{
    addNewproducts(
       1,
        "chair1",
        188,
        167,
        "img/1.PNG"
    );
    addNewproducts(
       2,
        "chair2",
        null,
        160,
        "img/2.PNG"
    );
    addNewproducts(
       3,
        "chair3",
        165,
        144,
        "img/3.PNG"
    );
    addNewproducts(
        4,
        "chair4",
        null,
        155,
        "img/4.PNG"
    );
    addNewproducts(
        5,
        "chair5",
        140,
        130,
        "img/5.PNG"
    );
    addNewproducts(
        6,
        "chair6",
        195,
        180,
        "img/6.PNG"
    );
    addNewproducts(
        7,
        "chair7",
        195,
        190,
        "img/7.PNG"
    );
    addNewproducts(
        8,
        "chair8",
        null,
        140,
        "img/8.PNG"
    );
}
addcartproduct()
//Notifaction List Cart
const updateCartNotifiation =()=>{
    NotifactionIconElm.innerText = cartItems.size
}
//update Price Total
const updatePriceTotal = ()=>{
    const totalPrice = Array.from(cartItems).reduce((prevValue,item_id)=>{
    return prevValue + chir.find(item => item.id === item_id).price
    },0)
    totalPriceElm.innerText =`$${totalPrice}` 
}
// CLOSE AND OPEN LIST CART
iconShopping.addEventListener('click',()=>{
    body.classList.toggle('showCart')
})
closeList.addEventListener('click',()=>{
    body.classList.toggle('showCart')
})