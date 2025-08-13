import React, { useState } from 'react';
import api from '../services/api';

function maskCpfCnpj(val) {
  const v = val.replace(/\D/g, '');
  if (v.length <= 11) {
    return v
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  return v
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

function maskPhone(val) {
  const v = val.replace(/\D/g, '');
  if (v.length <= 10) {
    return v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  }
  return v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}

export default function CooperatorForm({ onCreated }) {
  const [form, setForm] = useState({
    name: '',
    cpf_cnpj: '',
    birth_constitution_date: '',
    income_revenue: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  const isCpf = form.cpf_cnpj.replace(/\D/g, '').length <= 11;

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cpf_cnpj') {
      setForm({ ...form, cpf_cnpj: maskCpfCnpj(value) });
    } else if (name === 'phone') {
      setForm({ ...form, phone: maskPhone(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await api.post('/cooperators', form);
      setForm({ name:'', cpf_cnpj:'', birth_constitution_date:'', income_revenue:'', phone:'', email:'' });
      onCreated && onCreated();
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors);
      else alert('Erro ao salvar');
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="row">
        <label>Nome*</label>
        <input name="name" value={form.name} onChange={onChange} />
        {errors.name && <small className="error">{errors.name}</small>}
      </div>

      <div className="row">
        <label>{isCpf ? 'CPF*' : 'CNPJ*'}</label>
        <input name="cpf_cnpj" value={form.cpf_cnpj} onChange={onChange} placeholder={isCpf ? '000.000.000-00' : '00.000.000/0000-00'} />
        {errors.cpf_cnpj && <small className="error">{errors.cpf_cnpj}</small>}
      </div>

      <div className="row">
        <label>{isCpf ? 'Data de Nascimento*' : 'Data de Constituição*'}</label>
        <input type="date" name="birth_constitution_date" value={form.birth_constitution_date} onChange={onChange} />
        {errors.birth_constitution_date && <small className="error">{errors.birth_constitution_date}</small>}
      </div>

      <div className="row">
        <label>{isCpf ? 'Renda*' : 'Faturamento*'}</label>
        <input type="number" step="0.01" name="income_revenue" value={form.income_revenue} onChange={onChange} />
        {errors.income_revenue && <small className="error">{errors.income_revenue}</small>}
      </div>

      <div className="row">
        <label>Telefone*</label>
        <input name="phone" value={form.phone} onChange={onChange} placeholder="(11) 98888-7777" />
        {errors.phone && <small className="error">{errors.phone}</small>}
      </div>

      <div className="row">
        <label>E-mail</label>
        <input type="email" name="email" value={form.email} onChange={onChange} />
        {errors.email && <small className="error">{errors.email}</small>}
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  );
}
