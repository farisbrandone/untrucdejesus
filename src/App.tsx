import "./App.css";
import { FooterDashboard } from "./components/FooterDashboard";
import { HeaderDashboard } from "./components/HeaderDashboard";

function App() {
  return (
    <>
      <div>
        <HeaderDashboard />
      </div>
      <div className="grid place-items-center">
        <FooterDashboard />
      </div>
    </>
  );
}

export default App;
