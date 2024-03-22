// điều hướng trang 
function shop(){
    window.location = "sanpham.html"
}
function shopKho(){
    window.location = "sanpham-kho.html"
}   
function shopUot(){
    window.location = "sanpham-uot.html"
}
function shop1Tuoi(){
    window.location = "sanpham-1+tuoi.html"
}
function shopMeoCon(){
    window.location = "sanpham-meocon.html"
}
function shopMix(){
    window.location = "sanpham-mix.html"
}
function blog(){
  window.location = "blog.html"
}






//----------------------------- giỏ hàng
// xóa 
var remove_cart = document.getElementsByClassName("header__cart-item-remove");
for (var i = 0; i < remove_cart.length; i++) {
    var button = remove_cart[i]
    button.addEventListener("click", function (event) {
        var button_remove = event.target
        button_remove.parentElement.parentElement.parentElement.remove()
        updatecart()
    })
}

// update cart 
function updatecart() {

    // var cart_item = document.getElementsByClassName("header__cart-item-info")[0];
    var cart_rows = document.getElementsByClassName("header__cart-item");
    var total = 0;
    for (var i = 0; i < cart_rows.length; i++) {
        var cart_row = cart_rows[i]
        var price_item = cart_row.getElementsByClassName("header__cart-item-price")[0]
        var quantity_item = cart_row.getElementsByClassName("header__cart-item-quantity")[0]
        var price = parseFloat(price_item.innerText)// chuyển một chuổi string sang number để tính tổng tiền.
        var quantity = quantity_item.value // lấy giá trị trong thẻ input
        total = total + (price * quantity)
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = total + ',000VNĐ'
    // Thay đổi text = total trong .cart-total-price. Chỉ có một .cart-total-price nên mình sử dụng [0].
}
updatecart()


// thay đổi số lượng sản phẩm
var quantity_input = document.getElementsByClassName("header__cart-item-quantity");
for (var i = 0; i < quantity_input.length; i++) {
  var input = quantity_input[i];
  input.addEventListener("change", function (event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart()
  })
}

// Thêm vào giỏ
var add_cart = document.getElementsByClassName("btn-cart");
for (var i = 0; i < add_cart.length; i++) {
    var add = add_cart[i];
    add.addEventListener("click", function (event) {

      var button = event.target;
      var product = button.parentElement; 

      var element = product.getElementsByClassName("home-product-item__img")[0]
      var style = window.getComputedStyle(element)
      var imgLink = style.backgroundImage
      const urlRegex = /url\("?(.+?)"?\)/;
      const urlMatches = imgLink.match(urlRegex);
      if (urlMatches && urlMatches.length > 1) {
        const imageUrl = urlMatches[1];
        img = imageUrl
      }
      var title = product.getElementsByClassName("home-product-item__name")[0].innerText
      var price = product.getElementsByClassName("home-product-item__price-new")[0].innerText
      addItemToCart(title, price,img)
      
      
      updatecart()
      
    })
}

function addItemToCart(title, price,img) {
  var cartRow = document.createElement('li')
  cartRow.classList.add('header__cart-item')
  var cartList = document.getElementsByClassName('header__cart-list-item')[0]
  var cart_title = cartList.getElementsByClassName('header__cart-item-name')

  
  
  
  // Nếu title của sản phẩm bằng với title mà bạn thêm vao giỏ hàng thì sẽ thông cho user.
  for (var i = 0; i < cart_title.length; i++) {
    if (cart_title[i].innerText === title) {
      alert('Sản Phẩm Đã Có Trong Giỏ Hàng');
      return
    }
  }

  var cartRowContents = `
  <img src="${img}" alt="" class="header__cart-img">
  <div class="header__cart-item-info">
      <div class="header__cart-item-head">
          <h5 class="header__cart-item-name">${title}</h5>
          <div class="header__cart-item-price-wrap">
              <span class="header__cart-item-price">${price}</span>
              <span class="header__cart-item-multiply">X</span>
              <input type="number" class="header__cart-item-quantity" value="1">
          </div>
      </div>
      <div class="header__cart-item-body">
          <span class="header__cart-item-description">
              Phân loại: Bạc
          </span>
          <button class="header__cart-item-remove">Xóa</button>
      </div>
  </div>`
  cartRow.innerHTML = cartRowContents
  cartList.append(cartRow)
  cartRow.getElementsByClassName('header__cart-item-remove')[0].addEventListener('click', function (event) {
    var button_remove = event.target
    button_remove.parentElement.parentElement.parentElement.remove()
    cartNumber.innerText = cart_title.length 
    
    updatecart()
  })
  cartRow.getElementsByClassName('header__cart-item-quantity')[0].addEventListener('change', function (event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart()
  })
  var cartNumber = document.getElementsByClassName('header__cart-notice')[0]
  cartNumber.innerText = cart_title.length 
  
}

// thanh toan
var cashBtn = document.querySelector('.header__cart-view-cart');

cashBtn.addEventListener('click', function() {
  alert('Cảm ơn bạn đã thanh toán!');
  location.reload(true)
});
// console.log(thanhToan)





//-------- link tới sản phẩm
var productItems = document.getElementsByClassName('home-product-item')
for (var i = 0; i < productItems.length; i++) {
  productItems[i].setAttribute("href", "./chitietsanpham.html");
}






// ------------------ tăng giảm số lượng trong trang chi tiết sp
var reduceBtn = document.querySelector('.detail-product__info-quantity__btn--reduce')
var increaseBtn = document.querySelector('.detail-product__info-quantity__btn--increase')
var recentQuantity = document.querySelector('.detail-product__info-quantity-recent')

reduceBtn.addEventListener('click', function(event) {
  var reduce = event.target;
  recentQuantity.value--;
  if (recentQuantity.value == NaN | recentQuantity.value == 0){
    recentQuantity.value = 1;
  } 
})
increaseBtn.addEventListener('click', function(event) {
  var increase = event.target;
  recentQuantity.value++;
})

// -----
// console.log(img)
function addCartFromDetail(title, price, img){
  //chọn thẻ detail sẽ ra 1 mảng chọn phần tử đầu, xong chọn tiếp thẻ h1 phần tử đầu và innertext của nó
  title = document.getElementsByClassName('detail-product__header')[0].getElementsByTagName('h1')[0].innerText
  price = document.getElementsByClassName('detail-product__price')[0].innerText
  img = document.getElementsByClassName('item-main')[0].src
  addItemToCart(title,price,img)
  updatecart()

}




