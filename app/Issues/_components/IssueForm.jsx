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
      try{
      setSubmitting(true);
      console.log('data submitted is:', data);
      if(issue){
        await axios.patch('/api/issues/'+issue.id, data);
        console.log(`data submitted is :${data}`); 
        
      }else{
        await axios.post('/api/issues', data);
      }
      router.push('/Issues');
      router.refresh();
    }catch(error){
      setSubmitting(false);
      console.log(error); 
    }
    })}>
        <h3>Edit Issue Form For Issue {issue.id}</h3>
        <TextField.Root>
        <TextField.Input placeholder={issue.title}  {...register('title')}/>
        </TextField.Root>
        {errors.title && <p color="red">{errors.title.message}</p>}
        <TextArea placeholder={issue.description}  {...register('description')}/>
        {errors.description && <p color="red">{errors.description.message}</p>}
        <Button type="submit">Submit {submitting && <Spinner/>}</Button>
    </form>
  )
}

export default IssueForm