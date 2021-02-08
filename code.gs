//This script will allow you to make a whole lot of 
//copies of a document in your Google Drive. 
//If the original is in a folder, then the copies will be made
//in the same folder

//Be careful of what you change. Each semicolon is very important. 

// INSTRUCTIONS!!!

//Open the document in Google Drive that you want to copy. 
//Look at the URL; there is a string of weird letters and numbers; that is the document ID.
//Copy the document ID and REPLACE it in the line of code below. 
//Notice there are single quotations around the document ID, that is important! 

function copyDocs() {
  for(i=0; i<30; i++){ //Change the number 30 to however many copies you want. 
    var count = i + 1 //Used to separate the copies by name

  var file = 'REPLACE_THIS_TEXT_WITH_YOUR_DOCUMENTID' //Keep the surrounding quotations

  var fileName = DriveApp.getFileById(file);
  Logger.log(fileName) //Logging the file name of the original

  var documentId = DriveApp.getFileById(file).makeCopy().getId();
  Logger.log(documentId) //Logging the file id of the copy

  var newName = DriveApp.getFileById(documentId).setName(fileName + '-' + count); //Setting numbered name of copy
  Logger.log(newName) //Logging the file name of the copy

    var commentList = Drive.Comments.list(file); //Get list of comments from original
    commentList.items.forEach(function(item) {
    var replies = item.replies;
    delete item.replies;
    var commentId = Drive.Comments.insert(item, documentId).commentId; //Insert comments into copy
    replies.forEach(function(reply) {
      Drive.Replies.insert(reply, documentId, commentId).replyId;
      });
    });
  }
}

//When you have changed the number of copies and the document ID in the script, 
//you will click on the save icon and then go to the Run menu and choose copyDocs. 
//Authorize the script and copies will be made to your drive.

//This script is only slightly altered from Alice Keeler's CopyDocs to include comments
//from the original document. If you don't want comments copied, use Alice's original.
// https://alicekeeler.com/2015/07/11/making-a-lot-of-copies-of-the-same-google-docs
