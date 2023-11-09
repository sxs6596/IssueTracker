"use client";
import { Button, AlertDialog, Flex } from "@radix-ui/themes";
import {useRouter} from 'next/navigation'; 
import axios from "axios";
const DeleteIssueComponent = (props) => {
  const id = props.issue.id;
  const router = useRouter(); 
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure want to delete the issue ? you cannot undo changes once
          deletion is done.
        </AlertDialog.Description>
        <Flex gap="3" mt="4">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={async()=>{
                await axios.delete('/api/issues/'+id);
                router.push('/Issues');
                router.refresh(); 
            }}>
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueComponent;
