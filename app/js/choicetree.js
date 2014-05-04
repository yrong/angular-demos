



function ChoiceTreeCtrl($scope) {
		   function Choice(name, children) {
			  this.name = name;
			  this.checked = false;
			  this.children = children || [];
			}

			var apparel = new Choice('Apparel', [
			  new Choice('Mens Shirts', [
				new Choice('Mens Special Shirts'),
			  ]),
			  new Choice('Womens Shirts'),
			  new Choice('Pants')
			]);
			var boats = new Choice('Boats');	
			
		  $scope.name = 'World';
  
		  $scope.myTree = [apparel, boats]; 
		}
