import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';

// Função utilitária para formatar CPF/CNPJ (simplificada)
function formatCpfCnpj(value) {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 11) {
    // CPF format XXX.XXX.XXX-XX
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    // CNPJ format XX.XXX.XXX/XXXX-XX
    return digits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
}

function validateCpfCnpj(value) {
  const digits = value.replace(/\D/g, '');
  return digits.length === 11 || digits.length === 14;
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 10) {
    // Formato telefone fixo (XX) XXXX-XXXX
    return digits
      .replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
      .trim();
  } else {
    // Formato celular (XX) 9XXXX-XXXX
    return digits
      .replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
      .trim();
  }
}

export default function CooperatorForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    cpf_cnpj: '',
    birth_date: '',
    income: '',
    phone: '',
    email: '',
  });

  const [cpfCnpjIsCpf, setCpfCnpjIsCpf] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      api.get(`/cooperados/${id}`)
        .then(({ data }) => {
          setForm({
            name: data.name,
            cpf_cnpj: data.cpf_cnpj,
            birth_date: data.birth_date,
            income: data.income,
            phone: data.phone,
            email: data.email || '',
          });
          setCpfCnpjIsCpf(data.cpf_cnpj.replace(/\D/g, '').length === 11);
        });
    }
  }, [id, isEdit]);

  // Atualiza e detecta se cpf or cnpj para label
  function handleCpfCnpjChange(e) {
    const value = e.target.value;
    setForm(f => ({ ...f, cpf_cnpj: value }));

    const digits = value.replace(/\D/g, '');
    setCpfCnpjIsCpf(digits.length <= 11);
  }

  // Atualiza campos com máscara
  function handlePhoneChange(e) {
    const formatted = formatPhone(e.target.value);
    setForm(f => ({ ...f, phone: formatted }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setErrors({});

    // Validação frontend simples
    if (!form.name) return setErrors({ name: 'Nome obrigatório' });
    if (!validateCpfCnpj(form.cpf_cnpj)) return setErrors({ cpf_cnpj: 'CPF ou CNPJ inválido' });
    if (!form.birth_date) return setErrors({ birth_date: 'Data obrigatória' });
    if (!form.income || isNaN(form.income)) return setErrors({ income: 'Renda/Faturamento inválido' });
    if (!form.phone) return setErrors({ phone: 'Telefone obrigatório' });

    try {
      if (isEdit) {
        await api.put(`/cooperados/${id}`, form);
      } else {
        await api.post('/cooperados', form);
      }
      navigate('/');
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert('Erro ao salvar cooperado');
      }
    }
  }

  return (
    <div>
      <h1>{isEdit ? 'Editar Cooperado' : 'Novo Cooperado'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome *</label><br />
          <input name="name" value={form.name} onChange={handleChange} />
          <div style={{ color: 'red' }}>{errors.name}</div>
        </div>

        <div>
          <label>{cpfCnpjIsCpf ? 'CPF *' : 'CNPJ *'}</label><br />
          <input
            name="cpf_cnpj"
            value={form.cpf_cnpj}
            onChange={handleCpfCnpjChange}
            disabled={isEdit}
            placeholder={cpfCnpjIsCpf ? '000.000.000-00' : '00.000.000/0000-00'}
          />
          <div style={{ color: 'red' }}>{errors.cpf_cnpj}</div>
        </div>

        <div>
          <label>{cpfCnpjIsCpf ? 'Data de Nascimento *' : 'Data de Constituição *'}</label><br />
          <input
            name="birth_date"
            type="date"
            value={form.birth_date}
            onChange={handleChange}
          />
          <div style={{ color: 'red' }}>{errors.birth_date}</div>
        </div>

        <div>
          <label>{cpfCnpjIsCpf ? 'Renda *' : 'Faturamento *'}</label><br />
          <input
            name="income"
            type="number"
            step="0.01"
            value={form.income}
            onChange={handleChange}
          />
          <div style={{ color: 'red' }}>{errors.income}</div>
        </div>

        <div>
          <label>Telefone *</label><br />
          <input
            name="phone"
            value={form.phone}
            onChange={handlePhoneChange}
            placeholder="(XX) XXXXX-XXXX"
          />
          <div style={{ color: 'red' }}>{errors.phone}</div>
        </div>

        <div>
          <label>E-mail (opcional)</label><br />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <div style={{ color: 'red' }}>{errors.email}</div>
        </div>

        <button type="submit">{isEdit ? 'Salvar' : 'Cadastrar'}</button>
      </form>
    </div>
  );
}
