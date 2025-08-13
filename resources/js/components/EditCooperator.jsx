import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import CooperatorForm from "./CooperatorForm";
import Header from "./Header";

const EditCooperator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cooperator, setCooperator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchCooperator();
  }, [id]);

  const handleSaved = (updatedCooperator) => {
    alert(`Cooperado "${updatedCooperator.name}" atualizado com sucesso!`);
    navigate("/cooperados"); // redireciona para a lista
  };

  if (loading) return <p>Carregando cooperado...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!cooperator) return null;

  return (
    <>
        <CooperatorForm cooperator={cooperator} onSaved={handleSaved} />
    </>
  );
};

export default EditCooperator;
