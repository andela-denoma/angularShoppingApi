var shoppingapp = angular.module('shoppingapp', []);

shoppingapp.controller('mainController', function($scope, ShoppingService){
  $scope.products = [];
  $scope.getProducts = function(){
    ShoppingService.getURL( $scope.text ).success( function( response ){
      console.log(response.products);
      console.log(response.products.length);
      if(response.products.length > 0){

        angular.forEach( response.products, function( items, index ){
          $scope.products.push( items );
          console.log( $scope.products);
        });
      }
      else {
        $scope.error="true";
      }  
          
    });
   }
});

shoppingapp.factory('ShoppingService', function($http){
  var url =  "http://api.shopstyle.com/api/v2/products?pid=uid5369-26250213-59&fts=dress&offset=0&limit=20";
  var Product = {};

  Product.getURL = function( query ){
    return $http.get( url, { params: { q: query } });
  };

  return Product;
});



