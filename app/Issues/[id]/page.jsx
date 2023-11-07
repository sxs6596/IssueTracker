import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/client";
import { Flex, Heading, Text, Card } from "@radix-ui/themes";
import { notFound } from 'next/navigation'
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
        <Heading>{issue.title}</Heading>
        <Flex gap="3" className="my-2">
        <StatusBadge status={issue.status}/>
        </Flex>
        <Card style={{maxWidth:"400"}}>
        <Text>{issue.description}</Text>
        </Card>

    </div>
  )
}

export default IssueDetailsPage