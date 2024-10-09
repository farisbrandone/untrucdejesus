import "./App.css";
import { BodyDashbord } from "./components/BodyDashbord";
import { FooterDashboard } from "./components/FooterDashboard";
import { HeaderDashboard } from "./components/HeaderDashboard";

function App() {
  return (
    <>
      <HeaderDashboard />

      <div className="max-w-[100vw] sm:max-w-[1200px] m-auto mt-[80px] flex items-center">
        <BodyDashbord />
      </div>
      <footer className="grid place-items-center z-[100000] fixed ">
        <FooterDashboard />
      </footer>
    </>
  );
}

export default App;
