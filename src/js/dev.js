"use strict"

/**
 * Disables <a> tags, because they do not work
 */
const disableLinks = () => {
	const links = document.getElementsByTagName("a")
	for(let i = 0; i < links.length; i++) {
		links[i].onclick = (e) => {
			e.preventDefault()
		}
	}
}

/**
 * Regularly updates feed with mock data
 *
 * @param {array} salespeople Array containing salesperson objects
 */
const autopopulateFeed = (salespeople) => {
	const feed = document.getElementById("feed")

	setInterval(() => {
		addToList(feed, createFeedItem(randomSalespersonObj(salespeople)))
	}, randomNumberBetween(3000, 8000))

}

/**
 * Creates a random feed item object
 * @param {array} salespeople Array containing salesperson objects
 * @return {object} object with random data
 */
const randomSalespersonObj = (salespeople) => {
	const person = salespeople[randomNumberBetween(0, salespeople.length - 1)]
	const messages = [
		"Closed a deal",
		"Made a sale",
		"Added a lead",
		"Made a cold call",
		"Lost a key account",
		"Added an opp",
		"Won an account",
		"Met with a client"
	]
	return {
		message: messages[randomNumberBetween(0, messages.length - 1)],
		name: person.name,
		photo: person.photo
	}
}

/**
 * Adds a given item to a given list
 *
 * @param {object} feed The list
 * @param {object} item Item to be added to the list
 */
const addToList = (feed, item) => {
	if(feed.childElementCount > 9) {
		feed.lastElementChild.remove()
	}
	animateListAddition(feed, item)
}

/**
 * Animates the addition of an item to a list
 *
 * @param {object} feed The list
 * @param {object} item Item to be added to the list
 */
const animateListAddition = (feed, item) => {
	item.style.opacity = 0
	item.style.transform = "translateX(-20px)"
	item.style.position = "absolute"

	feed.prepend(item)

	feed.style.transition = 'padding-top .15s linear'
	feed.style.paddingTop = `${item.offsetHeight + 10}px`

	item.style.transform = "translateX(0)"
	item.style.top = "0"
	item.style.opacity = 1

	setTimeout(() => {
		feed.style.transition = 'none'
		feed.style.paddingTop = '0px'
		item.style.top = "0"
		item.style.position = "relative"
	}, 300)
}

/**
 * Returns an integer between the given numbers
 *
 * @param {int} num1 First number
 * @param {int} num2 Second number
 * @return {int} Random integer between provided numbers
 */
const randomNumberBetween = (num1, num2) => {
	return Math.round(Math.random() * (num2 - num1)) + num1
}
