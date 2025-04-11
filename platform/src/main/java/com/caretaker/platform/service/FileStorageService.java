package com.caretaker.platform.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${file.max-size}")
    private String maxFileSize;

    public String storeFile(MultipartFile file, String subDirectory) throws IOException {
        // Create directories if they don't exist
        Path uploadPath = Paths.get(uploadDir, subDirectory).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);

        // Check file size
        long maxSize = parseSize(maxFileSize);
        if (file.getSize() > maxSize) {
            throw new IOException("File size exceeds maximum limit of " + maxFileSize);
        }

        // Create a unique filename
        String fileExtension = getFileExtension(file.getOriginalFilename());
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

        // Save the file
        Path targetLocation = uploadPath.resolve(uniqueFileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        return subDirectory + "/" + uniqueFileName;
    }

    private String getFileExtension(String fileName) {
        if (fileName == null) return "";
        int lastDot = fileName.lastIndexOf('.');
        if (lastDot >= 0) {
            return fileName.substring(lastDot);
        }
        return "";
    }

    private long parseSize(String size) {
        size = size.toUpperCase();
        if (size.endsWith("KB")) {
            return Long.parseLong(size.substring(0, size.length() - 2)) * 1024;
        } else if (size.endsWith("MB")) {
            return Long.parseLong(size.substring(0, size.length() - 2)) * 1024 * 1024;
        } else if (size.endsWith("GB")) {
            return Long.parseLong(size.substring(0, size.length() - 2)) * 1024 * 1024 * 1024;
        }
        return Long.parseLong(size);
    }
}