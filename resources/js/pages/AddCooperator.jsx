import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import CooperatorForm from "../components/CooperatorForm.jsx";

const AddCooperator = () => {
  return (
    <div>
      <main>
        <Header />
        <div style={{ padding: 20 }}>
            <CooperatorForm />
        </div>
      </main>
    </div>
  );
};

export default AddCooperator;
