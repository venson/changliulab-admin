import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Admin, Resource } from 'react-admin'
import { dataProvier } from './dataProvider'
import authProvider from './authProvider/autProvider'
import MemberList from './pages/member/MemberList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Admin dataProvider={dataProvier} authProvider={authProvider}>
      <Resource name='eduservice/admin/edu-member' list={MemberList}/>

    </Admin>
  )
}

export default App
