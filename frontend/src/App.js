import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    window.location.replace("/github-pages/index.html");
  }, []);

  return (
    <main className="static-site-loading" data-testid="static-site-loading">
      Loading AJ Webworks static site...
    </main>
  );
};

function App() {
  return (
    <div className="App" data-testid="app-shell">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
