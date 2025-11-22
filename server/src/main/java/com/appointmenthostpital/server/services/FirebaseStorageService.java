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

    public boolean validImage(String contentType) {
        return contentType.equals("image/png") ||
                contentType.equals("image/jpg") ||
                contentType.equals("image/jpeg");
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

    public String uploadImage(byte[] file, String contentType) {
        if (!validImage(contentType)) {
            throw new UploadFileException("Hình ảnh không hợp lệ");
        }
        try {
            // String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            String fileName = UUID.randomUUID().toString();
            Bucket bucket = StorageClient.getInstance().bucket();
            Blob blob = bucket.create(fileName, file, contentType);

            return "https://firebasestorage.googleapis.com/v0/b/" + bucket.getName() + "/o/" +
                    java.net.URLEncoder.encode(blob.getName(), "UTF-8") + "?alt=media";
        } catch (Exception e) {
            e.printStackTrace();
            throw new UploadFileException("Không thể tải lên hình ảnh");
        }
    }

    private boolean isValidFirebaseImageUrl(String imageUrl) {
        // https://firebasestorage.googleapis.com/v0/b/appointment-hospital-j2ee.firebasestorage.app/o/850bd152-24fd-49fa-a3e4-d2da95442a8d?alt=media
        return !imageUrl.isEmpty() && imageUrl != null && 
        imageUrl.contains("firebasestorage.googleapis.com/v0/b/") && imageUrl.contains("/o/") && imageUrl.contains("?alt=media");
    }

    public void removeImage(String imageUrl) {
        if (!isValidFirebaseImageUrl(imageUrl)) {
            return;
        }
        String blobPath = imageUrl.substring(imageUrl.indexOf("/o/") + 3, imageUrl.indexOf("?"));
        Bucket bucket = StorageClient.getInstance().bucket();
        Blob blob = bucket.get(blobPath);
        if (blob != null) {
            blob.delete();
        }
    }
}
