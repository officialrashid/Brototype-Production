import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

const PDFViewer = ({ url }) => {
    console.log(url,"urlll");
    
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className="pdf-container">
            
            <Document
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
            >

                
                {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
            </Document>
        </div>
    );
};

export default PDFViewer;
