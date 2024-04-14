class Chair {
    constructor(id,title,prevPrice,price,img){
        this.id = id
        this.title = title
        this.prevPrice = prevPrice
        this.price = price
        this.img = img
    }
    shoPrice(){
        if(!this.prevPrice){
        return  `<span class="price">$${this.price}</span>`
        }return `<span class="prevPrice">$${this.prevPrice}</span> <span class="price">$${this.price}</span>`
    }  
    render(){
        let newDiv = document.createElement("div")
        newDiv.innerHTML=`
            <div class="item">
                <img class="img" src="${this.img}">
                <p class="title">${this.title}</p>
                <div class="flex-help">
                    <p class="price">${this.shoPrice()}</p>
                </div>
                <a id="btn" class="addCart" href="#">ADD TO CART</a>
            </div>
        `;
        
        newDiv.querySelector('#btn').addEventListener('click',this.btnAddToCart.bind(this))
        return newDiv;
    }
    btnAddToCart(){
        App.getCart().add(this.id)
    }
}
class Chairlist{
    constructor(){
         this.chairs = []

         this.listProductElm = document.querySelector('.listProduct')
    }
    add(id,title,prevPrice,price,img,){
        const newChairs = new Chair(id,title,prevPrice,price,img,)
        this.chairs.push(newChairs)
        this.listProductElm.append(newChairs.render())
    }
    find(id){
        return this.chairs.find(item => item.id === id)
    }    
}
class CartItem{
    constructor(id,quantity){
        this.id = id
        this.quantity = quantity
    }
    findChir(id){
        return App.getChairList().find(id)
    }
    htmlElementId(){
        return `Cart-Item-${this.id}`
    }
    renderList(id){
        const chair = this.findChir(id)
        const newCartItem = document.createElement('ul')
        newCartItem.id=this.htmlElementId()
        newCartItem.innerHTML = `
            <li class="item">
                <div class="image">
                    <img src="${chair.img}">
                </div>
                <div class="name">
                    <p>${chair.title}</p>
                </div>
                <div class="totalPrice">
                    <span class="totalpriceListItem">$${chair.price}</span>
                </div>
                <div class="quantity-number">
                        <span class="quantity-decreas">-</span>
                        <span class="quantity">1</span>
                        <span class="quantity-increas">+</span>
                </div>
            </li>   
        `;
        newCartItem.querySelector('.quantity-decreas').addEventListener('click',this.decreaseQuantity.bind(this)) 
        newCartItem.querySelector('.quantity-increas').addEventListener('click',this.increaseQuantity.bind(this))
        return newCartItem
    }
    updateQuantityUI() {
        this.quantityElement.textContent = this.quantity;
    }
    removeCartItem() {
        this.cartListEl.removeChild(this.cartItemElm);
        const index = this.cart.items.indexOf(this);
        this.cart.items.splice(index, 1);
        this.cart.updateCartTotal();
        this.cart.updateCartNotifiation();
    }
    decreaseQuantity(){
        this.quantity--
        if(this.quantity<1){
        App.getCart().remove(this.id)
        return
        }
        this.updateQuantityUI()
        App.getCart().updateCartTotal()
    }
    increaseQuantity(){
        this.quantity++
        this.updateQuantityUI()
        App.getCart().updateCartTotal()
    }
    updateQuantityUI(){
        const cartItemElm = document.getElementById(this.htmlElementId())
        cartItemElm.querySelector('.quantity').innerText=this.quantity
    }
}
class Cart {
    constructor(){
        this.items = []   

        this.listCartElm = document.querySelector('.listCart') 
        this.cartTotalElm = document.querySelector('.totalPrice') 
        this.NotifactionIconElm = document.querySelector('.Notifaction')      
    }
    findItem(id){
        return this.items.find(item => item.id === id)
    }
    has(id){
        return  !! this.findItem(id)
    }
    add(id){
        if (this.has(id)){
            this.findItem(id).increaseQuantity();
            return
        }
       const cartItem = new CartItem(id,1)
       this.items.push(cartItem)
       const cartItemElm = cartItem.renderList(id)
       this.listCartElm.append(cartItemElm)
       this.updateCartTotal()
       this.updateCartNotifiation()
       new Toast('Prodauct added to your cart').success();
    } 
    remove(id){
        if(!this.has(id)){
            return
        }
        const index = this.items.findIndex(item => item.id === id)
        document.getElementById(this.items[index].htmlElementId()).remove()
        this.items.splice(index,1)
        this.updateCartTotal()
        this.updateCartNotifiation()
        new Toast(`Prodauct remove to your cart`).danger();
    }
    updateCartTotal(){
        const totalPrice =this.items.reduce((prevValue,cartItem)=>{
            return prevValue + (App.getChairList().find(cartItem.id).price * cartItem.quantity)
            },0)
            this.cartTotalElm.innerText =`$${totalPrice}`
    }   
    updateCartNotifiation(){
        this.NotifactionIconElm.innerText = this.items.length
    }
}
class Toast{
    constructor(text){
        this._text = text;
        this._errorBag = document.getElementById('error-bag');
        this._createElement();
    }
    _createElement(){
        this._toastElm = document.createElement('div');
        this._toastElm.className = `help`;
        this._toastElm.textContent = this._text;
    }
    success(){
        this._toastElm.classList.add('bg-green');
        this._errorBag.append(this._toastElm);
        this._remove()
    }
    danger(){
        this._toastElm.classList.add('bg-red');
        this._errorBag.append(this._toastElm);
        this._remove()
    }
    _remove(){
        setTimeout(()=>{
            this._toastElm.remove()
        },3000)
    }
}
class Shop {
    constructor(){
        this.chairlist = new Chairlist()
        this.cart = new Cart()

        this.generateCHair()
        this.handleUiIntraction()
    }
    handleUiIntraction(){
        const iconShopping = document.querySelector('.icon-cart')
        const closeList =document.querySelector('.close')
        const body =document.querySelector('body')

        iconShopping.addEventListener('click',()=>{
            body.classList.toggle('showCart')
        })
        closeList.addEventListener('click',()=>{
            body.classList.toggle('showCart')
        })
    }
    generateCHair(){
        this.chairlist.add(
            1,
             "chair1",
             188,
             167,
             "img/1.PNG"
         );
         this.chairlist.add(
            2,
             "chair2",
             null,
             160,
             "img/2.PNG"
         );
         this.chairlist.add(
            3,
             "chair3",
             165,
             144,
             "img/3.PNG"
         );
         this.chairlist.add(
             4,
             "chair4",
             null,
             155,
             "img/4.PNG"
         );
         this.chairlist.add(
             5,
             "chair5",
             140,
             130,
             "img/5.PNG"
         );
         this.chairlist.add(
             6,
             "chair6",
             195,
             180,
             "img/6.PNG"
         );
         this.chairlist.add(
             7,
             "chair7",
             195,
             190,
             "img/7.PNG"
         );
         this.chairlist.add(
             8,
             "chair8",
             null,
             140,
             "img/8.PNG"
         );
    }
}
class App{
    static init(){
        this.shop = new Shop()
    }
    static getCart(){
        return this.shop.cart
    }
    static getChairList(){
        return this.shop.chairlist 
    }
}
App.init()