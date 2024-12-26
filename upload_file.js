const fileInput = document.getElementById("file-input");
const fileList = document.getElementById("file-list");
const uploadedFilesContainer = document.getElementById("uploaded-files");
const dropOverlay = document.getElementById("drop-overlay");

const handleFiles = (files) => {
    // Show the uploaded-files container
    if (files[0].name.endsWith(".stl") || files[0].name.endsWith(".obj") || files[0].name.endsWith(".ply")) {
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
    } else {
        alert("Sorry, but only STL, OBJ, and PLY files are supported");
    }
};

// Show overlay when dragging files over the window
window.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropOverlay.style.display = "flex";
});

// Hide overlay when leaving drag area
window.addEventListener("dragleave", (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest("body")) {
    dropOverlay.style.display = "none";
    }
});

// Handle file drop
window.addEventListener("drop", (e) => {
    e.preventDefault();
    dropOverlay.style.display = "none"; // Hide overlay
    console.log("Files dropped", e.dataTransfer.files);
    if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
    } else {
        alert("Sorry, but you can only upload files");
    }
});

// File input handler
fileInput.addEventListener("change", () => {
    handleFiles(fileInput.files);
    fileInput.value = ""; // Clear the input
});
