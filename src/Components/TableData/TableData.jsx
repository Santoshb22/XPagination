import React from 'react'

const TableData = ({data}) => {
    const {name, id, role, email} = data
  return (
    <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{role}</td>
    </tr>
  )
}

export default TableData