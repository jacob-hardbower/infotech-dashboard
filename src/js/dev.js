"use strict"

const disableLinks = () => {
	const links = document.getElementsByTagName("a")
	for(let i = 0; i < links.length; i++) {
		links[i].onclick = (e) => {
			e.preventDefault()
		}
	}
}

const autopopulateFeed = (salespeople) => {

	const feed = document.getElementById("feed")

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

	const randomSalespersonObj = () => {
		const person = salespeople[randomNumberBetween(0, salespeople.length - 1)]
		return {
			message: messages[randomNumberBetween(0, messages.length - 1)],
			name: person.name,
			photo: person.photo
		}
	}

	// setTimeout(() => {
	// 	addToList(feed, createFeedItem(randomSalespersonObj()))
	// }, 2000)

	setInterval(() => {
		addToList(feed, createFeedItem(randomSalespersonObj()))
	}, randomNumberBetween(3000, 8000))
}

const addToList = (feed, item) => {
	if(feed.childElementCount > 9) {
		feed.lastElementChild.remove()
	}
	animateListAddition(feed, item)
}

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

const randomNumberBetween = (num1,num2) => {
	return Math.round(Math.random() * (num2 - num1)) + num1
}
