import React, { useEffect, useState } from 'react';
import api from '../api';
import { useParams, Link } from 'react-router-dom';

export default function CooperatorView() {
  const { id } = useParams();
  const [cooperator, setCooperator] = useState(null);

  useEffect(() => {
    api.get(`/cooperados/${id}`)
      .then(({ data }) => setCooperator(data))
      .catch(() => alert('Cooperado não encontrado'));
  }, [id]);

  if (!cooperator) return <div>Carregando...</div>;

  return (
    <div>
      <h1>{cooperator.name}</h1>
      <p><b>CPF/CNPJ:</b> {cooperator.cpf_cnpj}</p>
      <p><b>Data de Nascimento/Constituição:</b> {cooperator.birth_date}</p>
      <p><b>Renda/Faturamento:</b> {cooperator.income}</p>
      <p><b>Telefone:</b> {cooperator.phone}</p>
      <p><b>E-mail:</b> {cooperator.email || 'Não informado'}</p>

      <Link to={`/cooperados/${cooperator.id}/edit`}>Editar</Link>
    </div>
  );
}
