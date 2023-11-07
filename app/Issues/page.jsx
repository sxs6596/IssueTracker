import { Button } from "@radix-ui/themes";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import delay from "delay";
import prisma from "@/prisma/client";
import StatusBadge from '../../app/components/StatusBadge';
import NewIssueButton from "./NewIssueButton";

const Issues = async() => {
  const issues = await prisma.issue.findMany();
  await delay(2000);
  return (
    <div>
      <h1>Issues Component</h1>
      <NewIssueButton/>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created At</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue)=>(<Table.Row key={issue.id}>
            <Table.RowHeaderCell>
              <Link href={`/Issues/${issue.id}`}>
              {issue.title}
              </Link>
              <div className="block md:hidden">
                <StatusBadge status={issue.status}/>
              </div>
            </Table.RowHeaderCell>
            <Table.Cell className="hidden md:table-cell">
              <StatusBadge status={issue.status}/>
              </Table.Cell>
            <Table.Cell className="hidden md:table-cell">{issue.createdAt.toLocaleDateString()}</Table.Cell>
          </Table.Row>))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default Issues;
