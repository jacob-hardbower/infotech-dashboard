"use strict"

const disableLinks = () => {
	const links = document.getElementsByTagName("a")
	for(let i = 0; i < links.length; i++) {
		links[i].onclick = (e) => {
			e.preventDefault()
		}
	}
}