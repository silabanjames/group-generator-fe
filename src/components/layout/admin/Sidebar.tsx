import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

function Sidebar({ router }: { router: string }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const appendClass = showSidebar
    ? "translate-x-0"
    : "-translate-x-full sm:translate-x-0";

  const MenuItem = ({
    name,
    route,
    children,
  }: {
    name: string;
    route: string;
    children: React.ReactNode;
  }) => {
    const colorClass =
      router === route ? "text-teal-500" : "hover:text-teal-500";

    return (
      <Link
        href={route}
        onClick={() => {
          setShowSidebar(!showSidebar);
        }}
        className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${colorClass}`}
      >
        {/* <div className="text-xl flex [&>*]:mx-auto w-[30px]"> */}
        {/* {children} */}
        {/* </div> */}
        <svg
          className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-teal-500 dark:group-hover:text-white ${colorClass}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          {children}
        </svg>

        <span className="flex-1 ms-3 whitespace-nowrap">{name}</span>
      </Link>
    );
  };

  return (
    <>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ease-in-out duration-500 ${appendClass}`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col justify-between">
          <ul className="space-y-2 font-medium">
            <li>
              {/* <Link
                href="/admin/mentor"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Mentor</span>
              </Link> */}
              <MenuItem name="Mentor" route="/admin/mentor">
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </MenuItem>
            </li>
            <li>
              <MenuItem name="Member" route="/admin/member">
                {/* <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-teal-500 dark:group-hover:text-white "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                > */}
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                {/* </svg> */}
              </MenuItem>
            </li>
            <li>
              <MenuItem name="Admin" route="/admin/admin">
                  <path
                    d="M22.3,16.7l1.4-1.4L20,11.6l-5.8,5.8c-0.5-0.3-1.1-0.4-1.7-0.4C10.6,17,9,18.6,9,20.5s1.6,3.5,3.5,3.5s3.5-1.6,3.5-3.5
                    c0-0.6-0.2-1.2-0.4-1.7l1.9-1.9l2.3,2.3l1.4-1.4l-2.3-2.3l1.1-1.1L22.3,16.7z M12.5,22c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5
                    s1.5,0.7,1.5,1.5S13.3,22,12.5,22z"
                  />
                  <path
                    d="M2,19c0-3.9,3.1-7,7-7c2,0,3.9,0.9,5.3,2.4l1.5-1.3c-0.9-1-1.9-1.8-3.1-2.3C14.1,9.7,15,7.9,15,6c0-3.3-2.7-6-6-6
                    S3,2.7,3,6c0,1.9,0.9,3.7,2.4,4.8C2.2,12.2,0,15.3,0,19v5h8v-2H2V19z M5,6c0-2.2,1.8-4,4-4s4,1.8,4,4s-1.8,4-4,4S5,8.2,5,6z"
                  />
              </MenuItem>
            </li>
          </ul>
          <ul className="">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

// Reference: https://medium.com/@jihyun-j/shadcn-ui-data-table-in-next-js-0a8b743e0cc4