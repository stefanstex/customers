<!DOCTYPE html>
<html data-ng-app="customersApp">
<head>
    <title>Customer Manager | Angular JS | MongoDB</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/bootstrap.min.css" rel="stylesheet" />
	<link href="css/style.css" rel="stylesheet">
</head>
<body>

	<div class="navbar navbar-default navbar-static-top">
		<div class="container">
			
			<div class="navbar-header">
				<a href="#" class="navbar-brand"><img src="images/people.jpeg" alt="logo" class="logo-img">1Customer Manager</a>
				
				<button class="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			</div>
			
			<div class="collapse navbar-collapse navHeaderCollapse">
			
				<ul class="nav navbar-nav" data-ng-controller="NavbarController">
					
					<li data-ng-class="{'active':getClass('/customers')}"><a href="#/">Customers</a></li>
					<li data-ng-class="{'active':getClass('/orders')}"><a href="#/orders">Orders</a></li>
					<li data-ng-class="{'active':getClass('/products')}"><a href="#/products">Products</a></li>
				
				</ul>
			
			</div>
			
		</div>
	</div>
	<div class="container">
		<!-- Placeholders for views -->
		<div data-ng-view=""></div>
	</div>

	<footer class="navbar navbar-default navbar-fixed-bottom">
		<div class="container">
			<p class="navbar-text pull-left">App Built By Stefan</p>
			<a href="#" class="navbar-btn btn-danger btn pull-right">Subscribe on Youtube</a>
		</div>
	</footer>	
	
	<script src="js/jquery.min.js"></script>
	<script src="js/angular.js"></script>
	
	<!-- UI libs -->
	<script src="js/bootstrap.js"></script>
	
	<!-- App libs -->
    <script src="app/app.js"></script>
    <script src="app/controllers/controllers.js"></script>
	<script src="app/services/customersService.js"></script>
	
</body>
</html>
