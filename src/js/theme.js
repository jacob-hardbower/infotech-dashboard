"use strict"

/**
 * Creates radio buttons and handlers for filtering leaderboard
 */
const registerThemeToggle = () => {
	let lightTheme = true
	const themeToggle = document.getElementById('theme-checkbox')
	themeToggle.onchange = () => {
		const body = document.getElementsByTagName("body")[0]
		if(lightTheme) {
			body.classList.add("-dark")
			lightTheme = false
		} else {
			body.classList.remove("-dark")
			lightTheme = true
		}
	}
}
