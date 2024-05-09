// Get DOM Elements

const fileInput = document.getElementById("fileInput")
const uploadButton = document.getElementById("uploadButton")
const sharableLink = document.getElementById("sharableLink")


// update file input label

fileInput.addEventListener("change", ()=>{
  const selectedFiles = fileInput.files;
  if(selectedFiles.length>0){
    const filenames = Array.from(selectedFiles).map((file)=>file.name).join(",");
    const label = document.querySelector(".custom-file-lab")
    label.innerHTML = filenames;
  }
})


// Event listener for upload button

uploadButton.addEventListener("click", async()=>{
  const file = fileInput.files[0];
    if(file){
     
    try{

      const formData = new FormData();
      formData.append("file", file)


      uploadButton.disabled= true;
      uploadButton.textContent= "Sharing...";

      const response = await fetch("https://file.io/?expires=1d",{
        method:"POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if(response.ok){
        const link = `<p>Download File <a href="${data.link}" target="_blank">${data.link} </a> <p/>`;
        sharableLink.innerHTML = link;
      }else{
        sharableLink.innerHTML = "File sharing failed. Please try again."
      }


    }catch(error){
      sharableLink.textContent = "An error occured. Please try again later."
      console.log("Error sharing file:",error);

    }finally{

      // Reset loading state
      uploadButton.disabled = false
      uploadButton.textContent = "share";

    }
  }else{
    sharableLink.textContent= "Please upload a file to share."

  }
  
})