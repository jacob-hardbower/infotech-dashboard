"use strict"

const createSalespersonTable = (salespeople) => {
	var table = document.createDocumentFragment()
	salespeople.forEach(createSalespersonRow)
}

const createSalespersonRow = (salesperson) => {
	console.log(salesperson.name);
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
