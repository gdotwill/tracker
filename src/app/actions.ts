'use server'

import { revalidatePath } from "next/cache";
import prisma from "../../prisma/client";
import { redirect } from "next/navigation";

export async function getTasks() {
    try {
        const issues = await prisma.issue.findMany() 
    } catch (error) {
        console.log(error)    
    }

}

export async function addTask(formData: FormData) {
    try {
        await prisma.issue.create({
            data: {
                title: formData.get('title') as string,
                description: formData.get('description') as string
            }
        })
       
    } catch (error) {
        console.log(error)
    
    }

    redirect('/issues')
  
}


