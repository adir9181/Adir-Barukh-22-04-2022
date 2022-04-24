import React, { useContext, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon, SunIcon, MoonIcon } from '@heroicons/react/outline'
import { NavLink } from 'react-router-dom'
import UnitContext from '../store/unitContext'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Favorites', href: '/favorites' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const [isMetric, updateUnit] = useContext(UnitContext)
  const [isDark, setIsDark] = useState(false)

  return (
    <Disclosure as="nav" className="bg-slate-200 dark:bg-dark-2">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex-shrink-0 flex items-center">
                  <p className="block lg:hidden w-auto text-slate-800 dark:text-white">Herolo weather task</p>
                  <p className="hidden lg:block w-auto text-slate-800 dark:text-white">Herolo weather task</p>
                </div>
                <div className="hidden sm:flex sm:ml-6 items-center">
                  <div className="flex space-x-4 items-center">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) => classNames(
                          isActive ? 'bg-gray-800 text-white' : 'bg-slate-100 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium transition-colors'
                        )}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                  <div className="border-l-2 h-full border-l-purple-200 mx-3"></div>
                  <button onClick={updateUnit} className="text-lg text-purple-500 mr-3" dangerouslySetInnerHTML={{ __html: isMetric ? "&#8451;" : "&#8457;" }}>
                  </button>
                  {isDark
                    ? (<SunIcon onClick={toggleDark} className="w-6 h-6 text-purple-500" />)
                    : (<MoonIcon onClick={toggleDark} className="w-6 h-6 text-purple-500" />)}
                </div>
                <div className="flex sm:hidden items-center">
                  <div className="border-l-2 h-full border-l-purple-200 mx-3"></div>
                  <button onClick={updateUnit} className="text-lg text-purple-500 mr-3" dangerouslySetInnerHTML={{ __html: isMetric ? "&#8451;" : "&#8457;" }}>
                  </button>
                  {isDark
                    ? (<SunIcon onClick={toggleDark} className="w-6 h-6 text-purple-500" />)
                    : (<MoonIcon onClick={toggleDark} className="w-6 h-6 text-purple-500" />)}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={NavLink}
                  to={item.href}
                  className={({ isActive }) => classNames(
                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium transition-colors'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )

  function toggleDark() {
    setIsDark(!isDark)
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    } else {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    }
  }

}