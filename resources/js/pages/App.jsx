import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CooperatorForm from '../components/CooperatorForm';
import CooperatorList from '../components/CooperatorList';

export default function App() {
  const [cooperators, setCooperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ name: '', cpf_cnpj: '' });

  async function load() {
    setLoading(true);
    const { data } = await api.get('/cooperators', { params: filters });
    setCooperators(data.data ?? data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const onFilter = async (e) => {
    e.preventDefault();
    await load();
  };

  return (
    <div className="container">
      <h1>Gerenciamento de Cooperados</h1>

      <form onSubmit={onFilter} className="filters">
        <input
          placeholder="Nome"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <input
          placeholder="CPF/CNPJ"
          value={filters.cpf_cnpj}
          onChange={(e) => setFilters({ ...filters, cpf_cnpj: e.target.value })}
        />
        <button type="submit">Filtrar</button>
      </form>

      <CooperatorForm onCreated={load} />

      {loading ? <p>Carregando...</p> : <CooperatorList cooperators={cooperators} onChanged={load} />}
    </div>
  );
}
