const PPTX = require('nodejs-pptx');
let pptx = new PPTX.Composer();
let fs = require('fs')
//    soffice required
var toPdf = require("office-to-pdf")
let AddQRCodeToPPT = async function (){
    try {
        let result = await checkFileExists('./input-ppt-1.pptx')
        console.log("File exists ", result)
        await pptx.load('./input-ppt-1.pptx')
        await pptx.compose(async pres => {
            await pres.getSlide('slide1').addImage(image => {
                image
                .file(`./qrcode1.png`)
                .x(500)
                .y(100)
                .cx(166)
                .cy(160);
            });
    });
    await pptx.save("./input-ppt-1.pptx");
    } catch (error) {
        console.log(error)    
    }
}

AddQRCodeToPPT()

function checkFileExists(filepath) {
    return new Promise((resolve, reject) => {
      fs.access(filepath, fs.F_OK, error => {
        if(error){
            reject("fileNotExist")
        }
        resolve(!error);
      });
    });
  }



//    soffice required
var wordBuffer = fs.readFileSync("./input-ppt-1.pptx")

toPdf(wordBuffer).then(
  (pdfBuffer) => {
    fs.writeFileSync("./ppt.pdf", pdfBuffer)
  }, (err) => {
    console.log(err)
  }
)