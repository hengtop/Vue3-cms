<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="#"
      :http-request="uploadAvatar"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { defineComponent, ref } from 'vue';

import { avatarLoader, getavatarById } from '@/network/api/fileLoader/avatarLoader';

export default defineComponent({
  emits: ['updateAvatar'],
  setup(props, { emit }) {
    const imageUrl = ref<string | null>(null);
    const avatarFile = ref<any>(null);
    const handleAvatarSuccess = (res: any, file: any) => {
      imageUrl.value = URL.createObjectURL(file.raw);
    };
    const beforeAvatarUpload = (file: any) => {
      avatarFile.value = file;
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        ElMessage.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    };
    //上传头像
    const uploadAvatar = async () => {
      const fd = new FormData();
      fd.append('avatar', avatarFile.value);
      try {
        const data = await avatarLoader(fd);
        ElMessage.success(data as any);
        const avatarRes: any = await getavatarById('15');
        //解析图片数据流
        let blob = new Blob([avatarRes], { type: 'image/jpeg' });
        const imgUrl = URL.createObjectURL(blob);
        //更新头像
        emit('updateAvatar', imgUrl);
      } catch (error) {
        console.log(error);
      }
    };
    return {
      imageUrl,
      handleAvatarSuccess,
      beforeAvatarUpload,
      uploadAvatar,
      avatarFile
    };
  }
});
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #bfa;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.el-upload {
  border: 1px dashed #000;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
