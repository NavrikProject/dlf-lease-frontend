import { useState } from "react";
import axios from "axios";
import "./FileSelect.css";

const FileSelect = () => {
  const [extractionResult, setExtractionResult] = useState(false);
  const [extractedData, setExtractedData] = useState();
  const [formData, setFormData] = useState({
    selectOption: "",
    pdfFile1: null,
    pdfFile2: null,
    pdf1Url: "",
    pdf2Url: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "selectOption") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        pdfFile1: null,
        pdfFile2: null,
        pdf1Url: "",
        pdf2Url: "",
      }));
    } else if (name === "pdfFile1") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        pdfFile1: files[0],
        pdf1Url: URL.createObjectURL(files[0]),
      }));
    } else if (name === "pdfFile2") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        pdfFile2: files[0],
        pdf2Url: URL.createObjectURL(files[0]),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { selectOption, pdfFile1, pdfFile2 } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append("selectOption", selectOption);
    formDataToSend.append("pdfFile1", pdfFile1);
    formDataToSend.append("pdfFile2", pdfFile2);
    setExtractionResult(true);
    // Uncomment and update with your backend endpoint to handle the form submission
    try {
      const response = await axios.post(
        "https://dlfleasebackend.azurewebsites.net/upload",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        setExtractedData(response.data);
      } else {
        console.log("There is an error uploading");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      {extractionResult ? (
        <div className="container3">
          <h1>
            Refresh to Extract more documents or{" "}
            <span onClick={() => window.location.reload()}>Click here!</span>
          </h1>
        </div>
      ) : (
        <div className="container">
          <form onSubmit={handleSubmit}>
            <label className="label" htmlFor="selectOption">
              Select an option:
            </label>
            <select
              className="select"
              id="selectOption"
              name="selectOption"
              value={formData.selectOption}
              onChange={handleChange}
            >
              <option value="">--Please choose an option--</option>
              <option value="LeasingDoc">Leasing Document</option>
              <option value="compare-gst">Compare Invoice and PO</option>
            </select>
            {formData.selectOption === "compare-gst" ? (
              <>
                <label className="label" htmlFor="pdfFile1">
                  Upload Invoice PDF:
                </label>
                <input
                  className="input"
                  id="pdfFile1"
                  name="pdfFile1"
                  type="file"
                  accept="application/pdf"
                  onChange={handleChange}
                  disabled={formData.selectOption === ""}
                />
                <label className="label" htmlFor="pdfFile2">
                  Upload PO PDF:
                </label>
                <input
                  className="input"
                  id="pdfFile2"
                  name="pdfFile2"
                  type="file"
                  accept="application/pdf"
                  onChange={handleChange}
                  disabled={formData.selectOption === ""}
                />
              </>
            ) : (
              <>
                <label className="label" htmlFor="pdfFile1">
                  Upload PDF:
                </label>
                <input
                  className="input"
                  id="pdfFile1"
                  name="pdfFile1"
                  type="file"
                  accept="application/pdf"
                  onChange={handleChange}
                  disabled={formData.selectOption === ""}
                />
              </>
            )}
            <button className="button" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}

      <div className="">
        <div className="split-screen">
          <div className="left-half">
            <div className="content">
              <h1>Uploaded Input Files shown here!</h1>
              <hr />
              {formData.pdf1Url && (
                <div className="pdfbox">
                  <h3>
                    {formData.selectOption === "compare-gst"
                      ? "Invoice "
                      : "PDF"}
                  </h3>
                  <embed
                    src={formData.pdf1Url}
                    type="application/pdf"
                    style={{ width: "100%", height: "400px" }}
                  />
                </div>
              )}
              {formData.selectOption === "compare-gst" && formData.pdf2Url && (
                <div className="pdfbox">
                  <h3>Purchase Order</h3>
                  <embed
                    src={formData.pdf2Url}
                    type="application/pdf"
                    style={{ width: "100%", height: "400px" }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="right-half">
            <div className="content">
              <div className="extractionContainer">
                <h1>Extraction Result will be shown in here!</h1>
                <hr />
                {formData.selectOption === "compare-gst" &&
                  formData.pdf2Url && (
                    <div className="container2">
                      {extractionResult && (
                        <button className="button2" type="submit">
                          COMPARE PDF'S
                        </button>
                      )}
                    </div>
                  )}
                <ul>
                  {extractedData?.map((extractedData, index) => (
                    <li key={index}>
                      <h3>
                        Extracted Invoice Number: {extractedData.mention_text}
                      </h3>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="pdfContainer">
         
        </div>
         */}
      </div>
    </>
  );
};

export default FileSelect;
