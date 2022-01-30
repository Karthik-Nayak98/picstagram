import React, { useContext, useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

import { db, storage } from "../firebase/firebase";
import { AuthContext } from "../context/authcontext";

import useFirestore from "../hooks/useFirestore";
import ProgressBar from "../components/progressbar/progressbar";
import Photo from "../components/photo/photo.component";

function HomePage() {
  const [likes, setLikes] = useState([]);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState();
  const [uploadURL, setUploadURL] = useState();
  const { user } = useContext(AuthContext);

  const imageData = useFirestore("images-info");
  const userData = useFirestore("users");

  const filterUser = uid => {
    const data = userData.filter(dat => dat.id === uid);
    return data;
  };

  useEffect(() => {
    if (user?.uid)
      userData.forEach(data => {
        if (data.id === user?.uid) setLikes(data.likes);
      });
  }, [userData, user?.uid]);

  // Check whether particular image is liked by the user.
  const isImageLikedFromUser = id => {
    return likes.includes(id);
  };

  const handleChange = event => {
    const file = event.target.files[0];
    const filename = file.name;

    setFile(file);
    // Allowing file type
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (!allowedExtensions.exec(filename)) {
      alert("Invalid file type");
      file.value = "";
      return false;
    }

    const imageRef = ref(storage, `images/${filename}_${user?.uid}`);
    const uploadTask = uploadBytesResumable(imageRef, file);

    //Progress bar only shows the images more than 256kB
    uploadTask.on(
      "state_changed",
      snapshot => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      err => console.log(err),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setUploadURL(url);

        const data = {
          createdAt: serverTimestamp(),
          imageUrl: url,
          uid: user?.uid,
          likeCount: 0,
          imageName: `${filename}_${user?.uid}`,
        };

        const usersDb = doc(collection(db, "images-info"));
        await setDoc(usersDb, data);
      }
    );
  };

  return (
    <div>
      {file ? (
        <ProgressBar
          url={uploadURL}
          setFile={setFile}
          uploadPercent={progress}
        />
      ) : null}
      <div
        className='mx-auto mt-20 grid grid-cols-1 xs:grid-cols-2 xs:gap-2 md:grid-cols-3 lg:grid-cols-4 
      sm:gap-6 md:gap-8 w-4/5 sm:w-3/4 md:w-11/12 min-h-screen'>
        {imageData?.map(item => {
          const filteredData = filterUser(item.uid);
          const isLiked = isImageLikedFromUser(item.id);
          return (
            <Photo
              key={item.id}
              imageName={item.imageName}
              uid={item.uid}
              id={item.id}
              imageUrl={item.imageUrl}
              displayName={filteredData[0]?.displayName}
              photoURL={filteredData[0]?.photoURL}
              likeCount={item.likeCount}
              isLiked={isLiked}
            />
          );
        })}
      </div>
      {user?.uid ? (
        <div>
          <div className='fixed right-2 bottom-12'>
            <label
              className='rounded w-10 h-10 shadow-lg shadow-slate-300 cursor-pointer'
              htmlFor='image-upload'>
              <BsPlusLg size='2rem' className='text-pink-400' />
            </label>
            <input
              id='image-upload'
              accept='image/*'
              className='w-1 h-1 absolute opacity-0'
              type='file'
              onChange={handleChange}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default HomePage;
