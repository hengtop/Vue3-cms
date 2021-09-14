import fileLoaderRequest from './index';

//上传头像
const avatarLoader = (formData: any) => {
  return fileLoaderRequest.request({
    url: '/upload/avatar',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData
  });
};
//获取头像
const getavatarById = (id: string) => {
  return fileLoaderRequest.request({
    url: `/users/${id}/avatar`,
    responseType: 'blob',
    method: 'GET'
  });
};

export { avatarLoader, getavatarById };
