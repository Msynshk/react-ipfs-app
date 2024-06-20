import "./App.css";
// import uploadicon from './Icon/uploadicon.png';
import Dimg from './Icon/Dimg.svg';
import React, { useState } from "react";

function App() {
  // تعریف حالت‌ها
  const [inputText, setInputText] = useState('');
  const [modifiedText, setModifiedText] = useState('');
  // مدیریت تغییرات ورودی
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  // مدیریت ارسال فرم
  const handleSubmit = (event) => {
    event.preventDefault();
    const newText = `https://ipfs.io/ipfs/${inputText}`;
    setModifiedText(newText);
  };


// function App() {
  return (
    <div className="container">


      <header>
        <h1>
          IPFS Uploader/Downloader On IPFS Host
        </h1>
        <p className="des">
        In this project, we aim to develop a file uploader & downloader application using React, deployed on Fleek hosting, relying on the Pinata API. 
        The application will allow users to select a file, upload it to the IPFS (InterPlanetary File System) network, and download a file using its hash.
        <br/>
        <br/>
        This project combines modern front-end development practices with decentralized storage solutions, ensuring users can confidently download uploaded files through a streamlined and intuitive interface.
        
        </p>
        <p> Developed by <span><a href="https://www.linkedin.com/in/sadegh-javadian/">Sadegh Javadian</a></span> and <span><a href="https://www.linkedin.com/in/amirhossein-shahraki-04485a267">Amir Hossein Shahreki</a></span> under the supervision of <span><a href="linkedin.com/in/toktam-ghafarian-3010a150">Dr.Toktam Ghaffarian</a></span></p>
      </header>

<br/>
      <main className="main-container">
        <div className="d-box">
          <h1 className="d-heading">Download File</h1>
          <p>insert your CID and click on Download Button</p>
          <form className="d-form" onSubmit={handleSubmit}>
            <div className="cid-container">
                <label className="cid-lbl">CID</label>
                <input className="cid-inp" type="text" value={inputText} onChange={handleInputChange} placeholder="Your File Hash ID" />
                <input className="submit-button" type="submit" value="Submit"/>
            </div>
            <a href={modifiedText} className="d-button">
              <img  className="Dimg" src={Dimg}/>
              <h2>Download</h2>
            </a>
           
          </form>
        </div>
        
        <div className="u-box">
          <h1 className="u-heading">Upload File</h1>
          <p>Choose the file then click on Upload Button</p>
          <form > 
          <input type="file"  id="file"/> 
                        <label htmlFor="file" className="upload">
                            {/* <img id="fileicon" src={uploadicon} alt="rf"/> */}
                            <p>Choose File</p>
                        </label> 
           <input type="submit" value="Upload"/>
            
          </form>
        </div>
      </main>
    </div>
  );
}


export default App;
