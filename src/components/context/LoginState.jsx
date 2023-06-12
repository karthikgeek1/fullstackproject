import React, { useState } from 'react'
import Logincontext from './Logincontext'

const LoginState = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  return (
    <Logincontext.Provider value={{user, setUser}}>
      {props.children}
    </Logincontext.Provider>
  )
}

export default LoginState
