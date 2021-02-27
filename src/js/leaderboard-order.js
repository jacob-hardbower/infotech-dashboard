"use strict"

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
