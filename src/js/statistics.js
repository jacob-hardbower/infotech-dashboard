"use strict"

/**
 * Replaces contents of statistics with data
 *
 * @param {array} salespeople Array containing salesperson objects
 */
const populateStats = (salespeople) => {
	const dealStat = document.getElementById("deals-stat")
	dealStat.innerHTML = getTotalDealsClosed(salespeople).toLocaleString()

	const valueStat = document.getElementById("value-stat")
	valueStat.innerHTML = "$100,345"
}

/**
 * Iterates the salespeople array to get total closed deals
 *
 * @param {array} salespeople Array containing salesperson objects
 * @return {int} total number of closed deals
 */
const getTotalDealsClosed = (salespeople) => {
	return salespeople.reduce((sum, person) => {
		return sum += person.dealsClosed
	}, 0)
}
