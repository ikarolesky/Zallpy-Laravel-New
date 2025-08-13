import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import CooperatorList from "../components/CooperatorList.jsx";

const ListCooperator = () => {
  return (
    <div>
      <Header />
      <main>
        <CooperatorList />
      </main>
    </div>
  );
};

export default ListCooperator;
