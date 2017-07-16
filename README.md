

# Roll20 Deck Creator

Roll20 Deck Creator is a small JavaScript browser extension that automates creation of card decks in Roll20 app (as of July 2017).

Roll20 Deck Creator automatically fills an existing deck with new cards. Images of these new cards are imported from My Library. Deck cards are created automatically with no need to create and upload every single card.

It works on Firefox or Chrome browser.

## Why?

There is no automated way to batch upload, or create cards for decks in Roll20. Every card has to be created and uploaded manually. That is okay for decks of 10-20 cards but a total overkill for 100+ cards. 
I found a way how to automate the process for myself, and then realized that it may be of use to anyone else stuck with Roll20 uploading cards.


## How it works

Roll20 Deck Creator is a small extension to your browser. The extension loads a little additional script when Roll20 page is loaded adding a new button to the page.

Whenever the button is clicked, the script communicates with Roll20 application (via internal undocumented API that is, unfortunately, subject to changes by the Roll20 dev team) to load image data from the Library and create new cards based on the data.

A user may choose a card deck to which new cards will be added and a filter (regular) expression to sort out which images should be picked from the Library.

## Guide: How to install

### Firefox

1. Install GreaseMonkey add-on [https://addons.mozilla.org/ru/firefox/addon/greasemonkey/](https://addons.mozilla.org/ru/firefox/addon/greasemonkey/)

2. The addon button should appear on the top right corner of the browser window.

 ![](https://github.com/feoff3/roll20-deck-creator/blob/master/image001.png?raw=true)
 
3. Enable the add-on by clicking the arrow button and clicking Enabled. The monkey face icon will shine.

 ![](https://github.com/feoff3/roll20-deck-creator/blob/master/image003.png?raw=true)

4. Click &quot;New User Script…&quot;

 ![](https://github.com/feoff3/roll20-deck-creator/blob/master/image005.png?raw=true)

5. The &quot;New User Script…&quot; window will appear. Enter &quot;Roll20 Deck Creator&quot; in Name field, &quot;roll20&quot; in Namespace field, and replace any data in &quot;Includes (One per line)&quot; field with [https://app.roll20.net/editor/](https://app.roll20.net/editor/) (see the screenshot below). Click OK.

![](https://github.com/feoff3/roll20-deck-creator/blob/master/image007.png?raw=true)

6. The add-on will open the editor window with a sample script pre-loaded. Replace it with a Deck Creator script from [https://github.com/feoff3/roll20-deck-creator/blob/master/deck-creator.js](https://github.com/feoff3/roll20-deck-creator/blob/master/deck-creator.js)

7. Click Save.

![](https://github.com/feoff3/roll20-deck-creator/blob/master/image009.png?raw=true)

### Chrome

1. Install TemperMonkey extension [https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

2. The extension button should appear on the top right corner of the browser window.

![](https://github.com/feoff3/roll20-deck-creator/blob/master/image011.png?raw=true)

3. Click on the button, ensure the extension is Enabled. Click &quot;Create a new script&quot; to paste Deck Creator script to TemperMonkey.

![](https://github.com/feoff3/roll20-deck-creator/blob/master/image013.png?raw=true)

4. The extension will open the editor with a sample script pre-loaded. Replace it with a Deck Creator script from [https://github.com/feoff3/roll20-deck-creator/blob/master/deck-creator.js](https://github.com/feoff3/roll20-deck-creator/blob/master/deck-creator.js)

5. Click &quot;Save&quot; button. The script will appear in running script list.

![](https://github.com/feoff3/roll20-deck-creator/blob/master/image015.png?raw=true)

## Guide: How to use

1. After installation step is done, login to Roll20. Join your game as GM.

2. Ensure &quot;Create Cards from Library Images&quot; button with a two extra optional inputs appear on the top left of Roll20 app screen. (it often appears with a small delay of 10 secs)

![](https://github.com/feoff3/roll20-deck-creator/blob/master/image017.png?raw=true)

3. Create an empty deck you will be importing your images. (If you have an existing deck to add some cards to - no problem, skip this step). You may set up card backing image and other options on this step or do it later.

4. Upload your images by clicking Art Library&gt;My Library&gt;Upload (see [https://wiki.roll20.net/Art\_Library](https://wiki.roll20.net/Art_Library)) . Then drag and drop your images to the upload field. (see [https://wiki.roll20.net/Art\_Library#Uploading\_Art](https://wiki.roll20.net/Art_Library#Uploading_Art)). NB. In my experience batch upload limit is far above 10 images (around 70-80 images) at once.

5. Refresh (press F5 or Ctrl+R) or relogin to your game so the script will reinit and detect your newly created deck and images. Ensure your newly created deck appears in the deck list.

![](https://github.com/feoff3/roll20-deck-creator/blob/master/image019.png?raw=true)

6. Then enter Regexp filter for cards to load into deck. If no filter entered, the script will load ALL images from your library to your deck. If you are unfamiliar with Regexp filters, just use the simplest filter possible, enter **prefix.\***

It will filter all images that file names start with &quot;prefix&quot; (or any other word you enter). In the image below, it will match all images starting with **back**.

![](https://github.com/feoff3/roll20-deck-creator/blob/master/image021.png?raw=true)

7. Click &quot;Create Cards from Library Images&quot; button. The browser will hang up for a dozen of seconds.

8. Voila! Check your newly created deck for the new cards.


