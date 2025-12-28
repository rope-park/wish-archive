/**
 * Cloudinary 설정 파일
 * 
 * - Cloudinary v2 SDK 사용
 * - 환경 변수로부터 설정 값 로드
 */
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export default cloudinary;