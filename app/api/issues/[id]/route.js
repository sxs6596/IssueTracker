import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { PatchIssueSchema } from "@/app/ValidationSchema";
export async function PATCH(NextRequest, { params }) {
  const id = params.id;
  const body = await NextRequest.json();
  const validation = PatchIssueSchema.safeParse(body);
  if (!validation) NextResponse.json(validation.error, { status: 400 });

  const { assignedToUserId } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });
    if (!user) NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  // find the issue in the database using prisma client.
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!issue) NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  // update the issue in the database using the prisma client.
  const updatedIssue = await prisma.issue.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: body.title,
      description: body.description,
      assignedToUserId,
    },
  });
  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(NextRequest, { params }) {
  const id = params.id;
  // find the issue in the database using prisma.
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!issue) NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  // delete the issue from the database using prisma.
  const deletedIssue = await prisma.issue.delete({
    where: {
      id: parseInt(id),
    },
  });
  return NextResponse.json(deletedIssue, { status: 200 });
}
