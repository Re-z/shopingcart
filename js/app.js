let cartContent = document.querySelector('#cart-content tbody'),
    allCourses = document.querySelector('#courses-list'),
    clearCartBtn = document.querySelector('#clear-cart'),
    lsContent = localStorage.getItem('cartItems');
    cartItems = [];
    if(lsContent) {
        cartItems = JSON.parse(lsContent);
    } 

clearCartBtn.addEventListener('click', function(){
    cartItems = [];
    localStorage.clear();
    // let cartContent = document.querySelector('#cart-content tbody');
    cartItemsDOMArr = Array.from(cartContent.children);
    // console.log(cartItemsDOMArr);
    cartItemsDOMArr.forEach(function(el, index) {
        cartItemsDOMArr[index].remove()
        // console.log(cartContent[index]);
    })

})

allCourses.addEventListener('click', function(evt){
    evt.preventDefault();
    target = evt.target;
    if(target.classList.contains('add-to-cart')) {
        // get full card
        const parent = target.closest('.card');
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

})
    

function addToCart(obj) {
    const html = `
        <tr class="cart-item">
            <td><img src="${obj.img}" style="max-width: 100px" alt="${obj.name}"></td>
            <td>${obj.name}</td>
            <td>${obj.price}</td>
            <td><i class="delete-item"></i></td>
        </tr>
    `
    cartContent.insertAdjacentHTML('afterbegin', html)
}

function pushToLS(items){
    localStorage.setItem('cartItems', JSON.stringify(items))
}
function printFromLS() {
    
    if(lsContent) {
        let items = JSON.parse(lsContent);
        // console.log(items);
        items.forEach( function(el) {
            addToCart(el)
        })
    }
    
}
printFromLS();
//

//delete curent item from DOM
function deleteItemFromDOM() {
    cartContent.addEventListener('click', function(evt){
        if(evt.target.classList.contains('delete-item')){
           let parent =  evt.target.closest('.cart-item');
           let arr = Array.from(cartContent.children);
            


           let indexOfDeletedElement = arr.indexOf(parent);
           console.log(indexOfDeletedElement);
           
           cartItems.splice(indexOfDeletedElement, 1);
           pushToLS(cartItems);
           
           console.log(cartItems);
            parent.remove();
            


        }



    })
}
deleteItemFromDOM();