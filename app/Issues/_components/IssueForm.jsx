'use client';
import {useState} from 'react';
import { TextField, TextArea } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {useForm, Controller} from 'react-hook-form';
import {Button} from '@radix-ui/themes'
import{zodResolver} from '@hookform/resolvers/zod';
import { IssueSchema } from '@/app/ValidationSchema';
import Spinner from '@/app/components/Spinner';

const IssueForm = (props) => {
  const issue = props.issue
  const [submitting, setSubmitting] = useState(true); 
  const {register, control, handleSubmit, formState:{
    errors, 
    isSubmitting
  }} = useForm({
    resolver:zodResolver(IssueSchema)
  });
  const router = useRouter();
  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(async(data)=>{
      setSubmitting(true);
      const response  = await axios.post('/api/issues', data);
      if(response.status === 201){
        // setSubmitting(false);
        router.push('/Issues')
      }
    })}>
        <h3>Edit Issue Form For Issue {issue.id}</h3>
        <TextField.Root>
        <TextField.Input placeholder="Insert the new issue Title..." value={issue.title} {...register('title')}/>
        </TextField.Root>
        {errors.title && <p color="red">{errors.title.message}</p>}
        <TextArea placeholder="Reply to comment…" value={issue.description} {...register('description')}/>
        {errors.description && <p color="red">{errors.description.message}</p>}
        <Button type="submit">Submit {submitting && <Spinner/>}</Button>
    </form>
  )
}

export default IssueForm