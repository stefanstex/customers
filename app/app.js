var app = angular.module('customersApp', []);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/customers',
            {
                controller: 'CustomersController',
                templateUrl: 'app/views/customers.html'
            })
        //Define a route that has a route parameter in it (:customerID)
        .when('/customerorders/:customerID',
            {
                controller: 'CustomerOrdersController',
                templateUrl: 'app/views/customerOrders.html'
            })
        //Define a route that has a route parameter in it (:customerID)
        .when('/orders',
            {
                controller: 'OrdersController',
                templateUrl: 'app/views/orders.html'
            })
        .when('/products',
            {
                controller: 'ProductsController',
                templateUrl: 'app/views/products.html'
            })
        .otherwise({ redirectTo: '/customers' });
});
