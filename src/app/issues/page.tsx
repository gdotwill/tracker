import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import prisma from "../../../prisma/client";

const IssuesPage = async() => {
    const issues = await prisma.issue.findMany()
    return (
      <div>
            <ul>
                {issues.map((issue)=> (
                    <li key={issue.id}>{issue.title}</li>
                ))}
            </ul>
        <Button><Link href='/issues/new'>New Issue</Link></Button>
      </div>
    )

}

export default IssuesPage
