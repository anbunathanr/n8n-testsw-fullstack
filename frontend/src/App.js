import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NCRForm from "./pages/NCRForm";
import NCRList from "./pages/NCRList";
import Navbar from "./components/Navbar";
import NCRDetails from "./pages/ncr/NCRDetails";
import RCAForm from "./pages/ncr/RCAForm";
import CAPAForm from "./pages/ncr/CAPAForm";
import FMEAForm from "./pages/ncr/FMEAForm";
import VerificationForm from "./pages/ncr/VerificationForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<NCRForm />} />
        <Route path="/ncrs" element={<NCRList />} />
        <Route path="/ncr/:id" element={<NCRDetails />} />
        <Route path="/ncr/:id/rca" element={<RCAForm />} />
        <Route path="/ncr/:id/capa" element={<CAPAForm />} />
        <Route path="/ncr/:id/fmea" element={<FMEAForm />} />
        <Route path="/ncr/:id/verification" element={<VerificationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
