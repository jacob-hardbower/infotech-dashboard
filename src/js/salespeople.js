"use strict"

/**
 * Creates and populates the leaderboard
 *
 * @param {array} salespeople Array containing salesperson objects
 */
const populateLeaderboard = (salespeople) => {
	const list = document.getElementById("leaderboard")
	clearPopulatedList(list)
	list.appendChild(createList(salespeople, 'byDeals', false, 3))
}

/**
 * Creates and populates the main list of salespeople
 *
 * @param {array} salespeople Array containing salesperson objects
 * @param {string} sort Method for which to sort the salespeople
 * @param {bool} desc Whether the sort method should be done in descending order
 */
const populateSalespersonList = (salespeople, sort = "byName", desc = true) => {
	const list = document.getElementById("primary-salesperson-list")
	clearPopulatedList(list)
	list.appendChild(createList(salespeople, sort, desc))
}

/**
 * Creates and populates the feed
 *
 * @param {array} salespeople Array containing salesperson objects
 * @param {string} sort Method for which to sort the salespeople
 * @param {bool} desc Whether the sort method should be done in descending order
 */
const populateFeed = (salespeople) => {
	const feed = document.getElementById("feed")
	clearPopulatedList(feed)
	feed.appendChild(createFeed(salespeople))
}

/**
 * Clears existing lists of salespeople
 * Could be improved, as this requires img requests be made again.
 *
 * @param {obj} list <ol> element to be emptied
 */
const clearPopulatedList = list => {
	if(list.children[0] !== undefined) {
		while (list.firstChild) {
			list.removeChild(list.lastChild);
		}
	}
}

/**
 * Creates and populates a document fragment with salespeople
 *
 * @param {array} salespeople Array containing salesperson objects
 * @param {string} sort Method for which to sort the salespeople
 * @param {bool} desc Whether the sort method should be done in descending order
 * @return {obj} document fragment with salespeople
 */
const createList = (salespeople, sort, desc, length = null) => {
	const listFragment = document.createDocumentFragment()
	// Use sort string to access desired sorting method of getSalesPeople object.
	// Pass copy of salespeople with listing order to sorting function.
	const sortedList = getSalespeople[sort](salespeople.concat(), desc)
	const limit = length ? length : sortedList.length
	for(let i = 0; i < limit; i++) {
		listFragment.appendChild(createSalespersonRow(sortedList[i]))
	}
	return listFragment
}

/**
 * Interface for sorting methods
 * The functions within return sorted salespeople arrays
 *
 * @param {array} salespeople Array containing salesperson objects
 * @param {bool} desc Whether the sort method should be done in descending order
 * @return {array} sorted salespeople array
 */
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

/**
 * Factory for salesperson list item elements
 *
 * @param {object} salesperson Object containing details of a salesperson
 * @return {object} li element containing the html to display a salesperson
 */
const createSalespersonRow = (salesperson) => {
	let row = document.createElement("li")

	let image = document.createElement("img")
	image.setAttribute("alt", `Headshot photo of ${salesperson.name}`)
	image.setAttribute("src", salesperson.photo)

	let name = document.createElement("h3")
	name.appendChild(document.createTextNode(salesperson.name))
	name.classList.add("salesperson-name")

	let deals = document.createElement("p")
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

	let links = document.createElement("div")
	links.classList.add("links-section")

	links.appendChild(profileLink)
	links.appendChild(messageLink)

	row.appendChild(image)
	row.appendChild(name)
	row.appendChild(deals)
	row.appendChild(links)

	return row
}

/**
 * Factory for feed list item elements
 *
 * @param {array} salespeople Array containing salesperson objects
 * @return {object} document fragment containing list items for feed
 */
const createFeed = salespeople => {
	const listFragment = document.createDocumentFragment()
	salespeople.forEach(salesperson => {
		let row = document.createElement("li")

		let image = document.createElement("img")
		image.setAttribute("alt", `Headshot photo of ${salesperson.name}`)
		image.setAttribute("src", salesperson.photo)

		let name = document.createElement("h3")
		name.appendChild(document.createTextNode(salesperson.name))
		name.classList.add("salesperson-name")

		let message = document.createElement("p")
		message.appendChild(document.createTextNode(`${salesperson.message}`))
		message.classList.add("sales-message")

		row.appendChild(image)
		row.appendChild(name)
		row.appendChild(message)

		listFragment.appendChild(row)
	})

	return listFragment
}
