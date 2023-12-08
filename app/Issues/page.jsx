import { Button } from "@radix-ui/themes";
import { Table } from "@radix-ui/themes";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import delay from "delay";
import prisma from "@/prisma/client";
import StatusBadge from "../../app/components/StatusBadge";
import NewIssueButton from "./NewIssueButton";
import PaginationComponent from "../components/PaginationComponent";

const Issues = async ({ searchParams }) => {
  const columns = [
    { label: "Title", value: "title", className: "" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created At",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];
  console.log(`searchParams is ${searchParams.status}`);
  // const statuses = Object.values(Status);
  // const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10; 
  const issuesCount = await prisma.issue.count({
    where:{
      status : searchParams.status
    }
  })
  const issues = await prisma.issue.findMany({
    where: {
      status: searchParams.status,
    },
    orderBy,
    skip: (page - 1) * 10,
    take: pageSize,
  });
  await delay(2000);

  
  // declare the columns for the table.
  
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
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" gap="2" />
                )}
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
      <PaginationComponent itemsCount={issuesCount} pageSize={pageSize} currentPage={page}/>
    </div>
  );
};
export const revalidate = 0;

export const metadata = {
  title:"Issues List", 
  description:" View all list of issues."
}
export default Issues;