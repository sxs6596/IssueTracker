import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/client";
import { Flex, Heading, Text, Card, Grid, Box, Button } from "@radix-ui/themes";
import {Penclil2Icon} from "@radix-ui/react-icons";
import { notFound } from 'next/navigation'
import DeleteIssueComponent from "./DeleteIssueComponent";
import Link from "next/link";
import AssigneeSelect from "./AssigneeSelect";
const IssueDetailsPage = async ({params}) => {
  const id = params.id
  const issue = await prisma.issue.findUnique({
    where:{id:parseInt(id)}
  })
  if(!issue){
    notFound();
  }
  
  return (
    <div>
        <Grid columns={{initial:"1", md:"5"}} gap="3">
        <Box className="col-span-4">
        <Heading>{issue.title}</Heading>
        <Flex gap="3" className="my-2">
        <StatusBadge status={issue.status}/>
        </Flex>
        <Card style={{maxWidth:"400"}}>
        <Text>{issue.description}</Text>
        </Card>
        </Box>
        <Box>
          <Flex gap="3" className="my-2" direction="column">
           <AssigneeSelect issue={issue}/>
          <Button>
            <Link href={`${issue.id}/edit`}>Edit Issues</Link>
          </Button>
          <DeleteIssueComponent issue={issue}/>
          </Flex>
        </Box>
        </Grid>

    </div>
  )
}
export async function generateMetaData({params}){
  const issue = prisma.issue.findUnique({
    where:{id:parseInt(params.id)}
  })
  return {
    title:issue.title,
    description:issue.description
  }
}
export default IssueDetailsPage


export const metadata = {
  title:"Issues Dashboard", 
  description:" View a summary of the project issues with analytical capabilities"
}