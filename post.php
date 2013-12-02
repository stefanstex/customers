<?php 

	$data = file_get_contents("php://input");
	
	$objData = json_decode($data);
	
	if($objData->action == "fetchAll"){	
		print fetchAll();	
	}
	if($objData->action == "insert"){
		insert($objData->id, $objData->firstName, $objData->lastName, $objData->address, $objData->city);		
	}
	if($objData->action == "delete"){
		delete($objData->id);
	}
	if($objData->action == "fetchOne"){
		print fetchOne($objData->id);
	}
	if($objData->action == "fetchProducts"){
		print fetchProducts();
	}
	
	function connect(){
		$m = new MongoClient("mongodb://root:root@ds053668.mongolab.com:53668/test123");
		
		$db = $m->test123;
		
		return $db;
	}	

		
	function fetchAll(){
		$collection = connect()->customers;
		
		$data = $collection->find();
		
		$customers = array();
		
		foreach ($data as $document) {
		    $customers[] = $document;
		}
		
		return json_encode($customers);
	}	
	
	function fetchOne($id){
		$collection = connect()->customers;
	
		$data = $collection->find(array( "id" => $id ));
		
		$customers = array();
		
		foreach ($data as $document) {
		    $customers[] = $document;
		}
		
		return json_encode($customers[0]);
	}
	
	
	function insert($id, $firstName, $lastName, $address, $city){		
		$collection = connect()->customers;
		
		$document = array(
			'id' => $id,
			'firstName' => $firstName,
			'lastName' => $lastName,
			'address' => $address,
			'city' => $city,
			'orders' => array()
		);
		
		return $collection->insert($document);
		
	}
	
	function delete($id){
		$collection = connect()->customers;
	
		return $collection->remove(array( 'id' => $id ));
	
	}
	
	function fetchProducts(){
		$collection = connect()->customers;
	
		$data = $collection->find();
	
		$orders = array();
		$ids = array();
	
		foreach ($data as $document) {
			foreach ($document['orders'] as $key => $order){
				if(!in_array($order['proID'], $ids)){
					$orders[$order['proID']] = $order;
					$ids[] = $key;
				}else{
					$orders[$order['proID']] = array(
								'proID' => $order['proID'],
								'product' => $order['product'],
								'price' => $order['price'],
								'quantity' => $orders[$order['proID']]['quantity'] + $order['quantity'],
								'orderTotal' => $orders[$order['proID']]['orderTotal'] + $order['orderTotal']
							); 
				}
			}			
		}
		
		$product = array();
		
		foreach($orders as $order){
			$product[] = $order;
		}
		
		return json_encode($product);

	}

	
?>
