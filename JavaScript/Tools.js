const fileInput = document.getElementById('fileInput');
const formatSelect = document.getElementById('formatSelect');
const convertButton = document.getElementById('convertButton');
const canvas = document.getElementById('canvas');
const downloadLink = document.getElementById('downloadLink');
const errorMessage = document.getElementById('error');

const supportedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/gif', 'image/avif'];

convertButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    const selectedFormat = formatSelect.value;

    if (!file) {
        alert('Please upload a picture first.');
        return;
    }

    if (!supportedFormats.includes(selectedFormat)) {
        errorMessage.style.display = 'block';
        downloadLink.style.display = 'none';
        return;
    }

    errorMessage.style.display = 'none';
    downloadLink.style.display = 'none';  // Hide download link initially

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function() {
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            let convertedUrl;
            if (selectedFormat === 'image/jpeg') {
                convertedUrl = canvas.toDataURL('image/jpeg', 0.9);
            } else if (selectedFormat === 'image/png') {
                convertedUrl = canvas.toDataURL('image/png');
            } else if (selectedFormat === 'image/webp') {
                convertedUrl = canvas.toDataURL('image/webp', 0.9);
            } else if (selectedFormat === 'image/bmp') {
                convertedUrl = canvas.toDataURL('image/bmp');
            } else if (selectedFormat === 'image/gif') {
                convertedUrl = canvas.toDataURL('image/gif');
            } else if (selectedFormat === 'image/avif') {
                convertedUrl = canvas.toDataURL('image/avif');
            }

            // Introduce a random delay between 0 and 1000 milliseconds (0-1 second)
            const delay = Math.random() * 1000;

            setTimeout(() => {
                downloadLink.href = convertedUrl;
                downloadLink.style.display = 'inline';  // Show the download link after the delay
                downloadLink.download = `converted-image.${selectedFormat.split('/')[1]}`;
                downloadLink.innerHTML = `Download ${selectedFormat.split('/')[1].toUpperCase()}`;

                // Change button text to 'Converted'
                convertButton.innerHTML = 'Converted';

                // Wait for 1 second then change button text back to 'Convert'
                setTimeout(() => {
                    convertButton.innerHTML = 'Convert';  // Change button text back to 'Convert'
                }, 1000);  // 1000 milliseconds = 1 second

                // Reset the file input
                fileInput.value = '';  
            }, delay);
        };
    };
});
