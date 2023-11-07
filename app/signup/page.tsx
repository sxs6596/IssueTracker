'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    
      } = useForm();
    return (
        <div>
            <h3>SignUp Form</h3>
            <form onSubmit={handleSubmit((data)=>{console.log(data)})}>
                <div className="form-group">
                    <label htmlFor="exampleInputName">Name</label>
                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Enter name" {...register('firstName',{
                        required: 'FirstName is required'

                    })} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputSurname">LastName</label>
                    <input type="text" className="form-control" id="exampleInputSurname" aria-describedby="surnameHelp" placeholder="Enter Lastname"{...register('LastName',{
                        required:'LastName is required'
                    })} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"{...register('Email',{
                        required:'Email is required'
                    })} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" {...register('Password',{
                        required:'Password is required', 
                        minLength:{
                            value:8, 
                            message:'Password must be at least 8 characters'
                        }
                    })}/>
                    {errors.Password && (<p>Error Occured</p>)}
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
            </form>
        </div>
    )
}

export default SignUp;