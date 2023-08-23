import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BarcodeCalculator } from "./pages/BarcodeCalculator";
import { Header } from "./pages/Header";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Footer } from "./pages/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ paddingBottom: "7rem" }}>
        <Routes>
          <Route path="/">
            <Route index element={<BarcodeCalculator />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<BarcodeCalculator />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
