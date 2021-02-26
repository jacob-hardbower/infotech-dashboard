"use strict"

const createSalespersonTable = (salespeople) => {
	var table = document.createDocumentFragment()
	salespeople.forEach(createSalespersonRow)
}

const createSalespersonRow = (salesperson) => {
	console.log(salesperson.name);
}
}
