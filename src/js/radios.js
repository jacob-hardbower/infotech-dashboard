"use strict"

/**
 * Creates radio buttons and handlers for ordering salespeople
 *
 * @param {array} salespeople Array containing salesperson objects
 */
const registerListingRadios = salespeople => {
	const sortRadios = document.getElementsByName('sort')
	const orderRadios = document.getElementsByName('order')

	let sort = "byName"
	let desc = false

	const repopulate = () => populateSalespersonList(salespeople, sort, desc)

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

/**
 * Creates radio buttons and handlers for filtering leaderboard
 *
 * @param {array} salespeople Array containing salesperson objects
 */
const registerPeriodRadios = salespeople => {
	const periodRadios = document.getElementsByName('period')

	const repopulate = period => populateLeaderboard(salespeople, period)

	for(let i = 0; i < periodRadios.length; i++) {
	  periodRadios[i].onclick = () => {
			repopulate(periodRadios[i].value)
		}
	}
}
