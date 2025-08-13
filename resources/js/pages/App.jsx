import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Aqui o React Router renderiza as rotas */}
      </main>
    </div>
  );
};

export default App;
