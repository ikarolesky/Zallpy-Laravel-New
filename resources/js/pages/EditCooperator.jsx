import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CooperatorForm from "../components/CooperatorForm";
import api from "../services/api";

const EditCooperator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cooperator, setCooperator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Busca os dados do cooperado
  useEffect(() => {
    const fetchCooperator = async () => {
      try {
        const response = await api.get(`/cooperators/${id}`);
        setCooperator(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Erro ao carregar cooperado");
      } finally {
        setLoading(false);
      }
    };
    fetchCooperator();
  }, [id]);

  // Função que será chamada quando o formulário salvar
  const handleSaved = (updatedCooperator) => {
    alert(`Cooperado "${updatedCooperator.name}" atualizado com sucesso!`);
    navigate("/cooperados"); // redireciona para a lista
  };

  if (loading) return <p>Carregando cooperado...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!cooperator) return null;

  return (
    <div>
      <Header />
      <main style={{ padding: 20 }}>
        <h2>Editar Cooperado</h2>
        <CooperatorForm cooperator={cooperator} onSaved={handleSaved} />
      </main>
    </div>
  );
};

export default EditCooperator;
