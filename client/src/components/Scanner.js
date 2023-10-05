import React, { useRef, useEffect, useState } from 'react'
import { BrowserBarcodeReader } from '@zxing/library'


const BarcodeScanner = ({ onScan, isScannerVisible }) => {
  const videoRef = useRef(null)
  const codeReaderRef = useRef(null)

  useEffect(() => {
    codeReaderRef.current = new BrowserBarcodeReader()

    const scanBarcode = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        videoRef.current.srcObject = stream

        codeReaderRef.current.decodeFromVideoDevice(undefined, videoRef.current, (result, error) => {
          if (result) {
            const scannedData = result.text
            onScan(scannedData)
          } else if (error) {
            console.error('Error decoding barcode:', error)
          }
        });
      } catch (error) {
        console.error('Error accessing camera:', error)
      }
    };

    if(isScannerVisible){
        scanBarcode()
    }else{
        codeReaderRef.current.reset()
    }

    return () => {
      codeReaderRef.current.reset()
    }
  }, [onScan, isScannerVisible])

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%' }} />
    </div>
  )
}

export default BarcodeScanner
