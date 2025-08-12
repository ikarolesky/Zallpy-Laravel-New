import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function CooperatorList() {
  const [cooperators, setCooperators] = useState([]);
  const [search, setSearch] = useState('');

  async function fetchCooperators() {
    try {
      const response = await api.get('/cooperados', { params: { search } });
      setCooperators(response.data.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchCooperators();
  }, [search]);

  return (
    <div>
      <h1>Cooperados</h1>
      <input
        type="text"
        placeholder="Buscar por nome ou CPF/CNPJ"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 12, padding: 8, width: '100%', maxWidth: 400 }}
      />
      <Link to="/cooperados/create" style={{ display: 'inline-block', marginBottom: 20 }}>
        Novo Cooperado
      </Link>

      <ul>
        {cooperators.map(c => (
          <li key={c.id}>
            <Link to={`/cooperados/${c.id}`}>
              {c.name} - {c.cpf_cnpj}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
