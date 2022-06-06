import React, { useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import sample from '../../../assets/images/pdf/sample.pdf'
import Style from './pdfReader.module.scss';
import { ReactComponent as LeftArrow } from '../../../assets/images/leftArrow.svg'
import environment from '../../../environment';

const PdfReader = ({ handlePdfClick ,pdfFile=sample}) => {
    const [pageNum, setPageNum] = useState(1)
    const [pageLimit, setPageLimit] = useState(0)

    const handleClick = () => {
        handlePdfClick?.();
    }

    const onDocumentLoadSuccess = ({ numPages }) => {
        setPageLimit(numPages);
    }
    return (
        <div className={`${Style.container}`}>
            <div className={`d-flex align-items-center justify-content-between p-3 ${Style.header}`}>
                <div onClick={handleClick} className={`cursor-pointer`}>
                    <LeftArrow height={30} width={30} fill={"black"} />
                    <span className='ms-2'>PDF Viewer</span>
                </div>
                <span onClick={handleClick} className={`cursor-pointer`}>Done</span>
            </div>
            <div className={`${Style.pdfContainer}`}>
                <Document
                    file={pdfFile}
                    onLoadSuccess={onDocumentLoadSuccess} >
                    <Page
                        className={`${Style.ducumentPage}`}
                        renderTextLayer={false}
                        pageNumber={pageNum}
                    />
                    <div className={`d-flex align-items-center justify-content-between p-3 ${Style.header}`}>
                        <span style={{ pointerEvents: (pageNum-1) ? 'auto' : 'none', cursor: 'pointer'}} onClick={()=>setPageNum(pageNum-1)} >Pervious</span>
                        <span>{pageNum}/{pageLimit} </span>
                        <span style={{ pointerEvents: pageNum === pageLimit ? 'none' : 'auto', cursor: 'pointer'}} onClick={() => setPageNum(pageNum+1)}>Next</span>
                    </div>
                </Document>
            </div>
        </div>
    )
}

export default PdfReader