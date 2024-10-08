import React from "react";

export function HeaderDashboard() {
  return (
    <div className="w-full py-3 px-5 flex items-center box-content  bg-white fixed top-0 shadow-lg z-[6000]">
      <img
        src="https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png"
        alt="Logo"
        width={40}
        height={40}
        className="mx-auto"
      />
      <div className="absolute w-[30px] h-[30px] rounded-[10px] grid place-items-center bg-[#e6f7ff] text-[#bd10e0] right-[40px] top-3 my-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-user"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    </div>
  );
}
