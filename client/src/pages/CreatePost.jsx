import React, { useRef, useState } from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import{app} from "../firebase.js";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import {CircularProgressbar} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css";

export default function CreatePost() {
  const quillRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageFileUploadError("Plese select an image")
        return;
      }
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError(
            "Could not Upload image(File must be less than 2MB)"
          );
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
          setImageFileUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageFileUrl(downloadUrl);
            setFormData({ ...formData, image: downloadUrl });
            setImageFileUploading(false);
          });
        }
      );
    } catch (error) {
      setImageFileUploadError("Image Upload Failed");
      setImageFileUploadProgress(null)
      console.log(error)

    }
  };
  return (
    <div className=" p-3 max-w-7xl mx-auto min-h-screen 0">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Tilte"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageFileUploadProgress}
          >
           {imageFileUploadProgress ? <div className="w-16 h-16">
            <CircularProgressbar value={imageFileUploadProgress} text={`${imageFileUploadProgress || 0}`} />
            <span>Uploading...</span>

           </div>:"Upload Image"}
          </Button>
        </div>
        {imageFileUploadError && <Alert color='failure'>{
          imageFileUploadError}</Alert>}
          {formData.image &&(
            <img src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover" />
          )}
        <ReactQuill
          ref={quillRef}
          theme="snow"
          placeholder="Write something....."
          className="h-72 mb-12 "
          required
        />
        <Button type="submit" gradientDuoTone={"purpleToPink"}>
          Publish
        </Button>
      </form>
    </div>
  );
}
