import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import LevelSelectPage from '../pages/LevelSelectPage';
import LevelPage from '../pages/LevelPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import CreateLevelPage from '../pages/CreateLevelPage';
import EditLevelPage from '../pages/EditLevelPage';
import AdminRoute from './AdminRoute';

function RouteSwitch({ isAdmin }) {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<LevelSelectPage />} />
				<Route path="/level/create"
					element={
						<AdminRoute isAdmin={isAdmin}>
							<CreateLevelPage />
						</AdminRoute>
					}
				/>
				<Route path="/level/:id" element={<LevelPage />}>
					<Route path="edit"
						element={
							<AdminRoute isAdmin={isAdmin}>
								<EditLevelPage />
							</AdminRoute>
						}
					/>
				</Route>
				<Route path="/leaderboard" element={<LeaderboardPage />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default RouteSwitch;
