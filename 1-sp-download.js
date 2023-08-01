const Download = require('sp-download').Download;
const spauth = require('node-sp-auth');
const url = "https://tjjwz.sharepoint.com"
const authContext = {
    // ... node-sp-auth options
    siteUrl: 'https://tjjwz.sharepoint.com',
    username: "sripaljain@tjjwz.onmicrosoft.com",
    domain: "https://tjjwz.sharepoint.com",
    password: "",
};
//get auth options
spauth.getAuth(url, authContext).then(options => {
    //perform request with any http-enabled library (request-promise in a sample below):
    let headers = options.headers;
    headers['Accept'] = 'application/json;odata=verbose';
    console.log(options)
    // request.get({
    //   url: 'https://[your tenant].sharepoint.com/sites/dev/_api/web',
    //   headers: headers
    // }).then(response => {
    //   //process data
    // });
    const download = new Download(authContext);
    // let filePathToDownload = 'https://contoso.sharepoint.com/sites/site/lib/folder/file.ext';
    // let filePathToDownload = 'https://tjjwz.sharepoint.com/sites/docverify/parents.pdf'
    // let filePathToDownload = 'https://tjjwz.sharepoint.com/sites/folder001/dummy.pdf'
    let filePathToDownload = 'https://tjjwz.sharepoint.com/sites/folder001/contracts/jain.pdf'

    let saveToPath = './DOWNLOAD';
    download.downloadFile(filePathToDownload, saveToPath).then((savedToPath) => {
        console.log(`${filePathToDownload} has been downloaded to ${savedToPath}`);
        // console.log(`${argv.url} has been downloaded to ${savedToPath}`);
    }).catch((error) => {
        console.log(error);
    });
}).catch(error => {
    console.log(error);
})



// const download = new Download(authContext);

// // let filePathToDownload = 'https://contoso.sharepoint.com/sites/site/lib/folder/file.ext';
// let filePathToDownload = 'https://tjjwz.sharepoint.com/sites/docverify/parents.pdf'
// let saveToPath = './download';

// download.downloadFile(filePathToDownload, saveToPath)
//   .then((savedToPath) => {
//     console.log(`${argv.url} has been downloaded to ${savedToPath}`);
//   })
//   .catch((error) => {
//     console.log(error);
//   });