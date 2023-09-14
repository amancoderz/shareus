const { useRef, useState } = React;

const App = () => {
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState(null);
  const [fileUrl, setFileUrl] = useState({ myfile: "" });

  let selectedFile;
  const handleFileChange = (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);

      setFileData(
        <>
          <form onClick={handleSubmit}>
            <div className="form">
              <h4 style={{ textAlign: "center" }}>{selectedFile.name} selected</h4>
              <br />
              <button className="btnfix btn btn-secondary">Upload Your File</button>
            </div>
          </form>
        </>
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("File not selected");
      return;
    }
    setFileData(null)
    const formData = new FormData();
    formData.append("myfile", selectedFile);

    fetch("/api/files", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        setFileUrl({ resfile: data.resfile });
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="drop_box">
            <div className="drag-area">
              <div className="icon">
                <i className="fas fa-cloud-upload-alt" />
              </div>
              <header>Upload Your File Here..</header>
              <br />
              <input
                type="file"
                accept=".doc,.docx,.pdf"
                id="fileID"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button  onClick={() => document.getElementById("fileID").click()}>
                Browse File
              </button>
            </div>
            {fileData}
          </div>
  
          <div className="urlarea">
            <div className="urlmain">{fileUrl.resfile}</div>
            <div className="urlopener"><a href={fileUrl.resfile} target="_blank"><img className="urlopimg" src="/img/linkopner.svg" alt="link" /></a></div>
            <div className="copyurl"></div>
          </div>
        
        </div>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
