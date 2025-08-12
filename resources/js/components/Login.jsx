import React, {useState} from 'react'
import axios from 'axios'
export default function Login({onLogin}){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  async function submit(e){
    e.preventDefault()
    try{
      const res = await axios.post('/api/v1/login',{email,password})
      localStorage.setItem('token', res.data.token)
      if(onLogin) onLogin()
      alert('Logado')
    }catch(err){
      alert('Erro ao logar')
    }
  }
  return (
    <form onSubmit={submit}>
      <div><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} /></div>
      <div><label>Senha</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
      <button type="submit">Entrar</button>
    </form>
  )
}
