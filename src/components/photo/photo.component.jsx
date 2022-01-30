import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useContext, useState } from "react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authcontext";
import { db, storage } from "../../firebase/firebase";

function Photo({
  uid,
  id,
  imageUrl,
  imageName,
  displayName = "",
  photoURL = "",
  likeCount,
  isLiked,
}) {
  const { user } = useContext(AuthContext);
  const [like, setLike] = useState(isLiked);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const imagesDoc = doc(db, "images-info", id);
    const storageRef = ref(storage, `images/${imageName}`);

    // Delete the file
    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.log(error);
    }

    // Delete document from firestore
    try {
      await deleteDoc(imagesDoc);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislike = async () => {
    if (!user?.uid) navigate("/signin");

    setLike(false);

    const imageDocRef = doc(db, "images-info", id);
    const usersDocRef = doc(db, "users", user?.uid);

    if (likeCount > 0) likeCount = likeCount - 1;
    else likeCount = 0;

    await updateDoc(imageDocRef, { likeCount: likeCount });
    await updateDoc(usersDocRef, {
      likes: arrayRemove(id),
    });
  };

  const handleLike = async () => {
    if (!user?.uid) navigate("/signin");

    setLike(true);
    const imageDocRef = doc(db, "images-info", id);
    const usersDocRef = doc(db, "users", user?.uid);
    await updateDoc(imageDocRef, { likeCount: likeCount + 1 });
    await updateDoc(usersDocRef, {
      likes: arrayUnion(id),
    });
  };

  return (
    <div
      key={id}
      className='shadow-lg w-full shadow-slate-300 rounded-lg sm:w-56 my-3 h-72'>
      <figure className='h-60'>
        <img
          className='p-1 object-cover h-60 mx-auto'
          src={imageUrl}
          alt={displayName}
        />
      </figure>
      <figcaption className='px-3 py-2 flex mt-2 justify-between'>
        <div className='flex gap-1'>
          <img
            className='rounded-full w-7 h-7'
            src={photoURL}
            alt={displayName}
          />
          <Link
            to='/profile'
            state={{
              name: displayName,
              imageUrl: photoURL,
              uid: uid,
            }}>
            <p className='cursor-pointer'>{displayName}</p>
          </Link>
        </div>
        <p className='flex items-center gap-1'>
          <>
            {user?.uid === uid ? (
              <MdDelete
                size='1.3rem'
                className='text-red-500 cursor-pointer'
                onClick={handleDelete}
              />
            ) : null}

            {isLiked ? (
              <>
                <BsHeartFill
                  onClick={handleDislike}
                  className='cursor-pointer mt-1 text-red-500'
                  size='1.2rem'
                />
                {likeCount}
              </>
            ) : (
              <>
                <BsHeart
                  onClick={handleLike}
                  className='cursor-pointer mt-1 text-red-500'
                  size='1.2rem'
                />
                {likeCount}
              </>
            )}
          </>
        </p>
      </figcaption>
    </div>
  );
}

export default Photo;
