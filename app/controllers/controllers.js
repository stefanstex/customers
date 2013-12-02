app.controller('CustomersController', function($scope, $http, customersService){
	
	init();
	
	function init(){
		$scope.customers = customersService.getCustomers();
	}
	
	$scope.insertCustomer = function () {
        var firstName = $scope.newCustomer.firstName;
        var lastName = $scope.newCustomer.lastName;
        var address = $scope.newCustomer.address;
        var city = $scope.newCustomer.city;
        customersService.insertCustomer(firstName, lastName, address, city);
        $scope.newCustomer.firstName = '';
        $scope.newCustomer.lastName = '';
        $scope.newCustomer.address = '';
        $scope.newCustomer.city = '';
    };
	
	 $scope.deleteCustomer = function (id) {
        customersService.deleteCustomer(id);
    };
	
});

app.controller('OrdersController', function($scope, customersService){
	init();
	
	function init(){
		$scope.customers = customersService.getCustomers();
	}
});

app.controller('NavbarController', function ($scope, $location) {
    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path) {
            return true
        } else {
            return false;
        }
    }
});

app.controller('OrderChildController', function ($scope) {		
	$scope.orderby = 'product';
    $scope.reverse = false;
    $scope.ordersTotal = 0.00;
	
	init();

    function init() {	
		if ($scope.customer && $scope.customer.orders) {
			var total = 0.0;
			for(var i=0; i < $scope.customer.orders.length; i++){
				total = total + $scope.customer.orders[i].orderTotal;
			}
			$scope.ordersTotal = total;
		}
	}
	
	$scope.setOrder = function (orderby) {
        if (orderby === $scope.orderby)
        {
            $scope.reverse = !$scope.reverse;
        }
        $scope.orderby = orderby;
    };

});

app.controller('CustomerOrdersController', function ($scope, $routeParams, customersService) {	
	init();
	
    function init(){
        var customerId = $routeParams.customerID;
    	$scope.customer = customersService.getOneCustomer(customerId);

    }
});

app.controller('ProductsController', function ($scope, customersService) {	
	$scope.orderby = 'product';
    $scope.reverse = false;
    $scope.ordersTotal = 0.00;
	
	init();
	
	function init(){
		$scope.products = customersService.getProducts();
	}
	
	$scope.setProduct = function (orderby) {
		if (orderby === $scope.orderby)
        {
            $scope.reverse = !$scope.reverse;
        }
        $scope.orderby = orderby;
    };
});
