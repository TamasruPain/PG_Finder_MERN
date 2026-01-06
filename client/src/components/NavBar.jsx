import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import searchimg from './images/Search.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faArrowRightFromBracket,faArrowRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';


const NavBar = () => {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState('');
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('propHolder_ID');
    setTimeout(() => {
      navigate('/')
    }, 2000);
    handleSuccess('You have been logged out!!');
    handleSuccess(' .. Redirecting to home page!!');
  };

  const [loggedInAdmin, setLoggedInAdmin] = useState('');
  const [Email, setEmail] = useState('');
  useEffect(() => {
    setLoggedInAdmin(localStorage.getItem('loggedInAdmin'))
    setEmail(localStorage.getItem('Email'))
  }, [])

  const adminHandleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInAdmin');
    localStorage.removeItem('Email')
    handleSuccess('You are logged out !!');
    setTimeout(() => {
      navigate('/');
    }, 1000)
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <div>
              <img src={searchimg} style={{ width: '25px', height: '25px' }} alt="Search Icon" />
              PG Finder
            </div>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/properties">Properties</Link>
              </li>



            </ul>

            <ul className="navbar-nav ms-auto">
              {loggedInUser ? (
                <>
                  <li className="nav-item">
                    <Link className='btn btn-outline-success mx-2 my-1' to='/userDashboard'>
                      <FontAwesomeIcon
                        icon={faAddressCard}
                        style={{ color: "#B197FC", fontSize: '20px' }}
                      />&nbsp;{loggedInUser}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className='btn btn-outline-warning mx-2 my-1' onClick={handleLogout}>
                      Sign Out&nbsp;
                      <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "#FFD43B" }} />
                    </button>
                  </li>
                </>
              ) : loggedInAdmin ? (
                <li className="nav-item">
                  <div align='right'>
                    <Link className="btn btn-outline-primary mx-2 my-1" to='/adminDashboard'>{Email}</Link>
                    <button className='btn btn-outline-light mx-2 my-1' onClick={adminHandleLogout}>
                      logout
                    </button>
                  </div>
                </li>
              ) : (
                <li className="nav-item">
                  <div>
                    <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                      <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                          <button className="btn btn-dark dropdown-toggle mx-2 my-1" data-bs-toggle="dropdown" aria-expanded="false">
                            Property Holder Section
                          </button>
                          <ul className="dropdown-menu dropdown-menu-dark">
                            <li>
                              <div className='row m-2'>
                                <button className="btn btn-dark" disabled>Sign in to your Property Holder account</button>
                                <Link className='btn btn-outline-light' to='/userLogin'>
                                  Sign In&nbsp;
                                  <FontAwesomeIcon icon={faArrowRightToBracket} style={{ color: "#FFD43B", }} />
                                </Link>
                              </div>
                            </li>
                            <li>
                              <div className='row m-2'>
                                <button className="btn btn-dark" disabled> Sign up as a Property Holder</button>
                                <Link className='btn btn-outline-light' to='/userSignup'>
                                  Sign Up&nbsp;
                                  <FontAwesomeIcon icon={faUserPlus} style={{ color: "#FFD43B", }} />
                                </Link>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav >
      <ToastContainer />
    </div >
  )
}

export default NavBar
