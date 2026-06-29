import axios from "axios";

const imageUpload = async (image) => {
  const formData = new FormData();

  formData.append("image", image);

  const url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGEBB_API
  }`;

  const res = await axios.post(url, formData);

  return res.data.data.display_url;
};

export default imageUpload;