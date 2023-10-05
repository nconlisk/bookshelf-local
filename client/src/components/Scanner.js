import React, { useRef, useEffect, useState } from 'react'
import { BrowserBarcodeReader } from '@zxing/library'


const BarcodeScanner = ({ onScan }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const codeReader = new BrowserBarcodeReader()

    const scanBarcode = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        videoRef.current.srcObject = stream

        codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, error) => {
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

    scanBarcode()

    return () => {
      codeReader.reset()
    };
  }, [onScan]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%' }} />
    </div>
  )
}

export default BarcodeScanner
