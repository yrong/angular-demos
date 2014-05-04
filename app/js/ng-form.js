function FormController(scope) {
	scope.fields = [
		{ name: 'username', isRequired: true},
		{ name: 'password', isRequired: true },
		{ name: 'email', isRequired: false}
	];
}
FormController.$inject = ['$scope'];