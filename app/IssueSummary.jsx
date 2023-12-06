import React from 'react'
import {Flex,Card, Text} from '@radix-ui/themes';
import Link from 'next/link';
const IssueSummary = ({open, inProgress, closed}) => {
    const statuses = [
        {label:'Open', value: open, status:'OPEN'},
        {label:'In-Progress', value: inProgress, status:'IN_PROGRESS'},
        {label:'Closed', value: closed, status:'CLOSED'},
    ]
  return (
    <Flex gap="3">
        {statuses.map((status)=><Card key={status.label}>
               <Flex direction="column">
                    <Link href={`/Issues?status=${status.status}`}
                    className="text-sm font-medium">{status.label}</Link>
                    <Text size="5" className='font-bold'>{status.value}</Text>
               </Flex>
        </Card>)}
    </Flex>
  )
}

export default IssueSummary