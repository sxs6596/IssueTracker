'use client';
import React from 'react'
import {useState, useEffect} from 'react'; 
import {Select, Text} from '@radix-ui/themes'
import axios from 'axios';
import {useQuery} from '@tanstack/react-query'; 
const AssigneeSelect = ({issue}) => {
    const {data :users, isLoading, error} = useQuery({
        queryKey: ['users'],
        queryFn : ()=> axios.get('/api/users').then((res)=>res.data), 
        staleTime: 1000*60,  // 1 minute
        retry :3
    })
    if(isLoading) return <Text>Loading...</Text>
    if(error) return null;
  return (
    <Select.Root placeholder="...assign" 
    defaultValue={issue.assignedToUserId || ""}
    onValueChange={async (userId)=>{
           console.log(`selected user id is ${userId}`);
           axios.patch('/api/issues/'+issue.id,{assignedToUserId:userId || null})
          
    }}>
  <Select.Trigger />
  <Select.Content>
    <Select.Group>   
      <Select.Label>Suggestions</Select.Label>
      <Select.Item value="">Unassign</Select.Item>
      {users.map((user)=>
      <Select.Item value={user.id} key={user.id}>{user.name}</Select.Item>)
      }
    </Select.Group>
  </Select.Content>
</Select.Root>
  )
}

export default AssigneeSelect