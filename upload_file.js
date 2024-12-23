const fileInput = document.getElementById("file-input");
const fileList = document.getElementById("file-list");
const uploadedFilesContainer = document.getElementById("uploaded-files");

fileInput.addEventListener("change", () => {
    const files = fileInput.files;
    if (files.length === 0) {
    alert("No files selected!");
    return;
    }

    // Show the uploaded-files container
    uploadedFilesContainer.style.display = "block";

    for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileItem = document.createElement("div");
    fileItem.classList.add("file-item");

    // Add a delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = () => {
        if (confirm(`Are you sure you want to delete "${file.name}"?`)) {
        fileItem.remove();

        // Hide the uploaded-files container if no files are left
        if (fileList.children.length === 0) {
            uploadedFilesContainer.style.display = "none";
        }
        }
    };

    if (file.type.startsWith("image/")) {
        // Create a thumbnail for image files
        const reader = new FileReader();
        reader.onload = function (e) {
        fileItem.innerHTML = `
            <img src="${e.target.result}" alt="${file.name}">
            <div class="file-name" title="${file.name}">${file.name}</div>
        `;
        fileItem.appendChild(deleteBtn);
        };
        reader.readAsDataURL(file);
    } else {
        // Display a generic file icon for non-image files
        fileItem.innerHTML = `
        <div class="file-icon">📄</div>
        <div class="file-name" title="${file.name}">${file.name}</div>
        `;
        fileItem.appendChild(deleteBtn);
    }

    fileList.appendChild(fileItem);
    }

    // Clear the file input after processing
    fileInput.value = "";
});