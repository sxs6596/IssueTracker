import prisma from "@/prisma/client";
import IssueForm from "../../_components/IssueForm";

const EditIssueForm = async({params}) => {
    const id = params.id; 
    const issue = await prisma.issue.findUnique({
        where:{id:parseInt(id)}
    }); 

  return (
    <div>
       <IssueForm issue ={issue}/>
    </div>
  )
}

export default EditIssueForm