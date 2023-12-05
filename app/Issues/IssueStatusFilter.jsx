"use client";
import React from "react";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
const IssueStatusFilter = () => {
  const Statuses = [
    { label: "All"},
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "DONE" },
  ];
  const router = useRouter(); 
  return (
    <>
      <Select.Root onValueChange={(status)=>{
           const query = status ? `?status=${status}` : "";
           router.push('/Issues'+query);
      }}>
        <Select.Trigger />
        <Select.Content>
          {Statuses.map((status) => (
            <Select.Item value={status.value} key={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default IssueStatusFilter;
