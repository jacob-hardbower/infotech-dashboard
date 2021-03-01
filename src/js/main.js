"use strict"

const prefersLight = initializeTheme()
registerThemeToggle(prefersLight)

// Get data and populate the page
const salespeople = getSalesPeople()
const feed = getFeed()
populateLeaderboard(salespeople)
populateSalespersonList(salespeople)
populateFeed(feed)
populateStats(salespeople)

// Attach radio buttons to sorting/filtering
registerListingRadios(salespeople)
registerPeriodRadios(salespeople)

disableLinks()
