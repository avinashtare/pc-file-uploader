const fileUplaodInput = document.getElementById("file-uplaod-input");
const uplaodFileSection = document.querySelector(".uplaod-file");
const fileStatusSection = document.querySelector(".file-status");

const toaster = new ToasterUi();

const uplaodFiles = [];

const updateFilesStatus = () => {
  fileStatusSection.innerHTML = "";
  uplaodFiles.forEach((data) => {
    const file = data.file;
    const status = data.status;

    const progress = status.isUploaded
      ? 100
      : ((status.uploadedBytes / file.size) * 100).toFixed(2);

    fileStatusSection.innerHTML += `
    
    <div class="file" id={${data.id}}>
        <span>${file.name}</span>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        <div class="progress">
          <span>${getReadableFileSizeString(
            status.uploadedBytes
          )} of ${getReadableFileSizeString(file.size)}</span>
          <span>${
            progress < 100 ? "Uploading..." + progress : "Done 100"
          }%</span>
        </div>
      </div>
    `;
  });
};

const formatFiles = (files) => {
  const formatFiles = [];
  Array.from(files).forEach((f) => {
    let file = { file: f };
    file.id = generateUUID();
    file.status = { uploadStart: false, uploadedBytes: 0, isUploaded: false };
    formatFiles.push(file);
  });
  return formatFiles;
};

const uplaodOnServer = (fileData) => {
  const status = fileData.status;
  const file = fileData.file;

  // if data in uplaoding or uplaoded
  if (status.uploadStart || status.isUploaded) return;

  // append file
  const formData = new FormData();
  formData.append("myfile", file);

  // xhr object
  const xhr = new XMLHttpRequest();

  xhr.open("POST", "/upload", true);

  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      status.uploadedBytes = event.loaded;
      updateFilesStatus();
    }
  };

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);

      if (response.sucess) {
        status.isUploaded = true;
        status.uploadedBytes = file.size;
        updateFilesStatus();
      }
    } else {
      console.error("Upload failed");
    }
  };

  xhr.onerror = () => {
    console.error("Upload error");
  };

  xhr.send(formData);

  updateFilesStatus();
};

const handleFileUplaod = (files) => {
  // push new file to allfiles with proper format
  uplaodFiles.push(...formatFiles(files));

  // clear input
  fileUplaodInput.value = "";

  uplaodFiles.forEach((data) => {
    uplaodOnServer(data);
  });
};

const handleDropFile = (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  handleFileUplaod(files);
};

const handleClickFile = (event) => {
  const inputFiles = fileUplaodInput.files;
  handleFileUplaod(inputFiles);
};

const fileClick = (event) => {
  // click to file input
  fileUplaodInput.click();
};

uplaodFileSection.addEventListener("click", fileClick);
fileUplaodInput.addEventListener("change", handleClickFile);

document.addEventListener("dragover", (e) => e.preventDefault());

document.addEventListener("drop", handleDropFile);
