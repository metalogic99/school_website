export const getThumbNailFromCloudinaryUrl = (imgUrl: any) => {
  const thumbnail = imgUrl.split("/");
  let uploadIndex = thumbnail.indexOf("upload");
  // Insert a new segment after 'upload'
  if (uploadIndex !== -1) {
    thumbnail.splice(uploadIndex + 1, 0, "w_50");
  }
  const thumbnailPhoto = thumbnail.join("/");
  return thumbnailPhoto;
};
