app.service('customersService', function($http){

	var customers = [];
	var products = [];

	this.getCustomers = function () {
		if(customers.length == 0){
			$http.post('post.php', { "action" : "fetchAll" }
			).success(function(data, status, headers, config) {			
				data.forEach(function(entry) {
					var orders = [];
					entry.orders.forEach(function(or) {
						orders.push({
							product : or.product, 
							price : or.price, 
							quantity : or.quantity, 
							orderTotal : or.orderTotal
						});
					});				
					customers.push({
						id : entry.id,
						firstName : entry.firstName,
						lastName : entry.lastName, 
						address : entry.address, 
						city : entry.city,
						orders : orders
					});
				});			
			}).error(function(data, status) { 
				alert("err");
			});
		}
		
		return customers;
	};

	this.insertCustomer = function (firstName, lastName, address, city) {
		var topID = customers.length + 1;

		$http.post('post.php', { "action" : "insert", 
			"id" : topID, "firstName" : firstName, 
			"lastName" : lastName, "address" : address, "city" : city }
		).success(function(data, status, headers, config) {			
			customers.push({
	            id: topID,
	            firstName: firstName,
	            lastName: lastName,
	            address: address,
	            city: city
	        });
		}).error(function(data, status) { 
			alert("err");
		});
    };

    this.deleteCustomer = function (id) { 
        $http.post('post.php', { "action" : "delete", "id" : id }
		).success(function(data, status, headers, config) {			
			for (var i = customers.length - 1; i >= 0; i--) {
	            if (customers[i].id == id) {
	                customers.splice(i, 1);
	                break;
	            }
	        }
		}).error(function(data, status) { 
			alert("err");
		});
    };
    
    this.getOneCustomer = function (customerId) { 
    	for (var i = customers.length - 1; i >= 0; i--) {
            if (customers[i].id == customerId) {
                return customers[i];
            }
        }
    }
    
    this.getProducts = function () {
		if(products.length == 0){
			$http.post('post.php', { "action" : "fetchProducts" }
			).success(function(data, status, headers, config) {			
				data.forEach(function(entry) {	
					products.push({
						proID : entry.proID,
						product : entry.product,
						price : entry.price,
						quantity : entry.quantity, 
						orderTotal : entry.orderTotal
					});
				});			
			}).error(function(data, status) { 
				alert("err");
			});
		}
		
		return products;
	};
	
});
