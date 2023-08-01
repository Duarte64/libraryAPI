import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";


dotenv.config();

const accessKey = process.env.AWS_IAM_USER_KEY ?? "";
const bucketName = process.env.AWS_S3_BUCKET_NAME ?? "";
const bucketRegion = process.env.AWS_S3_BUCKET_REGION ?? "";
const secretAccessKey = process.env.AWS_IAM_USER_SECRET ?? "";

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion,
});

export async function makeUploadToS3(nomeArquivo: string, arquivo: any) {
    const params = new PutObjectCommand({
        Bucket: bucketName,
        Key: nomeArquivo,
        Body: arquivo.buffer,
        ContentType: arquivo.mimetype,
    });
    try {
        await s3.send(params);
    } catch (error) {
        throw new Error('Erro ao fazer upload do arquivo para o S3');
    }
}

export async function getSignedUrlFromS3(nomeArquivo: string) {
    const params = new GetObjectCommand({
        Bucket: bucketName,
        Key: nomeArquivo,
    });
    try {
        const url = await getSignedUrl(s3, params, { expiresIn: 3600 });
        return url;
    } catch (error) {
        throw new Error('Erro ao fazer download do arquivo para o S3');
    }
}