import { useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [firstPdf, setFirstPdf] = useState(null); // For GST comparison
  const [secondPdf, setSecondPdf] = useState(null); // For GST comparison
  const [meg, setmeg] = useState("");
  const [pdf1, setpdf1] = useState("");
  const [pdf2, setpdf2] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const g = e.target.files[0];
    if (g) {
      setPdfFile(URL.createObjectURL(e.target.files[0]));
      // setFile(e.target.files[0]);
    }
    if (selectedValue == "") {
      return setmeg("**Please select the document");
    }
  };

  const handleFirstPdfChange = (e) => {
    setFirstPdf(e.target.files[0]);
    setpdf1(URL.createObjectURL(e.target.files[0]));
  };

  const handleSecondPdfChange = (e) => {
    setSecondPdf(e.target.files[0]);
    setpdf2(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedValue === "compare-gst") {
      // Implement GST comparison logic here
      // Extract GST numbers from firstPdf and secondPdf
      // Compare the GST numbers and display the result
      // You can use a PDF parsing library for this purpose
      // Example: compareGSTNumbers(firstPdf, secondPdf);
      // setText("GST numbers are same/different");
    } else {
      // Send the file and other data to the backend
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/process-document",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setText(response.data.text);
      } catch (error) {
        console.error("Error processing document:", error);
      }
    }
  };

  return (
    <>
      <Home />
      {/* <div className="App">
        <div className="container">
          <h1>Please select the pdf file</h1>
          <form onSubmit={handleSubmit}>
            <div className="col">
              <select
                id="select-document"
                value={selectedValue}
                onChange={handleChange}
              >
                <option value="">Select Document</option>
                <option value="LeasingDoc">Leasing Document</option>
                <option value="invoice">Invoice</option>
                <option value="bank-invoice">Invoice</option>
                <option value="receipt">Receipt</option>
                <option value="loan-details">Loan Details</option> 
                <option value="compare-gst">Compare Invoice and PO</option>
              </select>
              {selectedValue ? "" : <span className="erroe-meg">{meg}</span>}
              {selectedValue === "compare-gst" ? (
                <>
                  <div className="left-side">
                    <label id="lable">Invoive</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFirstPdfChange}
                    />
                  </div>
                  <div className="left-side">
                    <label id="lable">PO</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleSecondPdfChange}
                    />{" "}
                  </div>
                </>
              ) : (
                <input type="file" accept=".pdf" onChange={handleFileChange} />
              )}
              <button type="submit" id="btn-extract">
                {selectedValue === "compare-gst"
                  ? "Compare GST Numbers"
                  : "Extract Document"}
              </button>
            </div>
          </form>
        </div>
        <div className="cont1">
          {selectedValue !== "compare-gst" ? (
            <div className="below-area">
              <div className="container-area">
                {pdfFile && (
                  <div>
                    <embed
                      src={pdfFile}
                      type="application/pdf"
                      style={{ width: "40vw", height: "90vh" }}
                    />
                  </div>
                )}
              </div>{" "}
            </div>
          ) : (
            <>
              <div className="below-col">
                <div>
                  {" "}
                  {pdf1 && (
                    <div>
                      <h3>Invoice</h3>
                      <embed
                        src={pdf1}
                        type="application/pdf"
                        style={{ width: "40vw", height: "45vh" }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  {" "}
                  {pdf2 && (
                    <div>
                      <h3>Purchase Order</h3>
                      <embed
                        src={pdf2}
                        type="application/pdf"
                        style={{ width: "40vw", height: "45vh" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {
            selectedValue !== "compare-gst" ? (
              <div>
                {text !== "" ? (
                  <>
                    <h2>Extracted Text:</h2>
                    <p className="ext-area">{text}</p>
                  </>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            ) //put the GST comparison out here
          }
        </div>
      </div> */}
    </>
  );
}

export default App;
