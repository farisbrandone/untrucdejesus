import "./App.css";
import { BodyDashbord } from "./components/BodyDashbord";
import { FooterDashboard } from "./components/FooterDashboard";
import { HeaderDashboard } from "./components/HeaderDashboard";

function App() {
  return (
    <>
      <HeaderDashboard />

      <div className="max-w-[1200px] m-auto mt-[80px] flex items-center">
        <BodyDashbord />
      </div>
      <footer className="grid place-items-center hidden">
        <FooterDashboard />
      </footer>
    </>
  );
}

export default App;
