import {ReactComponent as DropdownIcon} from './icons/dropdown.svg'
import {ReactComponent as RightChevron} from './icons/right-chevron.svg'
import {ReactComponent as HomeIcon} from './icons/home.svg'
import {ReactComponent as DiscordIcon} from './icons/discord.svg'
import {ReactComponent as BillingIcon} from './icons/bill.svg'
import {ReactComponent as AddIcon} from './icons/add.svg'
import {ReactComponent as LogoutIcon} from './icons/logout.svg'
import {ReactComponent as BackArrow} from './icons/left-arrow.svg'

import {useEffect, useState, useRef, createContext, useContext} from 'react'

import {CSSTransition} from 'react-transition-group'

const Context = createContext()

function App() {
	const refFullNavArea = useRef(null)
	const refDropdownArea = useRef(null)
	const [open, setOpen] = useState(true)
	const [menuHeight, setMenuHeight] = useState(null)
	const [activeMenu, setActiveMenu] = useState('main')

	const handleClickOutside = event => {
		if (refFullNavArea.current && !refFullNavArea.current.contains(event.target)) {
			console.log('handleClickOutside')
			setOpen(false)
		}
	}

	const getElHeight = el => {
		// setTimeout(() => setMenuHeight(refDropdownArea.current.offsetHeight), 200)
		setMenuHeight(el.offsetHeight)

		// setTimeout(() => console.log(refDropdownArea.current.offsetHeight), 500)
		// setTimeout(() => console.log(refDropdownArea.current.offsetHeight), 1000)
		// setTimeout(() => console.log(document.querySelector('.dropdown').offsetHeight), 1000)

		// setTimeout(() => console.log(document.querySelector('.dropdown').offsetHeight), 200)
		// console.log(document.querySelector('.dropdown').offsetHeight)

		// console.log(refDropdownArea.current.offsetHeight)

		// console.log(el.parentNode)
	}

	useEffect(() => {
		if (open) {
			document.addEventListener('mousedown', handleClickOutside)
		}
		return () => {
			console.log('cleanup')
			setActiveMenu('main')
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [open])

	return (
		<Context.Provider
			value={{
				refFullNavArea,
				refDropdownArea,
				open,
				setOpen,
				activeMenu,
				setActiveMenu,
				getElHeight,
				menuHeight,
			}}
		>
			<Navbar>
				<NavItem icon={<DropdownIcon />}>
					<DropdownMenu />
				</NavItem>
			</Navbar>
		</Context.Provider>
	)
}

function Navbar({children}) {
	const {refFullNavArea} = useContext(Context)
	return (
		<nav className='navbar' ref={refFullNavArea}>
			<ul className='navbar-nav'>{children}</ul>
		</nav>
	)
}

function NavItem({children, icon}) {
	const {open, setOpen} = useContext(Context)

	return (
		<li className='nav-item'>
			<a href='#' onClick={() => setOpen(!open)} className='icon-button --circle-button'>
				{icon}
			</a>
			{open && children}
		</li>
	)
}

function DropdownItem({children, leadingIcon, trailingIcon, ...restProps}) {
	return (
		<a href='#' className='menu-item' {...restProps}>
			<div className='menu-item-group'>
				<span className='icon-button --leading'>{leadingIcon}</span>
				{children}
			</div>
			<span className='icon-button --trailing'>{trailingIcon}</span>
		</a>
	)
}

function DropdownTitle({children, leadingIcon, onClick}) {
	return (
		<div className='menu-title'>
			<a href='#' className='icon-button --circle-button --leading' onClick={onClick}>
				{leadingIcon}
			</a>
			{children}
		</div>
	)
}

function DropdownMenu() {
	const menuSeparator = <div className='menu-separator'></div>
	const {activeMenu, setActiveMenu, getElHeight, refDropdownArea, menuHeight} = useContext(Context)

	return (
		<div className='dropdown' ref={refDropdownArea} style={{height: menuHeight}}>
			<CSSTransition
				in={activeMenu === 'main'}
				unmountOnExit
				timeout={500}
				classNames='menu-primary'
				onEnter={getElHeight}
			>
				<div className='menu'>
					<DropdownItem
						leadingIcon={<img src='images/profile.jpeg' />}
						trailingIcon={<RightChevron />}
						onClick={() => setActiveMenu('profile')}
					>
						Edit Profile
					</DropdownItem>
					{menuSeparator}
					<DropdownItem leadingIcon={<HomeIcon />}>Dashboard</DropdownItem>
					<DropdownItem leadingIcon={<DiscordIcon />}>Open Discord</DropdownItem>
					<DropdownItem leadingIcon={<BillingIcon />}>Billing</DropdownItem>
					<DropdownItem leadingIcon={<AddIcon />}>New scrim</DropdownItem>
					{menuSeparator}
					<DropdownItem leadingIcon={<LogoutIcon />}>Logout</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition
				in={activeMenu === 'profile'}
				unmountOnExit
				timeout={500}
				classNames='menu-secondary'
				onEnter={getElHeight}
			>
				<div className='menu'>
					<DropdownTitle leadingIcon={<BackArrow />} onClick={() => setActiveMenu('main')}>
						Edit Profile
					</DropdownTitle>
					<div className='form-wrapper'>
						<input value={'Ladzies'} placeholder={'Your name'} />
						<textarea value={``} placeholder={'About me'} />
						<div className='button-wrapper'>
							<button className='btn btn-secondary' onClick={() => setActiveMenu('main')}>
								Go Back
							</button>
							<button className='btn btn-primary'>Update Profile</button>
						</div>
					</div>
				</div>
			</CSSTransition>
		</div>
	)
}

export default App
