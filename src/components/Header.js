import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isAdmin, handleSignOut }) {
	return (
		<header>
			<h1><Link to="/">Hidden in Plain Sight</Link></h1>
			<nav>
				<ul>
					<li><Link to="/leaderboard">Leaderboard</Link></li>
					<li><Link to="/login">Admin</Link></li>
					{isAdmin ? (
						<li>
							<button type="button" onClick={handleSignOut}>Sign Out</button>
						</li>) : null}
				</ul>
			</nav>
		</header>
	);
}

export default Header;
