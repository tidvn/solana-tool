import axios from 'axios';
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMzQTFkMEMzN0Y0MURBMzQzQWY3MzE0NUMwYzBhMGJmQkY5QTNiRTMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMTI3NDcwMzg2NCwibmFtZSI6InNvbGFuYS10b29sIn0.3qxPcEmBou5-IQEya1od-F_QwGKjHAMOYUTWR2Rz8MQ"
export async function uploadImageToIPFS(image: any) {


    const formData = new FormData();
    formData.append('file', image);
    const post = await axios.post(
        `https://api.nft.storage/upload`,
        formData,
        {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${apikey}`,
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    return post.data.value.cid;
}
export async function uploadMetadataToIPFS(metadata:any) {


    const formData = new FormData();
    formData.append('meta', JSON.stringify(metadata));
    const post = await axios.post(
        `https://api.nft.storage/store`,
        formData,
        {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${apikey}`,
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    return post.data.value.url;
}