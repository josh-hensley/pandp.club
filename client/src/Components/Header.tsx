import Auth from '../utils/auth';
import './Header.css'

const Header = () => {
    const handleMenuButtonClick = () => {
        document.querySelector('.dropdown')?.classList.toggle('active');
        document.querySelectorAll('.hamburger-bar').forEach((item) => { item.classList.toggle('close') })
    }
    
    return (
        <header>
            <div className="navbar">
                <div className="logo">
                    <a href="/">🍿</a>
                </div>
                <nav>
                    <button className="btn-menu" onClick={handleMenuButtonClick}>
                        <div className="hamburger-bar bar-1"></div>
                        <div className="hamburger-bar bar-2"></div>
                        <div className="hamburger-bar bar-3"></div>
                    </button>
                </nav>
            </div>
            <div className="dropdown">
                <ul>
                    <li><a href="/past">Past Films</a></li>
                    <li><a href="/queue">View Queue</a></li>
                    <li><a href="/search">Search</a></li>
                    {Auth.loggedIn() ? <li><a href="/" onClick={() => Auth.logout()}>Logout</a></li> : <li><a href="/login">Login</a></li>}
                    
                </ul>
            </div>
        </header>
    )
}

export default Header