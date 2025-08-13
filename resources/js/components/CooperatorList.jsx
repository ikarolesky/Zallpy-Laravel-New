import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api"; // Certifique-se que este é o axios configurado
import Header from "./Header";

const CooperatorsList = () => {
  const [cooperators, setCooperators] = useState([]); // inicializa como array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCooperators = async () => {
    try {
      setLoading(true);
      const response = await api.get("/cooperators");
      // Ajuste conforme sua API: response.data ou response.data.data
      setCooperators(response.data?.data ?? []);
    } catch (err) {
      setError(err.message || "Erro ao carregar cooperados");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente remover este cooperado?")) return;
    try {
      await api.delete(`/cooperators/${id}`);
      fetchCooperators(); // atualiza a lista após exclusão
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao remover cooperado");
    }
  };

  useEffect(() => {
    fetchCooperators();
  }, []);

  if (loading) return <p>Carregando cooperados...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <div>
      <h2>Cooperados</h2>
      {cooperators.length === 0 ? (
        <p>Nenhum cooperado encontrado.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF/CNPJ</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cooperators.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.cpf_cnpj}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>
                  <button><Link to={`/cooperados/edit/${c.id}`}>Editar</Link>{" "}</button>
                  |{" "}
                  <button onClick={() => handleDelete(c.id)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default CooperatorsList;
