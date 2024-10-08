import React from "react";

function BodyDashbord() {
  return (
    <div className="box-content mx-auto">
      <div className=" m-auto max-w-[calc(100vw-0px)] sm:max-w-screen-xl  flex justify-center items-center ">
        <video autoPlay muted loop playsInline>
          <source
            src="https://d1yei2z3i6k35z.cloudfront.net/5322770/65fc0be058c63_HeaderAppUnTrucdeJESUS.mp4"
            type="video/mp4"
          />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      </div>
      <div className="w-full flex justify-center mt-5">
        <a
          href=""
          className="px-14 py-3 rounded-[80px] bg-[#f8e71c] font-bold cursor-pointer buttonConnect flex flex-col items-center transition-colors"
        >
          <p className="text-[20px] font-sans text-center ">Déjà Abonné(e) ?</p>
          <p className="text-center text-[#bd10e0] text-[18px] brightness-200">
            Connecte-toi ici
          </p>
        </a>
      </div>
      <div className="w-full flex flex-col items-center mt-10 gap-8 abonnement">
        <a className="text-center flex flex-col justify-center text-[28px] font-extrabold cursor-pointer pp">
          Pas encore Abonné(e) ?
        </a>
        <div className="text-[#000] w-[40px] text-center rotate-180 self-center triangle -mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-pointer"
          >
            <path d="M22 14a8 8 0 0 1-8 8" />
            <path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
            <path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" />
            <path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" />
            <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
          </svg>
        </div>
        <div className="w-full flex flex-col items-center -mt-[32px]">
          <img
            src="https://d1yei2z3i6k35z.cloudfront.net/5322770/66e14cea5fe8d_Capturedecran2024-03-27a18.13.05.png"
            alt="Accès rapide Réseau social 100% JESUS"
            loading="lazy"
            width={311}
            height={500}
            className="cursor-pointer rounded-lg shadow-2xl bg-slate-500 border-t-white border-solid border-[5px]"
          />
        </div>
      </div>
      <div className="relative w-full mt-8">
        <a className="relative text-center px-6 py-4 flex flex-col justify-center rounded-[45px] w-[311px] bg-[#e6c068] mx-auto z-[50] -translate-x-1 buttonAbonnement">
          <p className="text-[18px] font-bold ">Deviens Donateur Engagé</p>
          <p className="text-white">En savoir plus</p>
        </a>
        <a className=" w-[434px] flex justify-center text-center text-[18px] font-bold pt-6 mx-auto -translate-y-[110px]">
          <img
            src="https://d1yei2z3i6k35z.cloudfront.net/5322770/66e186a1cd0cb_GLOIREADIEU.png"
            alt="Devenir Donateur Engagé Un Truc de JÉSUS !"
            width="434"
            loading="lazy"
          />
        </a>
      </div>
      <div className="w-full px-1 flex flex-col items-center">
        <div className="partQrcode w-full"></div>
      </div>
    </div>
  );
}

export { BodyDashbord };
