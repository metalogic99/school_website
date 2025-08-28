import { getDynamicSignature } from "@/server/actions/gallery/upload.action";
import { getCloudinaryApiKey, getCloudinaryUploadUri } from "./constants";


export default  async function CloudinaryUpload({image,folder}:{image:any,folder:string}){
    if (image) {
        const { timestamp, signature } = await getDynamicSignature(folder);
        const formData = new FormData();
        formData.append("file", image);
  
        const endpoint = getCloudinaryUploadUri();
        formData.append("api_key", getCloudinaryApiKey());
        formData.append("signature", signature);
        formData.append("timestamp", timestamp.toString());
        formData.append("folder", folder);
  
        const res = await fetch(endpoint, { method: "POST", body: formData });
        if (res.ok) {
          const res_data = await res.json();
          return res_data;
        } else {
          throw new Error("Couldn't upload image.");
        }
      }

    
}