import { Nft } from '@/types/nft';
import axios from 'axios';


export const getMetadata = async (input: string) => {
    try {
        const response = await axios.get(input);
        return response.data
    } catch (e) {
        return ""
    }

}