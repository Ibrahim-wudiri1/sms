import { useState } from "react";
import api from "../../../api/axios";

interface CertificateUploadProps {
  enrollmentId: number;
  certificateUrl?: string;
  onUploadSuccess: (fileUrl: string, fileName: string) => void;
}

const CertificateUpload = ({ enrollmentId, certificateUrl, onUploadSuccess }: CertificateUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(certificateUrl || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate if it's a PDF
      if (selectedFile.type !== "application/pdf") {
        setError("Please select a PDF file");
        setFile(null);
        return;
      }

      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("file", file);

      // Upload to Supabase or local storage via API
      // For now, we'll send the file and let the backend handle storage
      const response = await api.post(`/admin/enrollments/${enrollmentId}/certificate`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        onUploadSuccess(response.data.fileUrl, response.data.fileName);
        setFile(null);
        setPreview(response.data.fileUrl);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to upload certificate";
      setError(errorMessage);
      console.error("Error uploading certificate:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        {preview ? (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 16a2 2 0 100-4 2 2 0 000 4zm0-2a1 1 0 110-2 1 1 0 010 2zm6.062-2h1.414l4.128 4.128a1 1 0 11-1.414 1.414L15.062 13h-1.414a1 1 0 110-2z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-700 font-semibold">Certificate Uploaded ✓</span>
          </div>
        ) : (
          <span className="text-sm text-red-600 font-semibold">⚠ No Certificate Uploaded</span>
        )}
      </div>

      {!preview && (
        <form onSubmit={handleUpload} className="space-y-2">
          {error && (
            <div className="p-2 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={loading}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          {file && (
            <div className="text-sm text-gray-600">
              Selected: <span className="font-semibold">{file.name}</span> ({(file.size / 1024).toFixed(2)} KB)
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !file}
            className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm font-semibold transition"
          >
            {loading ? "Uploading..." : "Upload Certificate"}
          </button>
        </form>
      )}

      {preview && (
        <a
          href={preview}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold transition"
        >
          📄 View Certificate
        </a>
      )}
    </div>
  );
};

export default CertificateUpload;
