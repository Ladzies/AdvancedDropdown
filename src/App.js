function App() {
	return (
		<Navbar>
			<NavItem icon='B'>hello</NavItem>
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

function NavItem({icon}) {
	return (
		<li className='nav-item'>
			<a href='#' className='icon-button'>
				{icon}
			</a>
		</li>
	)
}

export default App
