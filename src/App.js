import {ReactComponent as DropdownIcon} from './icons/dropdown.svg'
import {ReactComponent as RightChevron} from './icons/right-chevron.svg'
import React, {useState} from 'react'

function App() {
	return (
		<Navbar>
			<NavItem icon={<DropdownIcon />}>
				<DropDownMenu />
			</NavItem>
		</Navbar>
	)
}

function Navbar({children}) {
	return (
		<nav className='navbar'>
			<ul className='navbar-nav'>{children}</ul>
		</nav>
	)
}

function NavItem({children, icon}) {
	const [open, setOpen] = useState(true)
	return (
		<li className='nav-item'>
			<a
				href='#'
				className='icon-button'
				onClick={() => setOpen(!open)}
			>
				{icon}
			</a>
			{open && children}
		</li>
	)
}

function DropDownMenu() {
	function DropDownItem({children, leftIcon, rightIcon}) {
		return (
			<a href='#' className='menu-item'>
				<span className='icon-button'>{leftIcon}</span>
				{children}
				<span className='icon-button'>{rightIcon}</span>
			</a>
		)
	}
	return (
		<div className='dropdown'>
			<DropDownItem rightIcon={<RightChevron />}>
				My profile
			</DropDownItem>
			<DropDownItem
				leftIcon={<DropdownIcon />}
			></DropDownItem>
		</div>
	)
}

export default App
