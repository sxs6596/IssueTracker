import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { IssueSchema } from "@/app/ValidationSchema";
export async function PATCH(NextRequest, { params }) {
  const id = params.id;
  const body = await NextRequest.json();
  const validation = IssueSchema.safeParse(body);
  if (!validation) NextResponse.json(validation.error, { status: 400 });
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!issue) NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue, { status: 200 });
}
