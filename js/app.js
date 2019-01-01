let cartContent = document.querySelector('#cart-content tbody'),
    allCourses = document.querySelector('#courses-list'),
    clearCartBtn = document.querySelector('#clear-cart'),
    lsContent = localStorage.getItem('cartItems');
    // this arr is used to hold data of items in cart. It will be array of objects
    cartItems = [];
    // if ls isnt empty set its value to variable in order to print data when DOM loaded
    if(lsContent) {
        cartItems = JSON.parse(lsContent);
    } 

//delete all data from LS and DOM
function resetCartItems() {
    cartItems = [];
    localStorage.clear();
    cartItemsDOMArr = Array.from(cartContent.children);
    cartItemsDOMArr.forEach(function(el, index) {
        cartItemsDOMArr[index].remove()
    })
}

clearCartBtn.addEventListener('click', resetCartItems);


//add items to shopping cart
function addItemsToCart(evt) {
    evt.preventDefault();
    let target = evt.target;
    //delegation
    if(target.classList.contains('add-to-cart')) {
        // get full card
        const parent = target.closest('.card');
        // createing an obj and fill it with values in order to print it in DOM and LS
        let item = {};
        item.img = parent.querySelector('.course-image').getAttribute('src');
        item.name = parent.querySelector('h4').textContent;
        item.price = parent.querySelector('.price span').textContent;
        //add to DOM
        addToCart(item)
        // add to LS
        cartItems.unshift(item);
        pushToLS(cartItems)
    }    
}

allCourses.addEventListener('click', addItemsToCart)
    
// Is used in another functions. Serves to create a cart item
function addToCart(obj) {
    // creating a template of cart item
    const html = `
        <tr class="cart-item">
            <td><img src="${obj.img}" style="max-width: 100px" alt="${obj.name}"></td>
            <td>${obj.name}</td>
            <td>${obj.price}</td>
            <td><i class="delete-item"></i></td>
        </tr>
    `
    // insert it at the begin of cart
    cartContent.insertAdjacentHTML('afterbegin', html)
}


function pushToLS(items){
    localStorage.setItem('cartItems', JSON.stringify(items))
}
// is used to print data from LS at the DOM loaded
function printFromLS() {
    if(lsContent) {
        let items = JSON.parse(lsContent);
        // used decreased for loop in order to have correct order of items after print
        for (let index = items.length - 1; index >= 0; index--) {
            addToCart(items[index]);
        }
    }
}

printFromLS();


//delete curent item from DOM
function deleteItemFromDOM(evt) {
    if(evt.target.classList.contains('delete-item')){
        // retrieve a parent
        let parent =  evt.target.closest('.cart-item');
        //create an array from its children
        let arr = Array.from(cartContent.children);
        // get the array index of child which needs to be deleted
        let indexOfDeletedElement = arr.indexOf(parent);
        //delete selected item from main array and push changes to LS
        cartItems.splice(indexOfDeletedElement, 1);
        pushToLS(cartItems);
        // remove selected item from DOM
         parent.remove();
     }
}

cartContent.addEventListener('click', deleteItemFromDOM)
