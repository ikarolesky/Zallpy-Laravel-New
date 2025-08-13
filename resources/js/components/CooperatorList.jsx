import React from 'react';
import api from '../services/api';

export default function CooperatorList({ cooperators, onChanged }) {
  const remove = async (id) => {
    if (!confirm('Remover este cooperado?')) return;
    await api.delete('/cooperators/' + id);
    onChanged && onChanged();
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF/CNPJ</th>
          <th>Data</th>
          <th>Renda/Faturamento</th>
          <th>Telefone</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {cooperators.map(c => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.cpf_cnpj}</td>
            <td>{c.birth_constitution_date}</td>
            <td>{c.income_revenue}</td>
            <td>{c.phone}</td>
            <td>{c.email || '-'}</td>
            <td>
              <button onClick={() => remove(c.id)}>Remover</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
