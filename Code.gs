/*
Return contents of a sheet in CSV format.

Send the get request to $url?sheet=SHEET_NAME. Find the $url in the "Run > Publish as web app"
menu.

*/
function doGet(e) {
  var sheetName = e.parameter['sheet'];

  var ss = SpreadsheetApp.openById('13_BUd7WJlA8Z9B5Vc-5tyf3vyRUYmIx67sDz7ZmyPG4');
  var sheet = ss.getSheetByName(sheetName);
  var data = sheet.getDataRange().getValues();


  // Loop through the data in the range and build a string with the CSV data
  // taken from https://developers.google.com/apps-script/articles/docslist_tutorial#section2
  var csvFile = undefined
  if (data.length > 1) {
    var csv = "";
    for (var row = 0; row < data.length; row++) {
      for (var col = 0; col < data[row].length; col++) {
         if (data[row][col].toString().indexOf(",") != -1) {
           data[row][col] = "\"" + data[row][col] + "\"";
         }
      }

      // Join each row's columns
      // Add a carriage return to end of each row, except for the last one
      if (row < data.length-1) {
        csv += data[row].join(",") + "\r\n";
      }
      else {
        csv += data[row];
      }
    }
    csvFile = csv;
  }

  return ContentService.createTextOutput(csvFile);
}

/*
Accept a POST in CSV format; append that line to the worksheet specified in URL.

Send the post request to $url?sheet=SHEET_NAME. The body of the post request will
be parsed and appended to SHEET_NAME. Find the $url in the "Run > Publish as web app"
menu.

*/
function doPost(e) {
  var contents = e.postData.contents;
  var sheetName = e.parameter['sheet'];

  // Append to spreadsheet
  appendLines(sheetName, contents);

  var params = JSON.stringify(e);
  return ContentService.createTextOutput(params);

}


/* Parse a csv-encoded string and append each line to a the named worksheet

  - worksheet (string): Name of the worksheet
  - csvLine (string): A piece of CSV data, for example "12, abc, 12.3%".

*/
function appendLines(worksheet, csvData) {
  var ss = SpreadsheetApp.openById("13_BUd7WJlA8Z9B5Vc-5tyf3vyRUYmIx67sDz7ZmyPG4");
  var sheet = ss.getSheetByName(worksheet);

  var rows = Utilities.parseCsv(csvData);

  for ( var i = 0; i < rows.length; i++ ) {
    sheet.appendRow(rows[i]);
  }
}

function test() {
  Logger.log("Appending fake data");
  appendLines("Raw", "12345, Monday, kitchen, temperature, 30\n12346, Tuesday, living room, humidity, 50");
}
