'use client';

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames';
import { Button, Callout, Spinner, TextArea, TextField } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '../../components/ErrorMessage'

import prisma from "../../../../prisma/client";

import { addTask } from '@/app/actions';

import { getTasks } from '@/app/actions';


type IssueForm = z.infer<typeof createIssueSchema>


const NewIssuePage = () => {
    // const router = useRouter()
    const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    // const onSubmit = handleSubmit(async(data) => {
    //     try {
    //         setSubmitting(true) 
    //         await axios.post('/api/issues', data)
    //         router.push('/issues')
            
    //     } catch (error) {
    //         setSubmitting(false)  
    //         console.log(error) 
    //         setError('Unexpected error')         
          
    //     }

    // });

    // const issues = getTasks()


    return (
        <div className='max-w-xl space-y-3'>
            { error && 
                <Callout.Root color='red' className='mb-5'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            }
            <form className="space-y-3" action={addTask} >
                <TextField.Root 
                    placeholder="Search the docs…" size="1"
                    {...register('title')}
                />
                {errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
                <TextArea placeholder="Reply to comment…"  {...register('description')}/>
                {errors.description && <ErrorMessage>{errors.description?.message}</ErrorMessage>}
                <Button disabled={isSubmitting}>Submit new issue
                    {isSubmitting && <Spinner /> }
                </Button>
            </form> 

            <br />

            
            
            {/* <ul>
                {issues.map((issue) => (
                    <li key={issue.id}>{issue.title}</li>   
                ) )}  
            </ul> */}
        </div>
   
     
    )
}

export default NewIssuePage
