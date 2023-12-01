'use client';
import React from 'react'
import {useState, useEffect} from 'react'; 
import {Select, Text} from '@radix-ui/themes'
import axios from 'axios';
const AssigneeSelect = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        const fetchUsers = async()=>{
           const {data} = await axios.get('/api/users');
           setUsers(data); 
        }; 
        fetchUsers();
    },[])
  return (
    <Select.Root placeholder="...assign">
  <Select.Trigger />
  <Select.Content>
    <Select.Group>   
      <Select.Label>Suggestions</Select.Label>
      {users.map((user)=>
      <Select.Item value="... assign" key={user.id}>{user.name}</Select.Item>)
      }
    </Select.Group>
  </Select.Content>
</Select.Root>
  )
}

export default AssigneeSelect