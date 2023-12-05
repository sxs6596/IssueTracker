import { Button, Flex } from "@radix-ui/themes";
import IssueStatusFilter from "./IssueStatusFilter";
import Link from "next/link";
const NewIssueButton = () => {
  return (
    <Flex mb="5" justify="between" mt="2">
      <IssueStatusFilter />
      <Button>
        <Link href="/Issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default NewIssueButton;
