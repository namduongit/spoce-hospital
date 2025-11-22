package com.appointmenthostpital.server.dtos;

public class UploadFile {
    public static class UploadDoctorImage {
        private Long id;

        private byte[] file;
        private String contentType;

        public void setFile(byte[] file) {
            this.file = file;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public void setContentType(String contentType) {
            this.contentType = contentType;
        }

        public byte[] getFile() {
            return file;
        }

        public Long getId() {
            return id;
        }

        public String getContentType() {
            return contentType;
        }
    }
    
}