'use client';

import { useState, useRef } from 'react';
import { Upload, Loader2, X, ImageIcon } from 'lucide-react';

const CLOUDINARY_CLOUD_NAME = 'danlcvxu6';
const CLOUDINARY_UPLOAD_PRESET = 'Trustteens';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

interface CloudinaryImageUploadProps {
    label: string;
    value: string;
    onUpload: (url: string) => void;
}

export default function CloudinaryImageUpload({ label, value, onUpload }: CloudinaryImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file.');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('Image must be less than 10MB.');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            const response = await fetch(CLOUDINARY_UPLOAD_URL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Upload failed (${response.status})`);
            }

            const data = await response.json();
            onUpload(data.secure_url);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
        } finally {
            setUploading(false);
            // Reset file input so the same file can be re-selected
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemove = () => {
        onUpload('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>

            {/* Preview */}
            {value && (
                <div className="relative mb-2 inline-block">
                    <img
                        src={value}
                        alt={label}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                        title="Remove image"
                    >
                        <X size={12} />
                    </button>
                </div>
            )}

            {/* Upload button */}
            <div className="flex items-center gap-2">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="hidden"
                    id={`cloudinary-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm transition-colors w-full ${uploading
                            ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer'
                        }`}
                >
                    {uploading ? (
                        <>
                            <Loader2 size={14} className="animate-spin" />
                            Uploading…
                        </>
                    ) : value ? (
                        <>
                            <Upload size={14} />
                            Change Image
                        </>
                    ) : (
                        <>
                            <ImageIcon size={14} />
                            Upload Image
                        </>
                    )}
                </button>
            </div>

            {/* Error */}
            {error && (
                <p className="text-xs text-red-500 mt-1">{error}</p>
            )}
        </div>
    );
}
