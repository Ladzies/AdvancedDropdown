import {ReactComponent as DropdownIcon} from './icons/dropdown.svg'
import {ReactComponent as RightChevron} from './icons/right-chevron.svg'
import {ReactComponent as HomeIcon} from './icons/home.svg'
import {ReactComponent as DiscordIcon} from './icons/discord.svg'
import {ReactComponent as BillingIcon} from './icons/bill.svg'
import {ReactComponent as AddIcon} from './icons/add.svg'
import {ReactComponent as LogoutIcon} from './icons/logout.svg'
import {ReactComponent as BackArrow} from './icons/left-arrow.svg'

import React, {useState} from 'react'
import {CSSTransition} from 'react-transition-group'
// import ReactCSSTransitionGroup from 'react-transition-group'

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
				className='icon-button --circle-button'
				onClick={() => setOpen(!open)}
			>
				{icon}
			</a>
			{open && children}
		</li>
	)
}

function DropDownMenu() {
	const [activeMenu, setActiveMenu] = useState('main')
	const [menuHeight, setMenuHeight] = useState(null)

	// let firstComuted = 0

	function getHeight(el) {
		setMenuHeight(el.parentNode.offsetHeight)
	}

	function DropDownItem({
		children,
		leftIcon,
		rightIcon,
		...props
	}) {
		return (
			<a href='#' className='menu-item' {...props}>
				<div className='menu-item-group'>
					<span className='icon-button --menu-button-left'>
						{leftIcon}
					</span>
					{children}
				</div>
				<span className='icon-button --menu-button-right'>
					{rightIcon}
				</span>
			</a>
		)
	}

	return (
		<div className='dropdown' style={{height: menuHeight}}>
			<CSSTransition
				in={activeMenu === 'main'}
				unmountOnExit
				timeout={500}
				classNames='menu-primary'
				onEnter={getHeight}
			>
				<div className='menu'>
					<DropDownItem
						leftIcon={<img src='./images/profile.jpeg' />}
						rightIcon={<RightChevron />}
						onClick={() => setActiveMenu('profile')}
					>
						Edit Profile
					</DropDownItem>
					<div className='menu-separator'></div>
					<DropDownItem leftIcon={<HomeIcon />}>
						Dashboard
					</DropDownItem>
					<DropDownItem leftIcon={<DiscordIcon />}>
						Open Discord
					</DropDownItem>
					<DropDownItem leftIcon={<BillingIcon />}>
						Billing
					</DropDownItem>
					<DropDownItem leftIcon={<AddIcon />}>
						New scrim
					</DropDownItem>
					<div className='menu-separator'></div>
					<DropDownItem leftIcon={<LogoutIcon />}>
						Log out
					</DropDownItem>
				</div>
			</CSSTransition>

			<CSSTransition
				in={activeMenu === 'profile'}
				unmountOnExit
				timeout={500}
				classNames='menu-secondary'
				onEnter={setMenuHeight(100)} //firstComuted
			>
				<div className='menu'>
					<DropDownItem
						leftIcon={<BackArrow />}
						onClick={() => setActiveMenu('main')}
					>
						Edit Profile
					</DropDownItem>
					<input />
					<textarea />
				</div>
			</CSSTransition>
		</div>
	)
}

export default App
