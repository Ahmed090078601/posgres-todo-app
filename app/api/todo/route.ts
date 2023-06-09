
import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from "next/server";

export async function  GET(request: NextRequest) {
    const client = await db.connect();
    try{
await client.sql`CREATE TABLE IF NOT EXISTS Todos(id serial, Task varchar(255));`
return NextResponse.json({message:"You called this api"});
}catch(err){
        console.log(err)
return NextResponse.json("Something went wrong")
    }
    }

    export async function POST(request: NextRequest){
        const client = await db.connect();
        const req = await request.json();
        try {
            if(req.task){
               const res = await client.sql`INSERT INTO Todos(TASK) VALUES(${req.task})`
               console.log(res) 
               return NextResponse.json({message: "Data Added Successfully"})
            } else {
                throw new Error("Task field is required")
            } }
            catch (error) {
             return NextResponse.json({ message: (error as { message: string}).message})   
            }
        }
    