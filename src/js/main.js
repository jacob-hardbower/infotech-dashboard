"use strict"

const salespeople = getSalesPeople()
populateLeaderboard(salespeople, 'byDeals', false)
populateSalespersonList(salespeople, 'byName', true)
