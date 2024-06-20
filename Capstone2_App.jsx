import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './Capstone2_pages_LoginPage';
import HomePage from './Capstone2_pages_HomePage';
import SearchPage from './Capstone2_pages_SearchPage';
import ResultsPage from './Capstone2_pages_ResultsPage';
import FavoritesPage from './Capstone2_pages_FavoritesPage';
import ProfilePage from './Capstone2_pages_ProfilePage';
import ProfileEditPage from './Capstone2_pages_ProfileEditPage';
import RegisterPage from './Capstone2_pages_RegisterPage';
import RecipeDetailsPage from './Capstone2_pages_RecipeDetailsPage';
import './Capstone2_App.css';


const App = () => {
    return (
        <div className="app-container">
        <Router>
            <header>
                    <h1>Vegan Recipes</h1>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/search">Search</a>
                        <a href="/favorites">Favorites</a>
                        <a href="/profile">Profile</a>
                        <a href="/login">Login</a>
                    </nav>
                </header>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/search" component={SearchPage} />
                    <Route path="/results" component={ResultsPage} />
                    <Route path="/favorites" component={FavoritesPage} />
                    <Route path="/profile" exact component={ProfilePage} />
                    <Route path="/profile/edit" component={ProfileEditPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/recipe/:id" component={RecipeDetailsPage} />
                </Switch>
                <footer>
                    <p>&copy; 2024 Vegan Recipes</p>
                </footer>
            </Router>
        </div>
    );
}

export default App;
