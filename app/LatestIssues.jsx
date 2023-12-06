import React from 'react'
import prisma from '@/prisma/client'
import Link from 'next/link';
import {Card, Table, Flex, Grid, Badge, Avatar, Heading} from '@radix-ui/themes';
import StatusBadge from './components/StatusBadge';
const LatestIssues = async() => {
 // fetching the issues from the database. 
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 6,
    include:{
        user:true
    }
  });
   
  return (
     <Card>
        <Heading size="4">Latest Issues</Heading>
     <Table.Root>
        <Table.Body>
            {issues.map((issue)=><Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                <Flex direction="column" align="start" gap="3">
                 <Link href={`/Issues/${issue.id}`}>{issue.title}</Link>
                 <StatusBadge status={issue.status}/>
                </Flex>
                {issue.user && (
                    <Avatar
                     src = {issue.user.image}
                     fallback="?"
                     size="2"
                     radius="full"
                    />
                )}
                </Flex>
              </Table.Cell>
            </Table.Row>)}
        </Table.Body>
     </Table.Root>
     </Card>
  )
}

export default LatestIssues