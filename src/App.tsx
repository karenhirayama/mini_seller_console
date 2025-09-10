import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import MiniSellerConsoleProvider from "./context/MiniSellerConsoleProvider";
import ToastProvider from "./context/ToastProvider";

const App = () => {
  return (
    <ToastProvider>
      <MiniSellerConsoleProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MiniSellerConsoleProvider>
    </ToastProvider>
  );
};

export default App;
