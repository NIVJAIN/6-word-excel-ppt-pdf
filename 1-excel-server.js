const qr = require('qrcode');
const fs = require('fs');
const Excel = require('exceljs');


async function generateQRCode(data, filename) {
  try {
    const qrOptions = {
      type: 'png', // You can change the image format if needed (png, jpeg, svg, etc.)
      margin: 2,
      errorCorrectionLevel: 'H', // High error correction level for better readability
    };
    const qrCode = await qr.toFile(filename, data, qrOptions);
    console.log('QR code generated and saved as', filename);
    return qrCode;
  } catch (err) {
    console.error('Error generating QR code:', err);
  }
}

function getCellByName(worksheet, name) {
    var match;
    worksheet.eachRow(function (row) {
        console.log(row.value);
        row.eachCell(function (cell) {
            for (var i = 0; i < cell.names.length; i++) {
                console.log(cell.value);
                if (cell.names[i] === name) {
                    match = cell;
                    break;
                }
            }
        });
    });
    return match;
}
// const getCellByName = (worksheet, name) => {
//     let match
//     worksheet.eachRow(row => row.eachCell(cell => {
//         if (cell.names.find(n => n === name)) {
//             match = cell
//         }
//     }))
//     return match
// }

async function insertQRCodeToExcel(existingFile, qrCodeFile, dataToEncode) {
  try {
    // Read the existing Excel file
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(existingFile);

    // Get the first worksheet
    const worksheet = workbook.worksheets[0];

    // Generate and save the QR code image
    // await generateQRCode(dataToEncode, qrCodeFile);

    // Add the QR code image to the worksheet
    const imageId = workbook.addImage({
      filename: qrCodeFile,
      extension: 'png',
    });

    // Set the position where you want to insert the QR code
    const qrCodeCell = worksheet.getCell('A1'); // Change 'A1' to the desired cell reference
    console.log(qrCodeCell.value, worksheet.name)

    let cellName = await getCellByName(worksheet, 'A1')
    console.log(cellName)


    // Set the QR code image size and hyperlink to the data (optional)
    worksheet.addImage(imageId, {
      tl: { col: qrCodeCell.col, row: qrCodeCell.row },
      ext: { width: 100, height: 100 }, // Adjust the size of the image as needed
      hyperlink: dataToEncode, // You can set a hyperlink to the QR code
    });

    // Save the updated Excel file
    await workbook.xlsx.writeFile(existingFile);
    console.log('QR code inserted into Excel successfully.');
  } catch (err) {
    console.error('Error inserting QR code into Excel:', err);
  }
}

const existingExcelFile = './input-excel-1.xlsx';
// const qrCodeFile = './qrcode1.png';
const qrCodeFile = './qr.png';
const dataToEncode = 'https://www.example.com'; // Change this to the data you want to encode in the QR code

insertQRCodeToExcel(existingExcelFile, qrCodeFile, dataToEncode);
