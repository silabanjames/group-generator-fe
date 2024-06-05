import React from 'react'

function Navbar() {
  return (
    <div className="flex justify-between bg-transparent z-10 relative">
        <div className="flex items-center px-4 hover:text-primary hover:cursor-pointer" id="menuToggle">
            <svg width="24" height="24">
                {/* <use xlink:href="src/assets/svg/icon-sprite.svg#sidebar"></use> */}
                icon
            </svg>
        </div>

        <div className="flex flex-wrap justify-start items-center pr-4 py-2">
            <img src="@/assets/images/profile/profile.png" alt="Profile" className="rounded-lg" id="img-profile" />
            <div className="hidden bg-white p-2 absolute right-4 top-full rounded-md shadow-md sm:block sm:static sm:bg-transparent sm:shadow-none sm:rounded-none sm:ml-2" id="profile">
                {/* <span className="text-dark text-sm">{{ auth.user.name }}</span> */}
                <span className="text-dark text-sm">Jantuar</span>
                <p className="text-secondary text-xs self-start ">Admin</p>
            </div>
        </div>
    </div>
  )
}

export default Navbar