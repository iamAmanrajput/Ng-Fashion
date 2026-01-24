import cloudinary from "@/lib/cloudinary";

interface UploadOptions {
  folder: string;
  height?: number;
  quality?: number;
}

export async function uploadImageToCloudinary(
  file: File,
  options: UploadOptions,
) {
  const { folder, height, quality } = options;

  // File → Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<{ public_id: string; secure_url: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: "auto",
            height,
            quality,
          },
          (error, result) => {
            if (error) return reject(error);
            if (!result) return reject(new Error("Upload failed"));
            resolve({
              public_id: result.public_id,
              secure_url: result.secure_url,
            });
          },
        )
        .end(buffer);
    },
  );
}
