"use strict"

/**
 * Sets page theme to user's preferred color scheme
 *
 * @return {bool} Whether user prefers light color scheme
 */
const initializeTheme = () => {
	const preferenceDetector = document.getElementById("preference-detector")
	const styles = getComputedStyle(preferenceDetector)
	let prefersLight = true
	if(styles.color === "rgb(0, 0, 0)") {
		prefersLight = false
		document.getElementsByTagName("body")[0].classList.add("-dark")
	}
	return prefersLight
}

 /**
  * Creates radio buttons and handlers for filtering leaderboard
  *
  * @param {bool} prefersLight Whether user prefers light color scheme
  */
const registerThemeToggle = (prefersLight) => {
	let lightTheme = prefersLight
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
