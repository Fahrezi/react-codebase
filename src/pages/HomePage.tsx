import React from 'react'
import { useFetchUsers } from '../api/queries/authUsers'

function HomePage() {
  const { data } = useFetchUsers();
  return (
    <div>
      {data?.map((user: any) => (
        <div style={{ alignItems: 'center', display: 'flex', gap: '1rem' }}>
          <h1>{user.id}</h1>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  )
}

export default HomePage
