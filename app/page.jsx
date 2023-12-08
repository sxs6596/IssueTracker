import React from 'react'
import {Flex, Text, Button, Grid} from '@radix-ui/themes';
import LatestIssues from '@/app/LatestIssues'
import prisma from '@/prisma/client'; 
import IssueSummary from '@/app/IssueSummary'
import IssueChart from '@/app/IssueChart'; 
const page = async ({searchParams}) => {
  const open = await prisma.issue.count({
    where:{
      status:'OPEN'
    }
  })
  const inProgress = await prisma.issue.count({
    where:{
      status:'IN_PROGRESS'
    }
  })
  const closed = await prisma.issue.count({
    where:{
      status:'CLOSED'
    }
  })
  return (
   <>
        <Grid columns={{initial:"1", md:"2"}} gap="5">
          <Flex direction="column" gap="5">
            <IssueSummary open={open} inProgress={inProgress} closed={closed}/>
            <IssueChart open={open} inProgress={inProgress} closed={closed}/>
          </Flex>
          <LatestIssues/> 
        </Grid>
   </>
  )
}

export default page

export const metadata = {
  title:"Issues Dashboard", 
  description:" View a summary of the project issues with analytical capabilities"
}