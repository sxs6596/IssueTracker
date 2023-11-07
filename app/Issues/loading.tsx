import { Table } from "@radix-ui/themes";
import StatusBadge from "../components/StatusBadge";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import NewIssueButton from "./NewIssueButton";
const LoadingIssuesComponent = () => {
    const issues = [1,2,3,4,5];
  return (
    <div>
      <NewIssueButton/>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.RowHeaderCell>
                <Skeleton/>
                <div className="block md:hidden">
                  {/* <StatusBadge status={issue.status} /> */}
                  <Skeleton/>
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                {/* <StatusBadge status={issue.status} /> */}
                <Skeleton/>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {/* {issue.createdAt.toLocaleDateString()} */}
                <Skeleton/>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingIssuesComponent;
