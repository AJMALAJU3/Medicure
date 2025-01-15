const cloudName = 'dwyxogyrk';
const uploadPreset = 'Medicure';

export const uploadCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to upload image: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.secure_url) {
            console.log("Uploaded image URL:", data.secure_url);
            return data.secure_url;
        } else {
            console.warn("Image upload succeeded but no URL was returned.");
            return null;
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
};
