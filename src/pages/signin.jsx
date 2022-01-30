import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmail } from "../firebase/firebase-auth";

import FormInput from "../components/form-input/form-input.component";
import FormLabel from "../components/form-label/form-label.component";
import Header from "../components/header/header.component";
import InputContainer from "../components/input-container/input-container.component";
import Spinner from "../components/spinner/spinner";

const initialState = {
  email: "",
  password: "",
};

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleChange(event) {
    const key = event.target.name;
    const inputValue = event.target.value;

    setForm({ ...form, [key]: inputValue });
    setError("");
  }

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmail(form.email, form.password);

      navigate("/");
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          setError("Please enter the correct password.");
          break;
        case "auth/user-not-found":
          setError("User is not found.");
          break;
        default:
          setError("");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className='rounded-lg max-w-md mt-20 p-4 mx-auto w-11/12 shadow-xl border border-gray-200 shadow-slate-200'>
      <Header title='SIGN IN' />
      {error.length ? (
        <p className='text-sm text-left p-1 text-red-600'>{error}</p>
      ) : null}
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <FormLabel htmlFor='email' title='Email' />
          <FormInput
            value={form.email}
            name='email'
            id='email'
            type='email'
            onChange={handleChange}
            required
          />
        </InputContainer>

        <InputContainer>
          <FormLabel htmlFor='password' title='Password' />
          <FormInput
            value={form.password}
            name='password'
            id='password'
            type='password'
            onChange={handleChange}
            required
          />
        </InputContainer>
        <Link to='/signup'>
          <p className='text-pink-400 text-sm'>
            Do not have an account? SignUp here!
          </p>
        </Link>
        {isLoading ? <Spinner /> : null}
        <div className='mt-3 flex gap-2 items-center text-sm font-medium'>
          <button
            type='submit'
            className='bg-pink-400 rounded uppercase tracking-wider text-white font-medium px-8 py-2'>
            SignIn
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
