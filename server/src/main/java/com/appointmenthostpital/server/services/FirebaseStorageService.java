package com.appointmenthostpital.server.services;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.Bucket;
import com.appointmenthostpital.server.exceptions.UploadFileException;
import com.google.cloud.storage.Blob;
import com.google.firebase.cloud.StorageClient;

@Service
public class FirebaseStorageService {
    public boolean validImage(MultipartFile file) {
        return file.getContentType().equals("image/png") ||
                file.getContentType().equals("image/jpg") ||
                file.getContentType().equals("image/jpeg");
    }

    public String uploadImage(MultipartFile file) {
        if (!validImage(file)) {
            throw new UploadFileException("Hình ảnh không hợp lệ");
        }
        try {
            // String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            String fileName = UUID.randomUUID().toString();
            Bucket bucket = StorageClient.getInstance().bucket();
            Blob blob = bucket.create(fileName, file.getBytes(), file.getContentType());

            return "https://firebasestorage.googleapis.com/v0/b/" + bucket.getName() + "/o/" +
                    java.net.URLEncoder.encode(blob.getName(), "UTF-8") + "?alt=media";
        } catch (Exception e) {
            e.printStackTrace();
            throw new UploadFileException("Không thể tải lên hình ảnh");
        }
    }
}
