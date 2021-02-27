"use strict"

const salespeople = getSalesPeople()
const feed = getFeed()
// Initial population
populateLeaderboard(salespeople)
populateSalespersonList(salespeople)
populateFeed(feed)

registerListingRadios(salespeople)
registerPeriodRadios(salespeople)
