import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/client";
import { Flex, Heading, Text, Card, Grid, Box, Button } from "@radix-ui/themes";
import {Penclil2Icon} from "@radix-ui/react-icons";
import { notFound } from 'next/navigation'
import DeleteIssueComponent from "./DeleteIssueComponent";
import Link from "next/link";
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

export default IssueDetailsPage