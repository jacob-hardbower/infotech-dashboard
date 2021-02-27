"use strict"

const registerRadios = salespeople => {
	const sortRadios = document.getElementsByName('sort')
	const orderRadios = document.getElementsByName('order')

	let sort = "byName"
	let desc = false

	const repopulate = () => {
		populateSalespersonList(salespeople, sort, desc)
	}

	for(let i = 0; i < sortRadios.length; i++) {
	  sortRadios[i].onclick = () => {
			sort = sortRadios[i].value
			repopulate()
		}
	}
	for(let i = 0; i < orderRadios.length; i++) {
	  orderRadios[i].onclick = () => {
			desc = orderRadios[i].value === "desc" ? true : false
			repopulate()
		}
	}
}
