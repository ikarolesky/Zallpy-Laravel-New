import React, { useState, useEffect } from "react";
import api from "../services/api";
import Header from "./Header";

// Funções utilitárias de validação

const isCpf = (value) => {
  value = value.replace(/\D/g, "");
  if (value.length !== 11) return false;
  // Algoritmo básico de validação de CPF
  let sum = 0, rest;
  for (let i = 1; i <= 9; i++) sum += parseInt(value.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11; rest = rest === 10 || rest === 11 ? 0 : rest;
  if (rest !== parseInt(value.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(value.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11; rest = rest === 10 || rest === 11 ? 0 : rest;
  return rest === parseInt(value.substring(10, 11));
};
const isCnpj = (value) => {
  value = value.replace(/\D/g, "");
  if (value.length !== 14) return false;
  let size = value.length - 2;
  let numbers = value.substring(0, size);
  const digits = value.substring(size);
  let sum = 0, pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;
  size = size + 1;
  numbers = value.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(digits.charAt(1));
};

// Máscara de telefone BR
const maskPhone = (value) => {
  value = value.replace(/\D/g, "");
  if (value.length > 10) {
    return value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else {
    return value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  }
};

const CooperatorForm = ({ cooperator, onSaved }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    cpf_cnpj: "",
    birth_constitution_date: "",
    income_revenue: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [type, setType] = useState("cpf"); // define labels

  useEffect(() => {
    if (cooperator) {
      setFormData({
        name: cooperator.name || "",
        cpf_cnpj: cooperator.cpf_cnpj || "",
        birth_constitution_date: cooperator.birth_constitution_date
          ? cooperator.birth_constitution_date.split("T")[0]
          : "",
        income_revenue: cooperator.income_revenue || "",
        phone: cooperator.phone || "",
        email: cooperator.email || "",
      });
      setType(cooperator.cpf_cnpj?.length <= 11 ? "cpf" : "cnpj");
  }
  }, [cooperator]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cpf_cnpj") {
      value = value.replace(/\D/g, "");
      if (value.length <= 11) setType("cpf");
      else setType("cnpj");
    }

    if (name === "phone") value = maskPhone(value);

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    // Validação frontend
    if ((type === "cpf" && !isCpf(formData.cpf_cnpj)) || (type === "cnpj" && !isCnpj(formData.cpf_cnpj))) {
      return setErrors({ cpf_cnpj: `CPF ou CNPJ inválido` });
    }

    try {
      const submitData = {
        ...formData,
        cpf_cnpj: formData.cpf_cnpj.replace(/\D/g, ""),
        phone: formData.phone.replace(/\D/g, ""),
      };
    const response = cooperator?.id
    ? await api.put(`/cooperators/${cooperator.id}`, submitData)
    : await api.post("/cooperators", submitData);
    setSuccessMessage(`Cooperado "${response.data.name}" salvo com sucesso!`);
    setTimeout(() => setSuccessMessage(""), 3000);
    onSaved?.(response.data);
    } catch (err) {
      console.log(err);
      setErrors(err.errors || { general: err.message || "Erro ao salvar" });
    }
  };

  return (
  <> 
      {successMessage && (
        <p style={{ color: "green", fontWeight: "bold" }}>
          {successMessage}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
        <div>
          <div className="row">
          <label>Nome</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>
        </div>

        <div>
          <div className="row">
          <label>CPF ou CNPJ</label>
          <input
            type="text"
            name="cpf_cnpj"
            value={formData.cpf_cnpj}
            onChange={handleChange}
            required
            disabled={!!cooperator?.id} // não permite editar
          />
          
          {errors.cpf_cnpj && <p style={{ color: "red" }}>{errors.cpf_cnpj}</p>}
          </div>
        </div>

        <div>
          <div className="row">
          <label>{type === "cpf" ? "Data de Nascimento" : "Data de Constituição"}</label>
          <input
            type="date"
            name="birth_constitution_date"
            value={formData.birth_constitution_date}
            onChange={handleChange}
            required
          />
          {errors.birth_constitution_date && <p style={{ color: "red" }}>{errors.birth_constitution_date}</p>}
          </div>
        </div>

        <div>
          <div className="row">
          <label>{type === "cpf" ? "Renda" : "Faturamento"}</label>
          <input
            type="number"
            name="income_revenue"
            value={formData.income_revenue}
            onChange={handleChange}
            required
          />
          {errors.income_revenue && <p style={{ color: "red" }}>{errors.income_revenue}</p>}
          </div>
        </div>

        <div>
          <div className="row">
          <label>Telefone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
          </div>
        </div>

        <div>
          <div className="row">
          <label>E-mail</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
        </div>

        <button type="submit">Salvar</button>
      </form>
  </>
  );
};

export default CooperatorForm;
