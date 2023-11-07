import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import {IssueSchema} from '@/app/ValidationSchema';
export async function POST(request:NextRequest){
    
    const body = await request.json();

    // validation 
    const validation = IssueSchema.safeParse(body); 

    if(!validation){
    return NextResponse.json({error:'error occured'}, {status:400})
    }
    const newIssue = await prisma.issue.create({
        data:{
            title:body.title, 
            description:body.description
        }
    })
    return NextResponse.json(newIssue, {status:201});
}