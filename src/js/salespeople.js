"use strict"

const populateSalespersonTable = (salespeople, sort, desc) => {

	const tableFragment = document.createDocumentFragment()

	getSalespeople[sort](salespeople, desc).forEach((salesperson) => {
		tableFragment.appendChild(createSalespersonRow(salesperson))
	})

	document.getElementById("salesperson-table").children[0].appendChild(tableFragment)
}

const getSalespeople = {
	byDeals: (salespeople, desc = true) => {
		return salespeople.sort((personOne, personTwo) => {
			var d1 = personOne.dealsClosed
	    var d2 = personTwo.dealsClosed
			if (desc)
				return (d2 < d1) ? -1 : (d2 > d1) ? 1 : 0
			else
				return (d1 < d2) ? -1 : (d1 > d2) ? 1 : 0
		})
	},
	byName: (salespeople, desc = false) => {
		return salespeople.sort((personOne, personTwo) => {
			var n1 = personOne.name.toLowerCase()
	    var n2 = personTwo.name.toLowerCase()
			if (desc)
				return (n2 < n1) ? -1 : (n2 > n1) ? 1 : 0
			else
				return (n1 < n2) ? -1 : (n1 > n2) ? 1 : 0
		})
	}
}

const createSalespersonRow = (salesperson) => {
	let row = document.createElement("tr")
	let columnOne = document.createElement("td")
	let columnTwo = document.createElement("td")
	let columnThree = document.createElement("td")

	let image = document.createElement("img")
	image.setAttribute("src", salesperson.photo)

	let name = document.createElement("span")
	name.appendChild(document.createTextNode(salesperson.name))
	name.classList.add("salesperson-name")

	let deals = document.createElement("span")
	deals.appendChild(document.createTextNode(`${salesperson.dealsClosed} closed deals`))
	deals.classList.add("closed-deals")

	let profileLink = document.createElement("a")
	profileLink.setAttribute("href", `/salespeople/${salesperson.id}`)
	profileLink.setAttribute("title", `View profile of ${salesperson.name}`)
	profileLink.appendChild(document.createTextNode("View profile"))

	let messageLink = document.createElement("a")
	messageLink.setAttribute("href", `/message/user/${salesperson.id}`)
	messageLink.setAttribute("title", `Message ${salesperson.name}`)
	messageLink.appendChild(document.createTextNode("Message"))

	columnOne.appendChild(image)
	columnOne.appendChild(name)
	columnTwo.appendChild(deals)
	columnThree.appendChild(profileLink)
	columnThree.appendChild(messageLink)

	row.appendChild(columnOne)
	row.appendChild(columnTwo)
	row.appendChild(columnThree)

	return row
}
