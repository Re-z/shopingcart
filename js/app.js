let cartContent = document.querySelector('#cart-content tbody'),
    allCourses = document.querySelector('#courses-list'),
    clearCartBtn = document.querySelector('#clear-cart'),
    cartItems = [];

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
        cartItems.push(item);
        pushToLS(cartItems)
    }    

})
    

function addToCart(obj) {
    const html = `
        <tr>
            <td><img src="${obj.img}" style="max-width: 100px" alt="${obj.name}"></td>
            <td>${obj.name}</td>
            <td>${obj.price}</td>
        </tr>
    `
    cartContent.insertAdjacentHTML('afterbegin', html)
}

function pushToLS(items){
    localStorage.setItem('cartItems', JSON.stringify(items))
}
function printFromLS() {
    let LsContent = localStorage.getItem('cartItems')
    if(LsContent) {
        let items = JSON.parse(LsContent);
        // console.log(items);
        items.forEach( function(el) {
            addToCart(el)
        })
    }
    
}
printFromLS();
//