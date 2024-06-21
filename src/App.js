//Sadegh Javadian and Amirhossein Shahraki
import "./App.css";
import React, { useState } from "react";
import Dimg from './Icon/Dimg.svg';
import Uimg from './Icon/Uimg.svg';

function App() {
  //copy button function
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(uploadResponse).then(() => {
      alert("CID copied to your clipboard!");
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [inputText, setInputText] = useState('');
  const [modifiedText, setModifiedText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResponse, setUploadResponse] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  }; //get hash

  const handleSubmit = (event) => {
    event.preventDefault();
    const newText = `https://ipfs.io/ipfs/${inputText}`;
    setModifiedText(newText);
  }; //Converts the hash to a download link

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }; //get file

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("pinataMetadata", JSON.stringify({ name: selectedFile.name }));
    formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));
  
    const options = {
      method: 'POST',
      headers: {
        pinata_api_key: '60759845427e256f5550', // کلید API Pinata خود را اینجا قرار دهید
        pinata_secret_api_key: '0d3f4592a3e0f583734be6099eaf3dfde7dacd8fb3f685f0d89ad2901c8e5117', // کلید مخفی API Pinata خود را اینجا قرار دهید
      },
      body: formData,
    }; //upload file in IPFS
  
    setIsUploading(true);
    setUploadProgress(0);
  
    try {
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        ...options,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });
      const result = await response.json();
      setUploadResponse(result.IpfsHash ? `${result.IpfsHash}` : 'Upload failed');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadResponse('Error uploading file');
    }
  
    setIsUploading(false);
  }; //upload failed
  

  return (

    <div className="container">
      <header>
        <h1>IPFS Uploader & Downloader</h1>
        <p className="des">
          In this project, we aim to develop a file uploader & downloader application using React, deployed on Fleek hosting, relying on the Pinata API.
          The application will allow users to select a file, upload it to the IPFS (InterPlanetary File System) network, and download a file using its hash.
          <br />
          <br />
          This project combines modern front-end development practices with decentralized storage solutions, ensuring users can confidently download uploaded files through a streamlined and intuitive interface.
        </p>
        <p>
          Developed by <span><a href="https://www.linkedin.com/in/sadegh-javadian/">Sadegh Javadian</a></span> and <span><a href="https://www.linkedin.com/in/amirhossein-shahraki-04485a267">Amirhossein Shahraki</a></span> under the supervision of <span><a href="https://www.linkedin.com/in/toktam-ghafarian-3010a150/">Dr.Toktam Ghaffarian</a></span>
        </p>
      </header>

      <br />

      <main className="main-container">

        <div className="d-box">
          <h1 className="d-heading">Download File</h1>
          <p>Insert your CID, click submit then click on Download Button</p>
          <form className="d-form" onSubmit={handleSubmit}>
            <div className="cid-container">
              <label className="cid-lbl">CID</label>
              <input
                className="cid-inp"
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Your File Hash ID"
              />
              <input className="submit-button" type="submit" value="Submit" />
            </div>
            <a href={modifiedText} className="d-button">
              <img className="Dimg" src={Dimg} alt="Download" />
              <h2>Download</h2>
            </a>
          </form>    
        </div>

        <div className="u-box">
          <h1 className="u-heading">Upload File</h1>
          <p>Choose the file then click on Upload Button</p>
          <form className="u-form" onSubmit={handleUpload}>
            <input type="file" id="file" onChange={handleFileChange} />
            <label htmlFor="file" className="upload">
              <p>Choose File</p>
            </label>
            <input type="submit"  value="Upload" id="Upload" />
            <label htmlFor="Upload" className="upload-container">
              <img id="U-fileicon" src={Uimg} alt="rf" />
              <p>Upload</p>
            </label>
          </form>
          {isUploading && (
             <div>
                <p>Uploading . . .</p>
             </div>
            )}
          {uploadResponse && (
            <div className="total" >
              <div className="response">
                <h2 className="h2-response">CID:</h2>
                <p className="p-response"><a className="a-upload" href={uploadResponse}>{uploadResponse}</a></p>
              </div>            
            <button className="copy-button" onClick={handleCopyToClipboard}>Copy CID</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
