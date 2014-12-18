var shoppingAPI = {
  submitBtn:document.getElementById('submit'),
  shoppingApiurl:"http://api.shopstyle.com/action/apiSearch?callback=?",
  searchField:$('#search'),
  output: function(status){
    $('#errorOutput').html(status);
  },

  initialize: function() {
    shoppingAPI.submitBtn.addEventListener("click", function(e){
    e.preventDefault();
      var product = shoppingAPI.searchField.val();
        if(!product.trim()){
          alert("Please enter a name...");
          return false;
        } 
        else if(parseInt(product)){
          alert("Please enter a valid item...");
        }
        else {
          shoppingApiUser = {
          pid: "uid5369-26250213-59",
          fts: shoppingAPI.searchField.val(),
          min: 0,
          count: "30",
          format :"jsonp",
        },
    $.getJSON(shoppingAPI.shoppingApiurl, shoppingApiUser, shoppingAPI.productInfo);
      }
    });
  }, 
  productInfo: function(response){
      var productHTML = '<ul>';
      $.each(response.products, function(i, dress) {
        console.log(response);
        productHTML += '<li id="wrapper">';
        productHTML += '<img src="' + dress.images[3].url + '" class="image">';
        productHTML += '<p class="name"> NAME: ' + dress.name + '</p>';
        productHTML += '<p class="id"> ID: ' + dress.id + '</p>';
        productHTML += '<p class="stock"> STOCK: ' + dress.inStock + '</p>';
        productHTML += '<p class="retailer"> RETAILER: ' + dress.retailer + '</p>';
        productHTML+= '</li>';
      }); // end each
      productHTML += '</ul>';
      $('#product').html(productHTML);
      shoppingAPI.searchField.val(""); 
      shoppingAPI.searchField.prop("disabled", false);
      // $('#submit').css('background', 'url ("img/loadingIcon.gif") no-repeat #000').val(" ");
  },
};

$(document).ready(function(){
  shoppingAPI.initialize();
});
