import React from "react";
import { Container, Logo, LogoutButton } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pen } from 'lucide-react';

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Post",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <div className={`hover:bg-gray-100 shadow-md transition-all duration-200 ${!authStatus ? 'bg-[#bc382e]' : 'bg-gradient-to-r from-[#388D80] to-[#4583AA]'
      }`}>
      <header className="shadow group h-20 ">
        <Container>
          <nav className="flex items-center justify-between py-1">
            <div className="flex items-center">
              <Link to='/' className="flex items-center">
                <div className="flex items-center ml-3">
                  <Pen className="text-white mr-2 group-hover:text-[#FF8000]" size={24} />
                  <h1 className="text-xl font-bold text-white group-hover:text-[#FF8000] transition-colors duration-200">
                    Blogger.
                  </h1>
                </div>
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <h1 className='text-white text-2xl mr-60 hidden md:block group-hover:text-[#FF8000] transition-colors duration-200'>
                {!authStatus ? 'Create a unique and beautiful blog easily' : 'Explore Blogs'}
              </h1>

              <ul className="flex items-center space-x-2 ml-20">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        className={`px-4 py-2 text-white ${ !authStatus ? 'bg-[#bc382e]' : 'bg-yellow-500'} group-hover:bg-[#FF8000] rounded-md transition-all duration-200`}
                        onClick={() => navigate(item.slug)}
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li>
                    <LogoutButton />
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </Container>
      </header>
    </div>
  )
}

export default Header;