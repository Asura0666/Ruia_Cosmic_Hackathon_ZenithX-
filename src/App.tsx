import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Keeptrack } from "./routes/Satellite";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/api";
import { Home } from "./routes/Home";

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen text-foreground ">
      <div className="flex-1 flex flex-col">
        {/* Routes */}
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/satellites" element={<Keeptrack />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
