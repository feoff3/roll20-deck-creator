// ==UserScript==
// @name        Roll20 Deck Creator
// @namespace   feoff3
// @description Creates a deck in one click based on preuploaded images from My Library.
// @include     https://app.roll20.net/editor/
// @version     1
// @grant       none
// ==/UserScript==


var zNode;
var deckButton;
var deckList;
var imageRegExpInput;


// Helper functions to load data from the Library

// Load JSON text from server hosted file and return JSON parsed object
function loadJSON(filePath) {
  // Load json file;
  var json = loadTextFileAjaxSync(filePath, "application/json");
  // Parse json
  return JSON.parse(json);
}   

// Load text with Ajax synchronously: takes path to file and optional MIME type
function loadTextFileAjaxSync(filePath, mimeType)
{
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET",filePath,false);
  if (mimeType != null) {
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType);
    }
  }
  xmlhttp.send();
  if (xmlhttp.status==200)
  {
    return xmlhttp.responseText;
  }
  else {
    // TODO Throw exception
    return null;
  }
}

// Functions that define behaviour of our mini-extension

function ButtonClickAction (zEvent) {
    
    var linkToAssets = "https://app.roll20.net/image_library/fetchorphanassets/true/";
    var regexp = new RegExp(imageRegExpInput.value);
    var deck_no = deckList.selectedIndex;
    
    // reads every page of the library till it finds an empty page
    for (var i = 1; ; i++) {
        var library_part = loadJSON(linkToAssets+i.toString());
        if (library_part == null || library_part.length == 0)
            break;
        // search this library parts for files that match regexp and add them to the deck
        for (var j = 0 ; j < library_part.length ; j++) {
                if (regexp.test(library_part[j]["name"])) {
                    link = library_part[j]['fullsize_url'].replace("/max" , "/med"); // we change the link from max fullsize to med as med link is used for cards internally by roll20
                    name = library_part[j]["name"].replace(".jpg" , "").replace(".png" , "");
                    Campaign.decks.backboneFirebase.collection.models[deck_no].cards.create( {name:name , avatar:link} )
                }
        }
    }
    
}

function addButton()
{
    zNode = document.createElement ('div');
    zNode.innerHTML = '<button id="myDeckButton" type="button">'
                    + 'Create Cards from Library Images</button>' 
                    + '  Deck: <select id="myDeckList"></select>'
                    + '  Image RegExp: <input type="text" name="lname" id="myImageRegExpInput" value="*">'
                    ;
    zNode.setAttribute ('id', 'myContainer');
    zNode.style.position = "absolute";
    zNode.style.zIndex = 10;
    zNode.style.left = "50px";
    document.body.appendChild (zNode);

    //--- Activate the newly added button.
    deckButton = document.getElementById ("myDeckButton");
    deckButton.addEventListener (
        "click", ButtonClickAction, false
    );

    // --- Populate list with available decks
    deckList = document.getElementById ("myDeckList"); 
    for (var i = 0 ; i < Campaign.decks.backboneFirebase.collection.models.length ; i++) {
        var option = document.createElement("option");
        option.text = i.toString() + " : " + Campaign.decks.backboneFirebase.collection.models[i].attributes.name;
        deckList.add(option); 
    }
    
    imageRegExpInput =  document.getElementById ("myImageRegExpInput");
   
    
}

// setting the button in 10 sec after start so not ot interfare with roll20 initialization
setTimeout(addButton, 10000)


    

