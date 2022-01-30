import React, { useState } from "react";

import FormInput from "../components/form-input/form-input.component";
import FormLabel from "../components/form-label/form-label.component";
import Header from "../components/header/header.component";
import InputContainer from "../components/input-container/input-container.component";
import Spinner from "../components/spinner/spinner";

import { createUser } from "../firebase/firebase-auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const initialState = {
  name: "",
  email: "",
  password: "",
  file: "",
};

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const setUsers = async (url, uid) => {
    const userState = {
      displayName: form.name,
      photoURL: url,
      likes: [],
      createdAt: serverTimestamp(),
    };
    // uid is the document id.
    const document = doc(db, "users", uid);
    await setDoc(document, userState);
  };

  function handleChange(event) {
    const key = event.target.name;
    const inputValue = event.target.value;

    if (event.target.name === "file") {
      const file = event.target.files[0];
      var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

      if (!allowedExtensions.exec(file.name)) {
        alert("Invalid file type");
        file.value = "";
        return false;
      }
      setForm({ ...form, [key]: file });
      setImage(file.value);
    } else setForm({ ...form, [key]: inputValue });
    setError("");
  }

  const handleSignUp = async event => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await createUser(form.email, form.password);
      const imageRef = ref(
        storage,
        `userimage/${auth.currentUser.uid}/profile.jpg`
      );
      const uploadTask = uploadBytesResumable(imageRef, form.file);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(prog);
        },
        err => {
          console.log(err);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);

          await updateProfile(auth.currentUser, {
            displayName: form.name,
            photoURL: url,
          });
          setUsers(url, auth.currentUser.uid);
          setForm(initialState);
        }
      );
      setImage("");
      navigate("/", { replace: true });
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("Email is invalid");
          break;

        case "auth/email-already-in-use":
          setError("Email is already present.");
          break;
        case "auth/weak-password":
          setError("Password should have atleast 6 characters.");
          break;
        default:
          setError("");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className='rounded-lg max-w-md mt-20 p-4 mx-auto w-11/12 shadow-xl border border-gray-200 shadow-slate-200'>
      <Header title='SIGN UP' />
      {error.length ? (
        <p className='text-left py-2 text-red-600'>{error}</p>
      ) : null}
      <form onSubmit={handleSignUp}>
        <InputContainer>
          <FormLabel htmlFor='text' title='Name' />
          <FormInput
            value={form.name}
            name='name'
            id='text'
            type='text'
            onChange={handleChange}
            required
          />
        </InputContainer>

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

        <InputContainer>
          <FormLabel htmlFor='file' title='Image' />
          <FormInput
            value={image}
            name='file'
            id='file'
            accept='image/*'
            type='file'
            onChange={handleChange}
            required
          />
        </InputContainer>
        {isLoading ? <Spinner /> : null}
        <button
          type='submit'
          className='mt-3 tracking-wider bg-pink-400 rounded text-gray-50 text-sm font-medium px-5 py-2 uppercase'>
          SignUp
        </button>
      </form>
    </div>
  );
}

export default SignUp;
