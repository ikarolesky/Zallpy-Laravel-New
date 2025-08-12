import React, {useState} from 'react'
import Login from './Login'
import CooperatorForm from './CooperatorForm'
import CooperatorList from './CooperatorList'

export default function App(){
  const [auth, setAuth] = useState(!!localStorage.getItem('token'))
  return (
    <div style={{padding:20}}>
      <h1>Cooperados</h1>
      {!auth ? <Login onLogin={()=>setAuth(true)} /> : (
        <>
          <CooperatorForm />
          <hr />
          <CooperatorList />
        </>
      )}
    </div>
  )
}
