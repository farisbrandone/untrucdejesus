import React from "react";

export function HeaderDashboard() {
  return (
    <div className="w-full py-4 px-5 bg-slate-200 fixed">
      <img
        src="https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png"
        alt="Logo"
        width={40}
        height={40}
        className="mx-auto"
      />
      <div className="absolute w-[40px] h-[40px] grid place-items-center bg-[#e6f7ff] text-[#bd10e0] right-5 top-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
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
