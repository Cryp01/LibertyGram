
console.log('astivo');
const imageUploader = document.getElementById('img-uploader');
const imageUploadbar = document.getElementById('img-upload-bar');
const preview = document.getElementById('preview');
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/blutugs/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'rry5sebb';
var img = [];


imageUploader.addEventListener('change', async (e) => {
    // console.log(e);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    // Send to cloudianry
    const res = await axios.post(
        CLOUDINARY_URL,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress (e) {
                let progress = Math.round((e.loaded * 100.0) / e.total);
                console.log(progress);
                imageUploadbar.setAttribute('value', progress);
            }
        }
    );
    img[0] = res.data.secure_url;
    preview.style.cssText = "display:flex;";
    preview.src = img[0];
    
});
