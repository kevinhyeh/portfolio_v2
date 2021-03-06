import React, { useState, useRef } from 'react';
import './Navigation.scss';

const Navigation = (props) => {
	const [themeToggleState, setThemeToggleState] = useState('close')
	const themeSelectRef = useRef()

	const toggleSelectHandler = themeToggleState => {
		if (themeToggleState === 'open') {
			setThemeToggleState('close')
		} else {
			setThemeToggleState('open')
			themeSelectRef.current.focus()
		}
	}

	return (
		<section className="navigation">
			<div className="navigation__select" data-select-toggle={themeToggleState}>
				<button className="navigation__select--toggle" ref={themeSelectRef} onClick={() => toggleSelectHandler(themeToggleState)} onBlur={() => toggleSelectHandler(themeToggleState)}>{props.appTheme}</button>
				<ul className="navigation__select--list">
					<li className="navigation__select--option first" onClick={() => props.changeTheme('Dark')}>Dark</li>
					<li className="navigation__select--option last" onClick={() => props.changeTheme('Light')}>Light</li>
					{/* <li className="navigation__select--option last" onClick={() => props.changeTheme('Kevin')}>Kevin</li> */}
				</ul>
			</div>
		</section>
	)
}

export default Navigation