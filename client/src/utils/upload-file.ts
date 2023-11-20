import axios from 'axios';

const uploadFile = async (data: File): Promise<string> => {
  const formData = new FormData();

  formData.append('file', data);
  formData.append('upload_preset', 'edssistance');
  const response = await axios.post('https://api.cloudinary.com/v1_1/dtori4rq2/upload', formData);

  return response?.data?.url;
};

export default uploadFile;
