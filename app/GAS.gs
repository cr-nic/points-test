//Globals
  ss = 
    //Entire spreadsheet being referenced, ss for short
    SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/14RrjLQmB_KWrkY6FDusQBJGearN0YHyB2QfJfF7Gf9k/edit?gid=0#gid=0");
  sheet =
    //Current utilized sheet of ss; 
    //!!SWITCH TO ByID WHEN MAKING LIVE!!
    ss.getSheetByName("Sheet1")
  email = 
    //Email for entry referenced; !!INTEGRATE THIS WITH WEBSITE!!
    "niccra2@nilesk12.org";

//Sheet Resolver
    if(sheet.createTextFinder("~"+ email).matchEntireCell(true).findNext() == null){
      //Switches to "Sheet2" if email not found, then throws an error if email is not in the spreadsheet.
      sheet = ss.getSheetByName("Sheet2");
      if(sheet.createTextFinder("~"+ email).matchEntireCell(true).findNext() == null){
        throw new Error("Entry not found!");
    }}

function infoline() {
  //Definitions
    var cell1 = 
      //Up- and leftmost cell
      sheet.createTextFinder("~"+ email).matchEntireCell(true).findNext().getA1Notation();
    var cell2 = 
      //Bottom- and rightmost cell of the entry's range
      sheet.createTextFinder(email).matchEntireCell(true).findNext().getA1Notation();
    var entryRange = 
      //The range of cells in the entry in A1 notation
      sheet.getRange(cell1+":"+cell2);
    var ir = 
      //Useful variable for concat
      parseInt(sheet.getRange(cell2).getRow());
    var infoarray = 
      //Array for all info on info row
      sheet.getRange("A"+ir+":"+"N"+ir).getDisplayValues(); 

  //Debug Info
    console.log(
      "Top-left:" + cell1 + "\n" +
      "Bottom-right:" + cell2 + "\n" +
      "Entry Height:" + entryRange.getHeight()
    );
    Logger.log(infoarray);

  //Presentation Info
    Logger.log(
      "Acting Points: " + infoarray[0][4] + "\n" +
      "Crew Points: " + infoarray[0][6] + "\n" +
      "Total Points: " + infoarray[0][8]
    )
}

function entriesarray() {
  //Definitions
    var cell1 = 
      //Up- and leftmost cell
      sheet.createTextFinder("~"+ email).matchEntireCell(true).findNext().getA1Notation();
    var cell2 = 
      //Bottom- and rightmost cell of the entry's range
      sheet.createTextFinder(email).matchEntireCell(true).findNext().getA1Notation();
    var entriesRange = 
      //Range of cells containing all points entries
      "R" + parseInt(sheet.getRange(cell1).getRow()+1) + "C"+ parseInt(sheet.getRange(cell1).getColumn()+1) + ":R" + parseInt(sheet.getRange(cell2).getRow()-1) + "C" + parseInt(sheet.getRange(cell2).getColumn()-3);
    var entriesArray = 
      //Contents of entriesrange
      sheet.getRange(entriesRange).getDisplayValues();
    var h =
      // The height of the Entries Range
      sheet.getRange(entriesRange).getHeight();

  //Debug Info 
    console.log(
      "Entries Array Range: " + sheet.getRange(entriesRange).getA1Notation() + "\n" +
      "Entries Array Height: " + h
    );
    Logger.log(entriesArray);

  //Presentation Info
    for (let i = 0; i<h; i++) {
      // Array Definitions
        var aShow = entriesArray[i][0]
        var aDate = entriesArray[i][1]
        var aaRole = entriesArray[i][2]
        var aaPoints = entriesArray[i][3]
        var acRole = entriesArray[i][4]
        var acPoints = entriesArray[i][5]

        if(aaRole==" " && acRole=="") {
          console.log(
          "Show: " + aShow + "\n" +
          "Date: " + aDate + "\n"
          )
        } else if (acRole=="") {
          console.log(
            "Show: " + aShow + "\n" +
            "Date: " + aDate + "\n" +
            "Acting Position: " + aaRole + "\n" +
            "Acting Points: " + aaPoints
          )
        } else if (aaRole=="") {
          console.log(
            "Show: " + aShow + "\n" +
            "Date: " + aDate + "\n" +
            "Crew Position: " + acRole + "\n" +
            "Crew Points: " + acPoints
          )
        } else {
          console.log(
            "Show: " + aShow + "\n" +
            "Date: " + aDate + "\n" +
            "Acting Position: " + aaRole + "\n" +
            "Acting Points: " + aaPoints + "\n" +
            "Crew Position: " + acRole + "\n" +
            "Crew Points: " + acPoints
          )
        }
      
    }
}
