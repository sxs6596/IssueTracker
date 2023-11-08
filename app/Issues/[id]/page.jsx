import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/client";
import { Flex, Heading, Text, Card, Grid, Box, Button } from "@radix-ui/themes";
import {Penclil2Icon} from "@radix-ui/react-icons";
import { notFound } from 'next/navigation'
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
        <Grid columns={{initial:"1", md:"2"}} gap="3">
        <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="3" className="my-2">
        <StatusBadge status={issue.status}/>
        </Flex>
        <Card style={{maxWidth:"400"}}>
        <Text>{issue.description}</Text>
        </Card>
        </Box>
        <Box>
          <Button>

            <Link href={`Issues/${issue.id}/edit`}>Edit Issues</Link>
          </Button>
        </Box>
        </Grid>

    </div>
  )
}

export default IssueDetailsPage