"use strict"

/**
 * Creates and populates the leaderboard
 *
 * @param {array} salespeople Array containing salesperson objects
 */
const populateLeaderboard = (salespeople, period = "day") => {
	const list = document.getElementById("leaderboard")
	clearPopulatedList(list)
	const leaders = getLeaders(salespeople, period)
	list.appendChild(createList(leaders, 'byDeals', true))
}

/**
 * Creates and populates the main list of salespeople
 *
 * @param {array} salespeople Array containing salesperson objects
 * @param {string} sort Method for which to sort the salespeople
 * @param {bool} desc Whether the sort method should be done in descending order
 */
const populateSalespersonList = (salespeople, sort = "byName", desc = false) => {
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
 * Returns array of salespeople based on performance
 *
 * @param {array} salespeople Array containing salesperson objects
 * @param {string} period Time period of performance
 * @return {array} Top performing salespeople for given period
 */
const getLeaders = (salespeople, period) => {
	switch (period) {
		case "day":
			return salespeople.filter(person => person.topPerformer.day === true)
		case "week":
			return salespeople.filter(person => person.topPerformer.week === true)
		case "month":
			return salespeople.filter(person => person.topPerformer.month === true)
		default: {
			return salespeople.filter(person => {
				return isTopPerformer(person)
			})
		}
	}
}

/**
 * Determines if person is top performer in any time period
 *
 * @param {object} person Object containing person's data
 * @return {bool} true if person is top performer in any time period
 */
const isTopPerformer = person => {
	return (
		person.topPerformer.day === true ||
		person.topPerformer.week === true ||
		person.topPerformer.month === true
	)
}

/**
 * Creates and populates a document fragment with salespeople
 *
 * @param {array} salespeople Array containing salesperson objects
 * @param {string} sort Method for which to sort the salespeople
 * @param {bool} desc Whether the sort method should be done in descending order
 * @param {int} length How long the returned list should be
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
const createSalespersonRow = (salesperson, topPerformer = false) => {
	const row = document.createElement("li")

	const image = document.createElement("img")
	image.setAttribute("alt", `Headshot photo of ${salesperson.name}`)
	image.setAttribute("src", salesperson.photo)

	const name = document.createElement("h3")
	name.appendChild(document.createTextNode(salesperson.name))
	name.classList.add("salesperson-name")

	const deals = document.createElement("p")
	deals.appendChild(document.createTextNode(salesperson.dealsClosed))
	deals.classList.add("closed-deals")

	const dealSpan = deals.appendChild(document.createElement("span"))
	dealSpan.appendChild(document.createTextNode(" closed deals"))

	const profileLink = document.createElement("a")
	profileLink.setAttribute("href", `/salespeople/${salesperson.id}`)
	profileLink.setAttribute("title", `View profile of ${salesperson.name}`)

	const viewSpan = document.createElement("span")
	viewSpan.appendChild(document.createTextNode("View "))
	profileLink.appendChild(viewSpan)
	profileLink.appendChild(document.createTextNode("Profile"))

	const messageLink = document.createElement("a")
	messageLink.setAttribute("href", `/message/user/${salesperson.id}`)
	messageLink.setAttribute("title", `Message ${salesperson.name}`)
	messageLink.appendChild(document.createTextNode("Message"))

	const links = document.createElement("div")
	links.classList.add("links-section")

	links.appendChild(profileLink)
	links.appendChild(messageLink)

	row.appendChild(image)
	row.appendChild(name)
	row.appendChild(deals)
	row.appendChild(links)

	if(isTopPerformer(salesperson)) {
		const topPerformer = document.createElement("p")
		topPerformer.classList.add("top-performer-tag")
		topPerformer.appendChild(document.createTextNode("Top Performer"))
		row.appendChild(topPerformer)
	}

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
		const row = createFeedItem(salesperson)
		listFragment.appendChild(row)
	})

	return listFragment
}

/**
 * Creates a list item element containing salesperson data
 *
 * @param {array} salesperson Object containing details of a salesperson
 * @return {object} list item for feed
 */
const createFeedItem = salesperson => {
	const row = document.createElement("li")

	const image = document.createElement("img")
	image.setAttribute("alt", `Headshot photo of ${salesperson.name}`)
	image.setAttribute("src", salesperson.photo)

	const textContainer = document.createElement("div")
	textContainer.classList.add("text-group")

	const name = document.createElement("h3")
	name.appendChild(document.createTextNode(salesperson.name))
	name.classList.add("salesperson-name")

	const message = document.createElement("p")
	message.appendChild(document.createTextNode(`${salesperson.message}`))
	message.classList.add("sales-message")

	textContainer.appendChild(name)
	textContainer.appendChild(message)

	row.appendChild(image)
	row.appendChild(textContainer)

	return row
}
