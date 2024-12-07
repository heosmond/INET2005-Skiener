import { Link } from 'react-router-dom';

export default function Nav({loggedIn}) {
    return (
        <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                    <Link to='/' className='navbar-brand'>
                        <img src="/yarn-logo.png" width="30" height="30" className="d-inline-block align-top" alt="" /> 
                        Skiener Yarns
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Link to="/" className="nav-item nav-link">Home</Link>
                            {loggedIn ?
                            <Link to="/logout" className="nav-item nav-link">Logout</Link> :
                            <Link to="/login" className="nav-item nav-link">Login</Link>}

                            <div className="d-flex justify-content-start">
                                <Link to="/cart" className="nav-item nav-link">
                                    <img src="/bag-fill.svg" width="23" className="d-inline-block align-top" alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
        </nav>
    )
}