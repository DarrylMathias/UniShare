document.getElementById('photo-input').addEventListener('change', function (e) {
    let maxSize = 5;
    const files = e.target.files;
    console.log(files);

    if (files.length > 0) {
        const uploadText = document.querySelector('.photo-upload p');
        uploadText.textContent = `${files.length} photo(s) selected`;
    }
    if (files.length > maxSize) {
        const errorDiv = document.getElementById('file-error');
        errorDiv.textContent = `Maximum files allowed is ${maxSize}`;
        errorDiv.style.display = 'block';

        // Reset upload area
        const uploadText = document.querySelector('.photo-upload p');
        const uploadArea = document.querySelector('.photo-upload input');
        uploadText.textContent = 'Click to upload photos';
        uploadArea.classList.remove('has-files');
    }
});

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Item listed successfully!');
});