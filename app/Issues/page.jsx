import { Button } from "@radix-ui/themes";
import { Table } from "@radix-ui/themes";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import delay from "delay";
import prisma from "@/prisma/client";
import StatusBadge from "../../app/components/StatusBadge";
import NewIssueButton from "./NewIssueButton";

const Issues = async ({ searchParams }) => {
  console.log(`searchParams is ${searchParams.status}`);
  // const statuses = Object.values(Status);
  // const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status: searchParams.status,
    },
  });
  await delay(2000);
  // declare the columns for the table.
  const columns = [
    { label: "Title", value: "title", className: "" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created At",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];
  return (
    <div>
      <h1>Issues Component</h1>
      <NewIssueButton />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <Link
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </Link>
                {column.value === searchParams.orderBy && <ArrowUpIcon className="inline" gap="2"/>}
              </Table.ColumnHeaderCell>
              
            ))}

            {/* <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created At</Table.ColumnHeaderCell> */}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/Issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <StatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <StatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export const revalidate = 0;
export default Issues;
