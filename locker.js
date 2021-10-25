/* ***CLasses*** */
class database
{	constructor()
	{
	this.name;
	this.username;
	this.version=3; //Added in version 1
	this.modules={};
	this.conf= new conf(); //Added in version 1
	}
}

// Modules - passwordManager, journal, notes

class passwordManager
{	constructor()
	{this.passwords=[];
	}
}


class password
{
	
	constructor(website, username, password)
	{	this.id =getUniqueID();
		this.date = new Date().getTime();
		this.website = website;
		this.username = username;
		this.password = encrypt_string(appPass,password);
	}

}

class journalManager
{	constructor()
	{
	this.journals = [];
	}
}

class journal
{
	constructor(date, title, entry_html)
	{
		this.id = getUniqueID();
		this.date = date;
		this.title = title;
		this.journal_html = encrypt_string(appPass,entry_html);
	}
}

class notesManager
{	constructor()
	{
	this.notes = [];
	this.tags = []; //Added in version 2
	this.colors = []; //Added in version 3
	}
}

class note
{
	constructor(title, note_html)
	{
		this.id = getUniqueID();
		this.title = title;
		this.date = new Date().getTime();
		this.modified = this.date;
		this.note_html = encrypt_string(appPass,note_html);
	}
	
}

class tag
{
	constructor()
	{
		this.id;
		this.tags = [];
	}
}

class color
{
	constructor(id, color)
	{
		this.id = id;
		this.color = color;
	}

	/* Only prespecified colors will be allowed */
}

class conf
{
	constructor()
	{
		this.passwordManager={sort: 3},
		this.notesManager={sort: 3,
	  tagsPosition: 0, /*Added in version 2
		0 for bottom and 1 for top
	  */
	  multitagFilter:false, //Added in version 2
	  multitagFilterBehaviour: 1 //Added in version 2; 0 is for OR and 1 is for AND
		},
		this.journalManager={sort: 3}
		/* Sorting codes
		By name (A-Z): 1
		By name (Z-A): 2
		By date created (new-old): 3
		By date created (old-new): 4
		By date modified (new-old):5
		By date modified (old-new):6 
		*/
	}
}

/* Database functions */

function database_getPassword(id)
{	let passwords = Database.modules.passwordManager.passwords;
	if(appPass)
	{
		for (var i = passwords.length - 1; i >= 0; i--) {
			if(passwords[i].id == id)
			{
				return decrypt_string(appPass,passwords[i].password);
			}
		}
	}

	return false;
}

function database_getPasswordObject(id)
{	
	let passwords = Database.modules.passwordManager.passwords;

	for (var i = passwords.length - 1; i >= 0; i--) {
			if(passwords[i].id == id)
			{
				return passwords[i];
			}
		}

	return false;

}


function database_addPassword(website, username, pass)
{
	let pObject = new password(website, username, pass);
	Database.modules.passwordManager.passwords.push(pObject);
	return pObject.id;
}

function database_updatePassword(id, website, username, pass)
{
	let passwords = Database.modules.passwordManager.passwords;

	for (var i = passwords.length - 1; i >= 0; i--) {
			if(passwords[i].id == id)
			{	 let pObject = new password(website, username, pass);
				 pObject.id=id;
				 passwords[i] = pObject;
				 return true;
			}
		}

	return false;
}

function database_deletePassword(id)
{
	let passwords = Database.modules.passwordManager.passwords;

	for (var i = passwords.length - 1; i >= 0; i--) {
			if(passwords[i].id == id)
			{	 passwords.splice(i,1);
				 return true;
			}
		}

	return false;
}

function database_getNotesObject(id)
{	
	let notes = Database.modules.notesManager.notes;

	for (var i = notes.length - 1; i >= 0; i--) {
			if(notes[i].id == id)
			{
				return notes[i];
			}
		}

	return false;

}

function database_addNote(title, note_html)
{
	let n = new note(title, note_html);
	Database.modules.notesManager.notes.push(n);
	return n.id;
}


function database_updateNote(id, title, note_html)
{	
	let notes = Database.modules.notesManager.notes;

	for (var i =notes.length - 1; i >= 0; i--) {
			if(notes[i].id == id)
			{	 
				let nObject = new note(title, note_html);
				notes[i].title = nObject.title;
				notes[i].note_html = nObject.note_html;
				notes[i].modified = new Date().getTime();
				return true;
			}
		}

	return false;
}

function database_deleteNote(id)
{
	let notes = Database.modules.notesManager.notes;

	for (var i =notes.length - 1; i >= 0; i--) {
			if(notes[i].id == id)
			{	 notes.splice(i,1);
				 return true;
			}
		}

	return false;
}


function database_getJournalObject(id)
{	
	let journals = Database.modules.journalManager.journals;

	for (var i = journals.length - 1; i >= 0; i--) {
			if(journals[i].id == id)
			{
				return journals[i];
			}
		}

	return false;

}

function database_addJournal(date, title, journal_html)
{
	let n = new journal(date, title, journal_html);
	Database.modules.journalManager.journals.push(n);
	return n.id;
}


function database_updateJournal(id, date, title, journal_html)
{	
	let journals = Database.modules.journalManager.journals;

	for (var i =journals.length - 1; i >= 0; i--) {
			if(journals[i].id == id)
			{	 
				let nObject = new journal(date, title, journal_html);
				journals[i].title = nObject.title;
				journals[i].date = nObject.date;
				journals[i].journal_html = nObject.journal_html;
				return true;
			}
		}

	return false;
}

function database_deleteJournal(id)
{
	let journals = Database.modules.journalManager.journals;

	for (var i =journals.length - 1; i >= 0; i--) {
			if(journals[i].id == id)
			{	 journals.splice(i,1);
				 return true;
			}
		}

	return false;
}


function getColor(id)
{
	let colors = Database.modules.notesManager.colors;
	for (var i = 0; i < colors.length; i++) {
		if (colors[i].id ==id)
		{
			return colors[i].color;
		}
	}

	Database.modules.notesManager.colors.push(new color(id, "white"));
	return "white";
}

function setColor(id, value)
{	
	let colors = Database.modules.notesManager.colors;
	for (var i = 0; i < colors.length; i++) {
		if (colors[i].id ==id)
		{
			colors[i].color = value;
			return;
		}
	}

	let c = new color(id, value);
	Database.modules.notesManager.colors.push(c);
}



//Starting of controller of the app 

//Global variables

var state = {
	page: "lock",
	dialog: false,
	data:{}
}; 

var note_colors=[];
note_colors["red"]="#ffebee";
note_colors["blue"]="#e3f2fd";
note_colors["green"]="#cfffdb";
note_colors["white"]="#ffffff";
note_colors["gray"]="#fafafa";
note_colors["yellow"]="#fffde7";
note_colors["purple"]="#f3e5f5";
note_colors["pink"]="#fce4ec";

var border_colors=[];
border_colors["red"] = "#ffa2a288";
border_colors["blue"]="#a4c7e388";
border_colors["green"]="#a0fab288";
border_colors["white"]="#cccccc";
border_colors["gray"]="#d7d7d788";
border_colors["yellow"]="#ffd56d88";
border_colors["purple"]="#d394de88";
border_colors["pink"]="#ff96ba88";


var Database = new database();
initializeDatabase();


var dialog_scope="#modal ";
var lock_scope="#lock-screen ";
var dashboard_scope="div[data-page='dashboard'] ";
var password_manager_scope="div[data-page='password_manager'] ";
var notes_manager_scope="div[data-page='notes_manager'] ";
var journal_manager_scope="div[data-page='journal_manager'] ";
var settings_scope="div[data-page='settings'] ";
var appPass;
var noteHistory = []; //0 means notes home.
var tag_filter = [];
var quillObject;
var selection;

var toolbarOptions = [
   [{ 'header': [1, 2, 3, false] }],
  [{ 'header': 1 }, { 'header': 2 }],
  ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
  [{ 'script': 'sub'}, { 'script': 'super' }],
  ['link', 'image'],
  ['blockquote', 'code-block'],

              // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
       // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent 

   [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'align': [] }],
  ['clean'],                                      // remove formatting button
  ["fullscreen"] 
];

// ************************** Functions to run at start
bindEvents();
loadState(state);

//***************************


// Encrypt and decrypt functions based on sjcl library

function encrypt_object(password, object)
{
	try{
	return sjcl.encrypt(password,JSON.stringify(object));
	}
	catch(e)
	{
		return false;
	}
}

function decrypt_object(password, encrypted)
{	try{
	return JSON.parse(sjcl.decrypt(password,encrypted));
}
catch(e)
	{
		return false;
	}
}


function encrypt_string(password, data)
{	try{
	return sjcl.encrypt(password, data);
}
catch(e)
	{
		return false;
	}
}

function decrypt_string(password, encrypted)
{	try
	{
	return sjcl.decrypt(password, encrypted);
	}
	catch(e)
	{
		return false;
	}
}


//Data storage code
function getUniqueID()
{
	return Math.floor((Date.now() + Math.random())*100);
}

function humanReadableDate(timestamp)
{	
	let d = new Date(timestamp);
	let dateSeperator="/"
	let date = d.getDate();
	let month = d.getMonth()+1;
	let year = d.getFullYear();
	let hour = d.getHours();
	let noon = "am";
	if(hour>12)
	{
		noon = "pm";
	}
	if(hour>13)
	{
		hour = hour-12;
	}
	let minutes = d.getMinutes();

	return date+dateSeperator+month+dateSeperator+year+" "+hour+":"+minutes+" "+noon;

}

function displayJournalDate(date)
{
	return date;
}



function openLocker()
{
	loadState(state);
	hideModal();
	jQuery("#lock-screen").hide();
	jQuery("#root").show();
	loadState(state);
}

function initializeDatabase()
{	
	Database.name = "Locker";
	Database.username = "User";
	Database.modules={
		passwordManager: new passwordManager(),
		journalManager: new journalManager(),
		notesManager: new notesManager()
	}

}

function bindEvents()
{
	//Export option will export database in json file when clicked
	jQuery("#side-nav-bar div[data-target=export").on("click",function(){exportDatabase(Database);});
	jQuery("#side-nav-bar div[data-target=import").on("click",function(){jQuery("input[name=import]").click();});


	//Lock screen
	jQuery("#new-tab").on("click", function(){
		jQuery("#lock-screen .tab-content").hide();
		jQuery("#lock-screen #lock-new.tab-content").show();
		jQuery(".lock-tab span").removeClass("active");
		jQuery("#new-tab").addClass("active");

	});

	jQuery("#import-tab").on("click", function(){
		// jQuery("#lock-screen .tab-content").hide();
		// jQuery("#lock-screen #lock-import.tab-content").show();
		// jQuery(".lock-tab span").removeClass("active");
		// jQuery("#import-tab").addClass("active");
		jQuery("input[name=import]").click();
	});

	jQuery("#help-tab").on("click", function(){
		jQuery("#lock-screen .tab-content").hide();
		jQuery("#lock-screen #lock-help.tab-content").show();
		jQuery(".lock-tab span").removeClass("active");
		jQuery("#help-tab").addClass("active");
	});

	jQuery('body').on("click",".sort", function (){jQuery("#sort-dropdown .dropdown-menu").toggle();});

	//Sidebar menu

	jQuery('body').on("click","#side-nav-bar .nav-item", function(){
		var target = jQuery(this).attr("data-target");
		state.page = target;
		loadState(state);

	});

	jQuery('body').on("click",".option.toggle-menu", function(){
	jQuery("#side-nav-bar").toggle();
	});

	/*For password manager */
	jQuery('body').on("click",password_manager_scope+".unhide.option", function(){
	let id = jQuery(this).closest(".password-block").attr("id");
	showPassword(id);
	});

	jQuery('body').on("click", password_manager_scope+".hide.option", function(){
	let id = jQuery(this).closest(".password-block").attr("id");
	hidePassword(id);
	});

	jQuery('body').on("click", password_manager_scope+".edit.option", function(){
	let id = jQuery(this).closest(".password-block").attr("id");
	openUpdatePasswordForm(id);
	});

	jQuery('body').on("click", password_manager_scope+".delete.option", function(){
	let id = jQuery(this).closest(".password-block").attr("id");
	deletePasswordConfirmDialog(id);
	});

	jQuery('body').on("keyup", password_manager_scope+"#search input[name=search]", function(){
	searchPasswords();
	});

	jQuery('body').on("click",password_manager_scope+".option.add", openAddPasswordForm);
	jQuery('body').on("click",password_manager_scope+".option.save", savePassword);
	jQuery('body').on("click",password_manager_scope+".option.cancel", closePasswordForm);
	jQuery('body').on("click",password_manager_scope+".option.update", updatePassword);




	//Notes Manager

	jQuery('body').on("click",notes_manager_scope+".option.add", openAddNewNoteForm);

	jQuery('body').on("click",notes_manager_scope+".form.add-note .option.cancel", closeNoteEditor);

	jQuery('body').on("click",notes_manager_scope+".form.edit-note .option.cancel", function(){
	let id = jQuery(notes_manager_scope+"#note").attr("data-note-id");
	viewNote(id);
	});

	jQuery('body').on("click",notes_manager_scope+"#top-bar .option.cancel", function(){
	if(state.action == "create_note"){
	state.action="notes_manager_home";
	loadState(state);}
	else if (state.action == "edit_note")
	{
	state.action="view_note";
	let id = jQuery(notes_manager_scope+"#note").attr("data-note-id");
	viewNote(id);
	}

	});


	jQuery('body').on("click",notes_manager_scope+".option.home", function(){
		initializeNotesManager();
	});

	jQuery('body').on("click",notes_manager_scope+".option.back", function(){
		notesBackButton();
	});

	jQuery('body').on("click",notes_manager_scope+".notes-block .option.edit", function(){
	let id = jQuery(this).closest(".notes-block").attr("id");
	editNote(id);
	});

	jQuery('body').on("click",notes_manager_scope+"#top-bar .option.edit", function(){
	let id = jQuery(notes_manager_scope+"#note").attr("data-note-id");
	editNote(id);
	});

	jQuery('body').on("click",notes_manager_scope+".option.save", function(){

		if(state.action=="create_note")
		{
			saveNote();
		}
		else if(state.action == "edit_note")
		{
			updateNote();
		}

	});

	jQuery('body').on("click",notes_manager_scope+".option.update",updateNote);

	jQuery('body').on("click",notes_manager_scope+".notes-block .option.delete", function(){
	let id = jQuery(this).closest(".notes-block").attr("id");
	deleteNoteConfirmDialog(id);
	});

	jQuery('body').on("click",notes_manager_scope+"#top-bar .option.delete", function(){
	let id = jQuery(notes_manager_scope+"#note").attr("data-note-id");
	deleteNoteConfirmDialog(id);
	});


	jQuery('body').on("click",notes_manager_scope+".notes-block .title", function(){
	let id = jQuery(this).closest(".notes-block").attr("id");
	viewNote(id);
	});

	jQuery('body').on("keyup", notes_manager_scope+"#search input[name=search]", function(){
	searchNotes();
	});

	jQuery('body').on("click", notes_manager_scope+"#tags .tag", function(){
	let t=jQuery(this).attr("data");
	if(Database.conf.notesManager.multitagFilter)
	{		
			if(tag_filter.includes(t))
			{ /*Remove from tag filter and filter notes */ 
					tag_filter = tag_filter.filter(function(e){
					return e!=t;
					});
				jQuery(this).removeClass("active");
			}
			else
			{	
				/*Add to tag filter and filter notes */
				tag_filter.push(t);
				jQuery(this).addClass("active");
			}
			
	}
	else
	{	
		tag_filter = [];
		
		if(!jQuery(this).hasClass("active"))
		{
			tag_filter.push(t);
			jQuery(".tag").removeClass("active");
			jQuery(this).addClass("active");
		}
		else{
			jQuery(".tag").removeClass("active");
		}
	}

	if(tag_filter.length==0)
	{	
		createNotesSearchResultsView(Database.modules.notesManager.notes);
	}
	else
	{
		createNotesSearchResultsView(filterNotes(tag_filter));
	}
	
	
	});


	/* For journal manager */

	jQuery('body').on("click",journal_manager_scope+".option.add", openAddNewJournalForm);

	jQuery('body').on("click",journal_manager_scope+".form.add-journal .option.cancel", closeJournalEditor);

	jQuery('body').on("click",journal_manager_scope+".form.edit-journal .option.cancel", function(){
	let id = jQuery(journal_manager_scope+"#journal").attr("data-journal-id");
	viewJournal(id);
	});

	jQuery('body').on("click",journal_manager_scope+"#top-bar .option.cancel", function(){
	if(state.action == "create_journal"){
	state.action="journal_manager_home";
	loadState(state);}
	else if (state.action == "edit_journal")
	{
	state.action="view_journal";
	let id = jQuery(journal_manager_scope+"#journal").attr("data-journal-id");
	viewJournal(id);
	}

	});


	jQuery('body').on("click",journal_manager_scope+".option.back", function(){
		loadState(state);
	});

	jQuery('body').on("click",journal_manager_scope+".journal-block .option.edit", function(){
	let id = jQuery(this).closest(".journal-block").attr("id");
	editJournal(id);
	});

	jQuery('body').on("click",journal_manager_scope+"#top-bar .option.edit", function(){
	let id = jQuery(journal_manager_scope+"#journal").attr("data-journal-id");
	editJournal(id);
	});

	jQuery('body').on("click",journal_manager_scope+".option.save", function(){

		if(state.action=="create_journal")
		{
			saveJournal();
		}
		else if(state.action == "edit_journal")
		{
			updateJournal();
		}

	});

	jQuery('body').on("click",journal_manager_scope+".option.update",updateJournal);

	jQuery('body').on("click",journal_manager_scope+".journal-block .option.delete", function(){
	let id = jQuery(this).closest(".journal-block").attr("id");
	deleteJournalConfirmDialog(id);
	});

	jQuery('body').on("click",journal_manager_scope+"#top-bar .option.delete", function(){
	let id = jQuery(journal_manager_scope+"#journal").attr("data-journal-id");
	deleteJournalConfirmDialog(id);
	});


	jQuery('body').on("click",journal_manager_scope+".journal-block .title", function(){
	let id = jQuery(this).closest(".journal-block").attr("id");
	viewJournal(id);
	});

	jQuery('body').on("keyup", journal_manager_scope+"#search input[name=search]", function(){
	searchJournals();
	});



	/* Settings */

	jQuery('body').on("click",settings_scope+".btn.edit", editSettings);
	jQuery('body').on("click",settings_scope+".btn.save", saveSettings);
	jQuery('body').on("click",settings_scope+".btn.cancel", cancelSettings);
	jQuery('body').on("click",settings_scope+".btn.restore", restoreSettings);


	/* Internal links*/
	jQuery('body').on("keyup", "#addlinkForm input[name=link]", function(){
	internalLinkSuggestions();
	});

	jQuery('body').on("click","a[href^='https://note/']:not(div[contenteditable='true'] a)", function(e)
	{	e.preventDefault();
		goToInternalLink(this.href);
	});

	jQuery('body').on("click","a[href='about:blank']", function(e)
	{	e.preventDefault();
	});

	//Color selected
	jQuery('body').on("click",".color-selector", function(e)
	{
		openColorSelector();
	});

	jQuery('body').on("click",".color-picker .color-box", function()
	{
		colorSelector(jQuery(this).attr("value"));
		
	});
	
}


// File  handling functions
function exportDatabase(DBObject) {

    let filename = DBObject.name+".json";

    DBObject = encrypt_object(appPass, DBObject);
    let contentType = "application/json;charset=utf-8;";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(DBObject)))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } 
    else {
      var a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(DBObject));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
}


function showPasswordDialogForImport()
{
	modalHTML = `
	<div id="messages"></div>
	<div class="form">
	<input type="password" name="import-db-password" class="form-control password">
	<input type="checkbox" style="margin-top:10px;" onclick="showpassword(this)"><span style="margin-left:10px">Show password</span>
	</div>
	`;

	buttonHTML = `
	<button type="button" class="btn btn-success" onClick="importDatabase()">Enter</button>
	`;

	createModal("Database password",modalHTML,buttonHTML);
	showModal();

}

function importDatabase()
{
   let file = jQuery("input[name=import]")[0].files[0];
   let p = jQuery("input[name=import-db-password]").val().trim();
  
   if(file)
  { 
  	try{
  	const reader = new FileReader();
    reader.addEventListener('load', (event) => {
    const result = event.target.result;
   
    try{

    let resultObj = JSON.parse(result);
    
    let fileData= decrypt_object(p,resultObj);
    	
   


    if(fileData)
    {
    addDatabase(fileData);
    hideModal();
    state.page="dashboard";
    loadState(state);
    appPass = p;
    
	}
	else
	{
		message("Incorrect password","danger");
		jQuery("input[name=import-db-password]").val("");
	}


    }
    catch(e){
    message("File is not readable. Make sure the file is locker file", "danger");
    console.log(e);    }
  });

  reader.readAsText(file);
   }
 catch(e){
 	message("Cannot import file. Please make sure that the file is correct.","danger");
 }
}
}


function createDatabase()
{

	Database.name = jQuery("input[name=db-name]").val().trim();
	Database.username = jQuery("input[name=db-username]").val().trim();
	appPass = jQuery("input[name=db-pass]").val().trim();
	Database.modules={
		passwordManager: new passwordManager(),
		journalManager: new journalManager(),
		notesManager: new notesManager()
	}

    state.page="dashboard";
    jQuery("input").val("");
    loadState(state);
}

//Adding decrypted database json to current database
function addDatabase(data)
{
	if(data)
	{	
			
			if(typeof data.version == 'undefined')
			{	
				 //This means the Database version is not defined
				console.log("Imported file is of version 0 upgrading to version 1");
				data.version = 1;
				data.conf = Database.conf;
			}

			if(data.version == 1)
			{	// Upgrade old data to version 2 format with default values.
				console.log("Imported file is of version 1 upgrading to version 2");
				data.version = 2;
				data.conf.notesManager.tagsPosition = Database.conf.notesManager.tagsPosition;
				data.conf.notesManager.multitagFilter = Database.conf.notesManager.multitagFilter;
				data.conf.notesManager.multitagFilterBehaviour = Database.conf.notesManager.multitagFilterBehaviour;
				data.modules.notesManager.tags= Database.modules.notesManager.tags;
			}

			if(data.version == 2)
			{ // Upgrade old data to version 3 format with default values.
				console.log("Imported file is of version 2 upgrading to version 3");
				data.version = 3;
				data.modules.notesManager.colors = Database.modules.notesManager.colors;


			}

			Database = data;

		return true;


	}
	else
	{
		return false;
	}
}


//Loads full html
function loadState(newstate)
{	
	if(newstate.page=="lock")
	{
	jQuery("#view").html("");
	jQuery("#root").hide();
	jQuery("#lock-screen").show();

	}
	else if(newstate.page=="dashboard")
	{
		jQuery("#view").html("");
		jQuery("#root").show();
		jQuery("#lock-screen").hide();
		console.log("Initialising dashboard");
		initializeDashboard();
	}
	else if(newstate.page=="password_manager")
	{	
		jQuery("#view").html("");
		jQuery("#root").show();
		jQuery("#lock-screen").hide();
		console.log("Initialising password manager");
		initializePasswordManager();
	}
	else if(newstate.page=="notes_manager")
	{
		jQuery("#view").html("");
		jQuery("#root").show();
		jQuery("#lock-screen").hide();
		console.log("Initialising notes manager");
		initializeNotesManager();
	}

	else if(newstate.page=="journal_manager")
	{
		jQuery("#view").html("");
		jQuery("#root").show();
		jQuery("#lock-screen").hide();
		console.log("Initialising journal manager");
		initializeJournalManager();
	}

	else if(newstate.page=="settings")
	{
		jQuery("#view").html("");
		jQuery("#root").show();
		jQuery("#lock-screen").hide();
		console.log("Initialising settings");
		initializeSettings();
	}

}



/* Common UI functions */
function message(info, type)
{
let messageId=getUniqueID();
let htmlCode = `<div class="alert alert-`+type+` alert-dismissible fade show" role="alert" id="`+messageId+`">`
+info+
`<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
	`;

let scope;
if(state.dialog==true)
{
	scope = dialog_scope;
}
else if(state.page == "lock")
{
	scope = lock_scope;
}
else if(state.page == "password_manager")
{scope = password_manager_scope;
}
else if(state.page == "notes_manager")
{scope = notes_manager_scope;
}
else if(state.page == "journal_manager")
{scope = journal_manager_scope;
}
else if(state.page == "settings")
{scope = settings_scope;
}

jQuery(scope+"#messages").html(htmlCode);
setTimeout(function(){jQuery("#"+messageId).alert('close');}, 2000);
}


function createModal(title, contentHTML, buttonHTML)
{
	var modalHTML=`
	<div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal-title">`+title+`</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">`+contentHTML+`
      </div>
      <div class="modal-footer">
        `+ buttonHTML +`
      </div>
    </div>
	`;

	jQuery("#modal").html(modalHTML);
}


function showModal()
{
	jQuery("#modal").modal("show");
	state.dialog = true;
}

function hideModal()
{
	jQuery("#modal").html("");
	jQuery("#modal").modal("hide");
	state.dialog = false;
}

function createNotesManagerTopBar()
{

	let topBarHTML=`
	<div class="top-bar-block option toggle-menu" title="Toggle menu">
		<i class="fas fa-bars"></i>
	</div>`;
	if(noteHistory.length>0)
	{
		topBarHTML+=`
		<div class="back top-bar-block option" title="Back">
	<i class="fas fa-chevron-left"></i>
	</div>
		`;
	}
	topBarHTML+=`
	<div class="top-bar-block" id="search">
		<input type="text" name="search" placeholder="Search">
	</div>
	<div class="add top-bar-block option">
		<i class="fas fa-plus"></i>
	</div>`;

	jQuery("#top-bar").html(topBarHTML);

}

function createTopBar()
{
	let topBarHTML=`
	<div class="top-bar-block option toggle-menu" title="Toggle menu">
		<i class="fas fa-bars"></i>
	</div>
	<div class="top-bar-block" id="search">
		<input type="text" name="search" placeholder="Search">
	</div>
	<div class="add top-bar-block option">
		<i class="fas fa-plus"></i>
	</div>
	`;
	jQuery("#top-bar").html(topBarHTML);
}


function setSortConfig(sortValue)
{	
	let module = jQuery("#main").attr("data-page");
	if(module=="password_manager")
	{
		Database.conf.passwordManager.sort = sortValue;
		initializePasswordManager();
	}
	else if(module=="notes_manager")
	{
		Database.conf.notesManager.sort = sortValue;
		initializeNotesManager();
	}
	else if(module=="journal_manager")
	{
		Database.conf.journalManager.sort = sortValue;
		initializeJournalManager();
	}
}










/**************************************
***************************************
**************************************/




























/* Password manager functions */

function initializePasswordManager()
{	
	jQuery("#main").attr("data-page","password_manager");
	createTopBar();
	let viewHTML=`
	<div id="messages">
	</div>
	<div id="form" style="display:none;">
	</div>
	<div id="passwords">
	</div>
	`;
	jQuery("#view").html(viewHTML);
	jQuery("#side-nav-bar .nav-item").removeClass("active");
	jQuery("#side-nav-bar div[data-target=password_manager]").addClass("active");
	createPasswordsView();
	state.action = "password_manager_home";
	state.data={};
	jQuery(password_manager_scope+"#bottom-bar").html("Password manager");

	//Adding sort option

	var sortOptionHTML = `
	<div class="sort top-bar-block option">
	<i class="fas fa-sort"></i>
	</div>
	<div class="dropdown" id="sort-dropdown">
	<div class="dropdown-menu">
	  <a class="dropdown-item" onClick="setSortConfig(1)" value="1">Website (A-Z)</a>
	  <a class="dropdown-item" onClick="setSortConfig(2)" value="2">Website (Z-A)</a>
	  <a class="dropdown-item" onClick="setSortConfig(3)" value="3">Date (New to Old)</a>
	  <a class="dropdown-item" onClick="setSortConfig(4)" value="4">Date (Old to new)</a>
	</div>
	</div>
	`;

	jQuery(password_manager_scope+"#top-bar").append(sortOptionHTML);
	jQuery(password_manager_scope+"#top-bar #sort-dropdown .dropdown-item[value="+Database.conf.passwordManager.sort+"]").addClass("active");
}


function openAddPasswordForm()
{
	var htmlCode=`
		<form class="add form">
		<div class="input-group form-group">
		<div class="input-group-prepend">
  		<span class="input-group-text">Website</span>
  		</div>
		<input type="text" name="website" class="form-control">
		</div>
		<div class="input-group form-group">
		<div class="input-group-prepend">
  		<span class="input-group-text">Username</span>
  		</div>
		<input type="text" name="username" class="form-control">
		</div>
		<div class="input-group form-group">
		<div class="input-group-prepend">
  		<span class="input-group-text">Password</span>
  		</div>
		<input type="text" name="password" class="form-control">
		</div>
		<button type="button" class="btn btn-success option save">Save</button>
		<button type="button" class="btn btn-info option cancel"">Cancel</button>
		</form>
		`;

	jQuery(password_manager_scope+"#form").html(htmlCode).show();
	jQuery(password_manager_scope+"#view").scrollTop(0);
	
}

function openUpdatePasswordForm(id)
{   let passwordObject = database_getPasswordObject(id);	

	var htmlCode=`
		<form class="update form">
		<div class="input-group form-group">
		<div class="input-group-prepend">
  		<span class="input-group-text">Website</span>
  		</div>
  		<input type="hidden" name="id" value="`+passwordObject.id+`">
		<input type="text" name="website" class="form-control" value="`+passwordObject.website+`">
		</div>
		<div class="input-group form-group">
		<div class="input-group-prepend">
  		<span class="input-group-text">Username</span>
  		</div>
		<input type="text" name="username" class="form-control" value="`+passwordObject.username+`">
		</div>
		<div class="input-group form-group">
		<div class="input-group-prepend">
  		<span class="input-group-text">Password</span>
  		</div>
		<input type="text" name="password" class="form-control" value="`+decrypt_string(appPass,passwordObject.password)+`">
		</div>
		<button type="button" class="btn btn-success option update">Save</button>
		<button type="button" class="btn btn-info option cancel">Cancel</button>
		</form>
		`;

	jQuery(password_manager_scope+"#form").html(htmlCode).show();
	jQuery(password_manager_scope+"#view").scrollTop(0);
}

function savePassword()
{	

	let website = jQuery(password_manager_scope+"#form input[name=website]").val().trim();
	let username = jQuery(password_manager_scope+"#form input[name=username]").val().trim();
	let pass = jQuery(password_manager_scope+"#form input[name=password]").val().trim();

	if(website.length == 0 || username.length == 0 || pass.length == 0)
	{
		message("Please fill all the fields", "warning");
		return;
	}


	database_addPassword(website, username, pass);
	closePasswordForm();
	message("Password saved successfully", "success");
	createPasswordsView();
}


function updatePassword()
{
	let id = jQuery(password_manager_scope+"#form input[name=id]").val().trim();
	let website = jQuery(password_manager_scope+"#form input[name=website]").val().trim();
	let username = jQuery(password_manager_scope+"#form input[name=username]").val().trim();
	let pass = jQuery(password_manager_scope+"#form input[name=password]").val().trim();

	if(website.length == 0 || username.length == 0 || pass.length == 0)
	{
		message("Please fill all the fields", "warning");
		return;
	}

	database_updatePassword(id, website, username, pass);
	closePasswordForm();
	message("Password updated successfully", "success");
	createPasswordsView();

}

function closePasswordForm()
{
	jQuery(password_manager_scope+"#form").html("").hide();
}


function deletePasswordConfirmDialog(id)
{
	let modalHTML = `
	Are you sure you want to delete this password entry? Once deleted it cannot be recovered ever.
	<input type="hidden" name="delete-password-id" value="`+id+`">
	`;
	let buttonHTML = `<button type="button" class="btn btn-danger" onClick="deletePassword()">Delete</button>
	`;

	createModal("Confirm delete",modalHTML,buttonHTML);
	showModal();
}

function deletePassword()
{
	let id = jQuery("input[name=delete-password-id]").val().trim();
	database_deletePassword(id);
	hideModal();
	createPasswordsView();
	message("Password Deleted successfully", "success");

}

function createPasswordsView()
{
	let passwords = Database.modules.passwordManager.passwords;
	if(passwords.length == 0)
	{	let htmlCode = `<div class="alert alert-warning" role="alert">
			There are no passwords saved in the locker
			</div>`;
		jQuery(password_manager_scope+"#passwords").html(htmlCode);
	}
	else
	{	jQuery(password_manager_scope+"#passwords").html("");
		
		applyConfigCreatePasswordBlocks(passwords);
		// for (var i = passwords.length - 1; i >= 0; i--) {
		// 	addPasswordBlock(passwords[i].id, passwords[i].website, passwords[i].username);
		// }
		
	}
}

function addPasswordBlock(id, website, username)
{	
		var htmlCode =`
		<div class="row password-block" id="`+id+`">
		<div class="col">
		<div class="website"><span class="label">Website</span><span class="website-value">`+website+`</span></div>
		<div class="username"><span class="label">Username</span><span class="Username-value">`+username+`</span></div>
		<div class="password"><span class="label">Password</span><span class="password-value">&bullet;&bullet;&bullet;&bullet;&bullet;&bullet;</span></div>
		<div class="options"><span class="unhide option" title="Show password"><i class="far fa-eye"></i></span><span class="edit option" title="Edit"><i class="far fa-edit"></i></span><span class="delete option" title="Delete"><i class="fas fa-trash"></i></span></div>
		</div>
		</div>`;

	jQuery(password_manager_scope+"#passwords").append(htmlCode);
}


function showPassword(id)
{
	let pass = database_getPassword(id);
	jQuery("#"+id+" .password-value").html(pass);
	jQuery("#"+id+" .unhide").removeClass("unhide").addClass("hide");
	jQuery("#"+id+" .option.hide").html(`<i class="far fa-eye-slash"></i>`);

}

function hidePassword(id)
{
	jQuery("#"+id+" .hide").removeClass("hide").addClass("unhide");
	jQuery("#"+id+" .password-value").html("&bullet;&bullet;&bullet;&bullet;&bullet;&bullet;");
	jQuery("#"+id+" .option.unhide").html(`<i class="far fa-eye"></i>`);
}

function searchPasswords()
{
	let q=jQuery(password_manager_scope+"#search input[name=search]").val().trim();

	if(q.length==0)
	{
		createPasswordsView();
	}
	else
	{
	let passwords = Database.modules.passwordManager.passwords;
	let matchingPasswords = passwords.filter(function(e){
		return e.website.toLowerCase().includes(q.toLowerCase());
	});
	createPasswordSearchResultsView(matchingPasswords);
	}
}

function createPasswordSearchResultsView(passwords)
{
	if(passwords.length == 0)
	{	let htmlCode = `<div class="alert alert-danger" role="alert">
			There are no matching website found.
			</div>`;
		jQuery(password_manager_scope+"#passwords").html(htmlCode);
	}
	else
	{	
		jQuery(password_manager_scope+"#passwords").html("");

		applyConfigCreatePasswordBlocks(passwords);
		// for (var i = passwords.length - 1; i >= 0; i--) {
		// 	addPasswordBlock(passwords[i].id, passwords[i].website, passwords[i].username);
		// }
	}
}



function applyConfigCreatePasswordBlocks(passwords)
{
	let p = JSON.parse(JSON.stringify(passwords)); //To clone the passwords array

	if(Database.conf.passwordManager.sort == 1)
	{
		p.sort( function compare(e1,e2){
		if(e1.website.toLowerCase() < e2.website.toLowerCase()) {return -1;}
		else if(e1.website.toLowerCase() > e2.website.toLowerCase()) {return 1;}
		else if (e1.website.toLowerCase() == e2.website.toLowerCase()) {return 0;}
		});
	}
	else if (Database.conf.passwordManager.sort == 2)
	{
		p.sort( function compare(e1,e2){
		if(e1.website.toLowerCase() < e2.website.toLowerCase()) {return 1;}
		else if(e1.website.toLowerCase() > e2.website.toLowerCase()) {return -1;}
		else if (e1.website.toLowerCase() == e2.website.toLowerCase()) {return 0;}
		});
	}
	else if (Database.conf.passwordManager.sort == 3 || Database.conf.passwordManager.sort == 5)
	{
		p.sort( function compare(e1,e2){
		if(e1.date < e2.date) {return 1;}
		else if(e1.date > e2.date) {return -1;}
		else if (e1.date == e2.date) {return 0;}
		});
	}
	else if (Database.conf.passwordManager.sort == 4 || Database.conf.passwordManager.sort == 6)
	{
		p.sort( function compare(e1,e2){
		if(e1.date < e2.date) {return -1;}
		else if(e1.date > e2.date) {return 1;}
		else if (e1.date == e2.date) {return 0;}
		});
	}

	for (var i =0; i<p.length; i++) {
			addPasswordBlock(p[i].id, p[i].website, p[i].username);
		}
}











/* Notes Manager */
function initializeNotesManager()
{	
	jQuery("#main").attr("data-page","notes_manager");
	createNotesManagerTopBar();
	let viewHTML=`
	<div id="tags" class="row">
	</div>
	<div id="messages">
	</div>
	<div id="note" style="display:none;">
	</div>
	<div id="notes">
	</div>
	`;
	jQuery("#view").html(viewHTML);
	jQuery("#side-nav-bar .nav-item").removeClass("active");
	jQuery("#side-nav-bar div[data-target=notes_manager]").addClass("active");
	createNotesView();
	state.action = "notes_manager_home";
	state.data={};
	jQuery(notes_manager_scope+"#bottom-bar").html("Notes manager");

	var sortOptionHTML = `
	<div class="sort top-bar-block option">
	<i class="fas fa-sort"></i>
	</div>
	<div class="dropdown" id="sort-dropdown">
	<div class="dropdown-menu">
	  <a class="dropdown-item" onClick="setSortConfig(1)" value="1">Title (A-Z)</a>
	  <a class="dropdown-item" onClick="setSortConfig(2)" value="2">Title (Z-A)</a>
	  <a class="dropdown-item" onClick="setSortConfig(3)" value="3">Date created (New to Old)</a>
	  <a class="dropdown-item" onClick="setSortConfig(4)" value="4">Date created (Old to new)</a>
	  <a class="dropdown-item" onClick="setSortConfig(5)" value="5">Date modified (New to Old)</a>
	  <a class="dropdown-item" onClick="setSortConfig(6)" value="6">Date modified (Old to new)</a>
	</div>
	</div>
	`;
	jQuery(notes_manager_scope+"#top-bar").append(sortOptionHTML);
	jQuery(notes_manager_scope+"#top-bar #sort-dropdown .dropdown-item[value="+Database.conf.notesManager.sort+"]").addClass("active");

	let uniqueTags=getUniqueTags();
	if(uniqueTags.length>0)
	{
		jQuery(notes_manager_scope+"#tags").html(getTagViewHTML(uniqueTags));
	}
	else
	{
		jQuery(notes_manager_scope+"#tags").hide();
	}

	tag_filter = [];

	addNotesHistory(0);
}


function createNotesView()
{
	let notes = Database.modules.notesManager.notes;
	if(notes.length == 0)
	{	let htmlCode = `<div class="alert alert-warning" role="alert">
			There are no notes saved in the locker
			</div>`;
		jQuery(notes_manager_scope+"#notes").html(htmlCode);
	}
	else
	{	
		jQuery(notes_manager_scope+"#notes").html("");
		
		applyConfigCreateNotesBlocks(notes);
		// for (var i = notes.length - 1; i >= 0; i--) {
		// 	addNotesBlock(notes[i]);
		// }
	}
}

function addNotesBlock(note)
{ 	
	let bg = getColor(note.id);
	if(bg=="white")
	{
		bg="gray";
	}

	var htmlCode =`
		<div class="row notes-block" id="`+note.id+`" style="background-color:`+note_colors[bg]+`;border-color:`+border_colors[bg]+`">
		<div class="col">
		<div class="title">`+note.title+`</div>
		<div class="note-details">
		<div>Created on <span class="date-created">`+humanReadableDate(note.date)+`</span></div>
		<div>Last modified on <span class="date-modified">`+humanReadableDate(note.modified)+`</span></div>
		<div class="tags row">`+getTagViewHTML(getTags(note.id))+`</div>
		</div>
		<div class="options"><span class="edit option" title="Edit"><i class="far fa-edit"></i></span><span class="delete option" title="Delete"><i class="fas fa-trash"></i></span></div>
		</div>
		</div>`;
	jQuery(notes_manager_scope+"#notes").append(htmlCode);
}

function openAddNewNoteForm()
{
	var htmlCode =`
	<form id="note-editor-form" class="form add-note">
		<div class="input-group form-group">
		<div class="input-group-prepend">
  		<span class="input-group-text">Title</span>
  		</div>
		<input type="text" name="title" class="form-control" value="Untitled">
		</div>
		<div class="input-group form-group">
		<div class="input-group-prepend">
	  	<span class="input-group-text">Tags</span>
	  	</div>
	  	<input type="text" name="tags" class="form-control" placeholder="Add tags seperated with space">
	  	<div class="color-selector" value="white" title="Color"></div>
	  	</div>
		<div id="note-editor">
		</div>
		<button type="button" class="btn btn-success option save">Save</button>
		<button type="button" class="btn btn-info option cancel"">Cancel</button>
		</form>
	`;

  jQuery(notes_manager_scope+"#note").html(htmlCode).show();
  jQuery(notes_manager_scope+"#tags").hide();
  jQuery(notes_manager_scope+"#notes").hide();


    colorSelector("white");

 	let ColorPickerCode = 
	`<div class="color-picker" style="display:none;">
	`;
	for (var key in note_colors) {
	ColorPickerCode= ColorPickerCode +`<div class="color-box" value="`+key+`" title="`+key+`" style="background-color:`+note_colors[key]+`;border-color:`+border_colors[key]+`"></div>`;
	}
	
	ColorPickerCode= ColorPickerCode +`</div>`;

	jQuery(".color-selector").after(ColorPickerCode);



 quillObject = new Quill('#note-editor', {
    theme: 'snow',
     modules: {
    toolbar: toolbarOptions
  }
  });

//Adding custom link handler to quill
 quillObject.getModule('toolbar').addHandler('link', addlink); 

// jQuery(notes_manager_scope+"#note #note-editor .ql-editor").html("</br></br></br></br></br></br>");
 updateNoteTopBarforNoteEditing();
 state.action = "create_note";
 jQuery("div[contenteditable='true']").css("max-height",(jQuery("#view").height() - 225)+"px");

}

function editNote(id)
{
	let note = database_getNotesObject(id);
	if(note)
	{

	let note_html = decrypt_string(appPass, note.note_html);

	var htmlCode =`
	<form id="note-editor-form" class="form edit-note">
		<div class="input-group form-group">
		<div class="input-group-prepend">
  		<span class="input-group-text">Title</span>
  		</div>
  	<input type="hidden" name="id" class="form-control" value="`+id+`">
		<input type="text" name="title" class="form-control" value="`+note.title+`">
		</div>
		<div class="input-group form-group">
		<div class="input-group-prepend">
	  	<span class="input-group-text">Tags</span>
	  	</div>
	  	<input type="text" name="tags" class="form-control" placeholder="Add tags seperated with space">
	  	<div class="color-selector" value="white" title="Color"></div>
	  	</div>
		<div id="note-editor">
		</div>
		<button type="button" class="btn btn-success option update">Save</button>
		<button type="button" class="btn btn-info option cancel"">Cancel</button>
		</form>
	`;

  jQuery(notes_manager_scope+"#note").html(htmlCode).show();
  jQuery(notes_manager_scope+"#note").attr("data-note-id",note.id);
  jQuery(notes_manager_scope+"#tags").hide();
  jQuery(notes_manager_scope+"#notes").hide();

  


 	let ColorPickerCode = 
	`<div class="color-picker" style="display:none;">
	`;
	for (var key in note_colors) {
	ColorPickerCode= ColorPickerCode +`<div class="color-box" value="`+key+`" title="`+key+`" style="background-color:`+note_colors[key]+`;border-color:`+border_colors[key]+`"></div>`;
	}
	
	ColorPickerCode= ColorPickerCode +`</div>`;

	jQuery(".color-selector").after(ColorPickerCode);

  let tags = getTags(id);
  if(tags.length>0)
  {	let tag_string="";
		for (var i = 0; i<tags.length; i++) {
			tag_string+=tags[i]+" "
		}
  	jQuery(notes_manager_scope+"#note-editor-form input[name=tags]").val(tag_string);


  }

  

 quillObject = new Quill('#note-editor', {
    theme: 'snow',
     modules: {
    toolbar: toolbarOptions
  }
  });

 //Adding custom link handler to quill
 quillObject.getModule('toolbar').addHandler('link', addlink); 

 jQuery(notes_manager_scope+"#note #note-editor .ql-editor").html(note_html);
 updateNoteTopBarforNoteEditing();
 state.action = "edit_note";
 state.data.id=id;
}
jQuery("div[contenteditable='true']").css("max-height",(jQuery("#view").height() - 225)+"px");

	//remove note-bg and apply color to editor
  	jQuery(".note-bg").remove();
  	colorSelector(getColor(id));
	

}


function saveNote()
{		

	let title = jQuery(notes_manager_scope+"#note-editor-form input[name=title]").val();
	let noteHTML = jQuery(notes_manager_scope+"#note-editor .ql-editor").html();
	let id = database_addNote(title, noteHTML);
	let tag_string=jQuery(notes_manager_scope+"#note-editor-form input[name=tags]").val().trim();
	let color = jQuery(".color-selector").first().attr("value");

	updateTags(tag_string, id);
	setColor(id, color);
	closeNoteEditor();
	viewNote(id);
}

function updateNote()
{	
	let id=jQuery(notes_manager_scope+"#note-editor-form input[name=id]").val();
	let title = jQuery(notes_manager_scope+"#note-editor-form input[name=title]").val();
	let noteHTML = jQuery(notes_manager_scope+"#note-editor .ql-editor").html();
	let color = jQuery(".color-selector").first().attr("value");

	let updated = database_updateNote(id, title, noteHTML);
	if(updated)
	{
	let tag_string=jQuery(notes_manager_scope+"#note-editor-form input[name=tags]").val().trim();
	updateTags(tag_string, id);
	setColor(id, color);
	closeNoteEditor();
	viewNote(id);
	}
	else
	{
	message("Unable to update note","danger");
	}
}

function closeNoteEditor()
{	jQuery(notes_manager_scope+"#note").html("").hide();
	jQuery(notes_manager_scope+"#notes").show();
	loadState(state);
}

function viewNote(id)
{	
	let note = database_getNotesObject(id);
	if(note)
	{
	let note_html = `<div class="note-viewer ql-container ql-editor"><div class="note-title">`+note.title+`</div>`+decrypt_string(appPass, note.note_html)+`</div>`;

	//Adding tags;
	let tag_html = `<div id="note_tags" class="row">`;
	let tags=getTags(id);
	if(tags.length>0)
	{
		tag_html+=getTagViewHTML(tags);
	}
	tag_html+=`</div>`;

	if(Database.conf.notesManager.tagsPosition==1)
	{
		note_html = tag_html+note_html;
	}
	else
	{
		note_html = note_html+tag_html;
	}

	jQuery(notes_manager_scope+"#note").html(note_html).show();
	jQuery(notes_manager_scope+"#note").attr("data-note-id",note.id);
	jQuery(notes_manager_scope+"#tags").hide();
	jQuery(notes_manager_scope+"#notes").hide();

	updateNoteTopBarforNoteViewing();

	

	let bottomHTML = `Created: `+humanReadableDate(note.date)+` | Last modified: `+humanReadableDate(note.modified);
	jQuery(notes_manager_scope+"#bottom-bar").html(bottomHTML);
	state.action = "view_note";
	state.data.id=id;
	addNotesHistory(id);


	//Applying color to the note
	let noteColorBG = `
	<div class="note-bg" style="position:absolute;top:0px;left:0px;z-index:-100;width:100%;height:100%;background-color:`+note_colors[getColor(id)]+`"></div>
	`;
	jQuery("#note").after(noteColorBG);

	}
}

function addNotesHistory(id)
{
	if(noteHistory.includes(id))
	{
		noteHistory = noteHistory.filter(function(e){
			return e!=id;
		});
	}
	
	noteHistory.push(id);

	if(noteHistory.length > 10)
	{
		noteHistory.shift();
	}
}


function updateNoteTopBarforNoteViewing()
{	
	let newHTML = `
	<div class="top-bar-block option toggle-menu" title="Toggle menu">
		<i class="fas fa-bars"></i>
	</div>
	<div class="home top-bar-block option" title="Home">
	<i class="fas fa-home"></i>
	</div>
	<div class="back top-bar-block option" title="Back">
	<i class="fas fa-chevron-left"></i>
	</div>
	<div class="edit top-bar-block option" title="Edit">
	<i class="fas fa-edit"></i>
	</div>
	<div class="delete top-bar-block option" title="Delete">
	<i class="fas fa-trash"></i>
	</div>
	`;
	jQuery(notes_manager_scope+"#top-bar").html(newHTML);
}

function updateNoteTopBarforNoteEditing()
{	
	let newHTML = `
	<div class="top-bar-block option toggle-menu" title="Toggle menu">
		<i class="fas fa-bars"></i>
	</div>
	<div class="back top-bar-block option" title="Back">
	<i class="fas fa-chevron-left"></i>
	</div>
	<div class="save top-bar-block option" title="Save">
	<i class="fas fa-save"></i>
	</div>
	<div class="cancel top-bar-block option" title="Cancel">
	<i class="fas fa-times"></i>
	</div>
	<div class="delete top-bar-block option" title="Delete">
	<i class="fas fa-trash"></i>
	</div>
	`;
	jQuery(notes_manager_scope+"#top-bar").html(newHTML);
}

function deleteNoteConfirmDialog(id)
{

	let modalHTML = `
	Are you sure you want to delete this note ? Once deleted it cannot be recovered ever.
	<input type="hidden" name="delete-note-id" value="`+id+`">`;
	let buttonHTML = `<button type="button" class="btn btn-danger" onClick="deleteNote()">Delete</button>`;
	createModal("Confirm delete",modalHTML,buttonHTML);
	showModal();
}

function deleteNote()
{
	let id = jQuery("input[name=delete-note-id]").val().trim();
	database_deleteNote(id);
	hideModal();
	initializeNotesManager();
	message("Note deleted successfully", "success");
}


function searchNotes()
{
	let q=jQuery(notes_manager_scope+"#search input[name=search]").val().trim();

	if(q.length==0)
	{
		createNotesView();
	}
	else
	{
	let notes = Database.modules.notesManager.notes;
	let matchingNotes = notes.filter(function(e){
		return e.title.toLowerCase().includes(q.toLowerCase());
	});
	createNotesSearchResultsView(matchingNotes);
	}
}

function createNotesSearchResultsView(notes)
{
	if(notes.length == 0)
	{	let htmlCode = `<div class="alert alert-danger" role="alert">
			There are no matching note found.
			</div>`;
		jQuery(notes_manager_scope+"#notes").html(htmlCode);
	}
	else
	{	
		jQuery(notes_manager_scope+"#notes").html("");
		
		applyConfigCreateNotesBlocks(notes);
		// for (var i = notes.length - 1; i >= 0; i--) {
		// 	addNotesBlock(notes[i]);
		// }
	}
}



function applyConfigCreateNotesBlocks(notes)
{
	let p = JSON.parse(JSON.stringify(notes)); //To clone the passwords array

	if(Database.conf.notesManager.sort == 1)
	{
		p.sort( function compare(e1,e2){
		if(e1.title.toLowerCase() < e2.title.toLowerCase()) {return -1;}
		else if(e1.title.toLowerCase() > e2.title.toLowerCase()) {return 1;}
		else if (e1.title.toLowerCase() == e2.title.toLowerCase()) {return 0;}
		});
	}
	else if (Database.conf.notesManager.sort == 2)
	{
		p.sort( function compare(e1,e2){
		if(e1.title.toLowerCase() < e2.title.toLowerCase()) {return 1;}
		else if(e1.title.toLowerCase() > e2.title.toLowerCase()) {return -1;}
		else if (e1.title.toLowerCase() == e2.title.toLowerCase()) {return 0;}
		});
	}
	else if (Database.conf.notesManager.sort == 3)
	{
		p.sort( function compare(e1,e2){
		if(e1.date < e2.date) {return 1;}
		else if(e1.date > e2.date) {return -1;}
		else if (e1.date == e2.date) {return 0;}
		});
	}
	else if (Database.conf.notesManager.sort == 4)
	{
		p.sort( function compare(e1,e2){
		if(e1.date < e2.date) {return -1;}
		else if(e1.date > e2.date) {return 1;}
		else if (e1.date == e2.date) {return 0;}
		});
	}

	else if (Database.conf.notesManager.sort == 5)
	{
		p.sort( function compare(e1,e2){
		if(e1.modified < e2.modified) {return 1;}
		else if(e1.modified > e2.modified) {return -1;}
		else if (e1.modified == e2.modified) {return 0;}
		});
	}
	else if (Database.conf.notesManager.sort == 6)
	{
		p.sort( function compare(e1,e2){
		if(e1.modified < e2.modified) {return -1;}
		else if(e1.modified > e2.modified) {return 1;}
		else if (e1.modified == e2.modified) {return 0;}
		});
	}

	for (var i =0; i<p.length; i++) {
			addNotesBlock(p[i]);
		}
}


function notesBackButton()
{


	let e = noteHistory.pop();
	if(noteHistory.length!=0)
	{
		e=noteHistory.pop();
		if(e==0)
		{
			initializeNotesManager();
		}
		else
		{
			viewNote(e);
		}
	}
	else
	{
		initializeNotesManager();
	}

	
}








/* Journal manager functions */
function initializeJournalManager()
{
	jQuery("#main").attr("data-page","journal_manager");
	createTopBar();
	let viewHTML=`
	<div id="messages">
	</div>
	<div id="journal" style="display:none;">
	</div>
	<div id="journals">
	</div>
	`;
	jQuery("#view").html(viewHTML);
	jQuery("#side-nav-bar .nav-item").removeClass("active");
	jQuery("#side-nav-bar div[data-target=journal_manager]").addClass("active");
	createJournalView();
	state.action = "journal_manager_home";
	state.data={};
	jQuery(journal_manager_scope+"#bottom-bar").html("Journal manager");


	var sortOptionHTML = `
	<div class="sort top-bar-block option">
	<i class="fas fa-sort"></i>
	</div>
	<div class="dropdown" id="sort-dropdown">
	<div class="dropdown-menu">
	  <a class="dropdown-item" onClick="setSortConfig(1)" value="1">Title (A-Z)</a>
	  <a class="dropdown-item" onClick="setSortConfig(2)" value="2">Title (Z-A)</a>
	  <a class="dropdown-item" onClick="setSortConfig(3)" value="3">Date (New to Old)</a>
	  <a class="dropdown-item" onClick="setSortConfig(4)" value="4">Date (Old to new)</a>
	</div>
	</div>
	`;
	jQuery(journal_manager_scope+"#top-bar").append(sortOptionHTML);
	jQuery(journal_manager_scope+"#top-bar #sort-dropdown .dropdown-item[value="+Database.conf.journalManager.sort+"]").addClass("active");
}


function createJournalView()
{
	let journals = Database.modules.journalManager.journals;
	if(journals.length == 0)
	{	let htmlCode = `<div class="alert alert-warning" role="alert">
			There are no journals saved in the locker
			</div>`;
		jQuery(journal_manager_scope+"#journals").html(htmlCode);
	}
	else
	{	
		jQuery(journal_manager_scope+"#journals").html("");
		applyConfigCreateJournalBlocks(journals);
		// for (var i = journals.length - 1; i >= 0; i--) {
		// 	addJournalBlock(journals[i]);
		// }
	}
}

function addJournalBlock(journal)
{	
	var htmlCode =`
		<div class="row journal-block" id="`+journal.id+`">
		<div class="col">
		<div class="title">`+journal.title+`</div>
		<div class="journal-details">
		<div>Date: <span class="date">`+displayJournalDate(journal.date)+`</span></div>
		</div>
		<div class="options"><span class="edit option" title="Edit"><i class="far fa-edit"></i></span><span class="delete option" title="Delete"><i class="fas fa-trash"></i></span></div>
		</div>
		</div>`;
	jQuery(journal_manager_scope+"#journals").append(htmlCode);
}

function openAddNewJournalForm()
{
	var htmlCode =`
	<form id="journal-editor-form" class="form add-journal">
		<div class="input-group form-group">
		<div class="input-group-prepend">
  		<span class="input-group-text">Title</span>
  		</div>
		<input type="text" name="title" class="form-control" value="Untitled">
		</div>
		<div class="input-group form-group">
		<div class="input-group-prepend">
  		<span class="input-group-text">Date</span>
  		</div>
		<input type="text" name="date" class="form-control datepicker">
		</div>
		<div id="journal-editor">
		</div>
		<button type="button" class="btn btn-success option save">Save</button>
		<button type="button" class="btn btn-info option cancel"">Cancel</button>
		</form>
	`;

  jQuery(journal_manager_scope+"#journal").html(htmlCode).show();
  jQuery(journal_manager_scope+"#journals").hide();


 quillObject = new Quill('#journal-editor', {
    theme: 'snow',
     modules: {
    toolbar: toolbarOptions
  }
  });

 //Adding custom link handler to quill
 quillObject.getModule('toolbar').addHandler('link', addlink); 

jQuery(journal_manager_scope+".datepicker").datepicker({
    format: "dd/mm/yyyy",
    clearBtn: true,
    keyboardNavigation: false,
    todayHighlight: true,
    weekStart:1,
    autoclose:true
});
jQuery(journal_manager_scope+".datepicker").datepicker("setDate",new Date());

// jQuery(journal_manager_scope+"#journal #journal-editor .ql-editor").html("</br></br></br></br></br></br>");
 updateJournalTopBarforJournalEditing();
 state.action = "create_journal";
 jQuery("div[contenteditable='true']").css("max-height",(jQuery("#view").height() - 275)+"px");

}

function editJournal(id)
{
	let journal = database_getJournalObject(id);
	if(journal)
	{

	let journal_html = decrypt_string(appPass, journal.journal_html);

	var htmlCode =`
	<form id="journal-editor-form" class="form edit-journal">
		<div class="input-group form-group">
		<div class="input-group-prepend">
  		<span class="input-group-text">Title</span>
  		</div>
  		<input type="hidden" name="id" class="form-control" value="`+id+`">
		<input type="text" name="title" class="form-control" value="`+journal.title+`">
		</div>
		<div class="input-group form-group">
		<div class="input-group-prepend">
  		<span class="input-group-text">Date</span>
  		</div>
		<input type="text" name="date" class="form-control datepicker" value="`+journal.date+`">
		</div>
		<div id="journal-editor">
		</div>
		<button type="button" class="btn btn-success option update">Save</button>
		<button type="button" class="btn btn-info option cancel"">Cancel</button>
		</form>
	`;

  jQuery(journal_manager_scope+"#journal").html(htmlCode).show();
  jQuery(journal_manager_scope+"#journal").attr("data-journal-id",journal.id);
  jQuery(journal_manager_scope+"#journals").hide();


 quillObject = new Quill('#journal-editor', {
    theme: 'snow',
     modules: {
    toolbar: toolbarOptions
  }
  });

//Adding custom link handler to quill
 quillObject.getModule('toolbar').addHandler('link', addlink); 

 jQuery(journal_manager_scope+".datepicker").datepicker({
    format: "dd/mm/yyyy",
    clearBtn: true,
    keyboardNavigation: false,
    todayHighlight: true,
    weekStart:1,
    autoclose:true
});

 jQuery(journal_manager_scope+"#journal #journal-editor .ql-editor").html(journal_html);
 updateJournalTopBarforJournalEditing();
 state.action = "edit_journal";
 state.data.id=id;
}

jQuery("div[contenteditable='true']").css("max-height",(jQuery("#view").height() - 275)+"px");


}


function saveJournal()
{		

	let title = jQuery(journal_manager_scope+"#journal-editor-form input[name=title]").val();
	let date = jQuery(journal_manager_scope+"#journal-editor-form input[name=date]").val();
	let journalHTML = jQuery(journal_manager_scope+"#journal-editor .ql-editor").html();
	let id = database_addJournal(date, title, journalHTML);
	closeJournalEditor();
	viewJournal(id);
}

function updateJournal()
{	
	let id=jQuery(journal_manager_scope+"#journal-editor-form input[name=id]").val();
	let title = jQuery(journal_manager_scope+"#journal-editor-form input[name=title]").val();
	let date = jQuery(journal_manager_scope+"#journal-editor-form input[name=date]").val();
	let journalHTML = jQuery(journal_manager_scope+"#journal-editor .ql-editor").html();

	let updated = database_updateJournal(id, date, title, journalHTML);
	if(updated)
	{
	closeJournalEditor();
	viewJournal(id);
	}
	else
	{
	message("Unable to update journal","danger");
	}
}

function closeJournalEditor()
{	jQuery(journal_manager_scope+"#journal").html("").hide();
	jQuery(journal_manager_scope+"#journals").show();
	loadState(state);
}

function viewJournal(id)
{	
	let journal = database_getJournalObject(id);
	if(journal)
	{
	let journal_html = `<div class="journal-viewer ql-container ql-editor"><div class="journal-title">`+journal.title+`</div>`+decrypt_string(appPass, journal.journal_html)+`</div>`;
	jQuery(journal_manager_scope+"#journal").html(journal_html).show();
	jQuery(journal_manager_scope+"#journal").attr("data-journal-id",journal.id);
	jQuery(journal_manager_scope+"#journals").hide();
	updateJournalTopBarforJournalViewing();
	let bottomHTML = `Journal date: `+displayJournalDate(journal.date);
	jQuery(journal_manager_scope+"#bottom-bar").html(bottomHTML);
	state.action = "view_journal";
	state.data.id=id;
	}

	
}



function updateJournalTopBarforJournalViewing()
{	
	let newHTML = `
	<div class="top-bar-block option toggle-menu" title="Toggle menu">
		<i class="fas fa-bars"></i>
	</div>
	<div class="back top-bar-block option" title="Back">
	<i class="fas fa-chevron-left"></i>
	</div>
	<div class="edit top-bar-block option" title="Edit">
	<i class="fas fa-edit"></i>
	</div>
	<div class="delete top-bar-block option" title="Delete">
	<i class="fas fa-trash"></i>
	</div>
	`;
	jQuery(journal_manager_scope+"#top-bar").html(newHTML);
}

function updateJournalTopBarforJournalEditing()
{	
	let newHTML = `
	<div class="top-bar-block option toggle-menu" title="Toggle menu">
		<i class="fas fa-bars"></i>
	</div>
	<div class="back top-bar-block option" title="Back">
	<i class="fas fa-chevron-left"></i>
	</div>
	<div class="save top-bar-block option" title="Save">
	<i class="fas fa-save"></i>
	</div>
	<div class="cancel top-bar-block option" title="Cancel">
	<i class="fas fa-times"></i>
	</div>
	<div class="delete top-bar-block option" title="Delete">
	<i class="fas fa-trash"></i>
	</div>
	`;
	jQuery(journal_manager_scope+"#top-bar").html(newHTML);
}

function deleteJournalConfirmDialog(id)
{

	let modalHTML = `
	Are you sure you want to delete this journal? Once deleted it cannot be recovered ever.
	<input type="hidden" name="delete-journal-id" value="`+id+`">`;
	let buttonHTML = `<button type="button" class="btn btn-danger" onClick="deleteJournal()">Delete</button>`;
	createModal("Confirm delete",modalHTML,buttonHTML);
	showModal();
}

function deleteJournal()
{
	let id = jQuery("input[name=delete-journal-id]").val().trim();
	database_deleteJournal(id);
	hideModal();
	initializeJournalManager();
	message("Journal deleted successfully", "success");
}


function searchJournals()
{
	let q=jQuery(journal_manager_scope+"#search input[name=search]").val().trim();

	if(q.length==0)
	{
		createJournalView();
	}
	else
	{
	let journals = Database.modules.journalManager.journals;
	let matchingJournal = journals.filter(function(e){
		return (e.title.toLowerCase().includes(q.toLowerCase()) || e.date.toLowerCase().includes(q.toLowerCase())) ;
	});
	createJournalSearchResultsView(matchingJournal);
	}
}

function createJournalSearchResultsView(journals)
{
	if(journals.length == 0)
	{	let htmlCode = `<div class="alert alert-danger" role="alert">
			There are no matching journal found.
			</div>`;
		jQuery(journal_manager_scope+"#journals").html(htmlCode);
	}
	else
	{	
		jQuery(journal_manager_scope+"#journals").html("");
		applyConfigCreateJournalBlocks(journals);
		// for (var i = journals.length - 1; i >= 0; i--) {
		// 	addJournalBlock(journals[i]);
		// }
	}
}



function applyConfigCreateJournalBlocks(journals)
{
	let p = JSON.parse(JSON.stringify(journals)); //To clone the passwords array

	if(Database.conf.journalManager.sort == 1)
	{
		p.sort( function compare(e1,e2){
		if(e1.title.toLowerCase() < e2.title.toLowerCase()) {return -1;}
		else if(e1.title.toLowerCase() > e2.title.toLowerCase()) {return 1;}
		else if (e1.title.toLowerCase() == e2.title.toLowerCase()) {return 0;}
		});
	}
	else if ( Database.conf.journalManager.sort == 2)
	{
		p.sort( function compare(e1,e2){
		if(e1.title.toLowerCase() < e2.title.toLowerCase()) {return 1;}
		else if(e1.title.toLowerCase() > e2.title.toLowerCase()) {return -1;}
		else if (e1.title.toLowerCase() == e2.title.toLowerCase()) {return 0;}
		});
	}
	else if (Database.conf.journalManager.sort == 3)
	{
		p.sort( function compare(e1,e2){
		if(getTime(e1.date) < getTime(e2.date)) {return 1;}
		else if(getTime(e1.date) > getTime(e2.date)) {return -1;}
		else if (getTime(e1.date) == getTime(e2.date)) {return 0;}
		});
	}
	else if (Database.conf.journalManager.sort == 4)
	{
		p.sort( function compare(e1,e2){
		if(getTime(e1.date) < getTime(e2.date)) {return -1;}
		else if(getTime(e1.date) > getTime(e2.date)) {return 1;}
		else if (getTime(e1.date) == getTime(e2.date)) {return 0;}
		});
	}


	for (var i =0; i<p.length; i++) {
			addJournalBlock(p[i]);
		}
}


/* Settings */
function initializeSettings()
{
	jQuery("#main").attr("data-page","settings");
	createTopBar();
	let viewHTML=`
	<div id="messages">
	</div>
	<div id="settings">
	</div>
	`;
	jQuery("#view").html(viewHTML);
	jQuery("#side-nav-bar .nav-item").removeClass("active");
	jQuery("#side-nav-bar div[data-target=settings]").addClass("active");
	state.action = "settings_home";
	state.data={};
	updateSettingsTopBar();
	createSettingsForm();
	jQuery(settings_scope+"#bottom-bar").html("Settings");
}


function updateSettingsTopBar()
{	
	let newHTML = `
	<div class="top-bar-block option toggle-menu" title="Toggle menu">
		<i class="fas fa-bars"></i>
	</div>
	`;
	jQuery(settings_scope+"#top-bar").html(newHTML);
}

function createSettingsForm()
{
	var settingsHTML = `
		<form id="settings-editor-form" class="form edit-settings">
		<div class="input-group form-group">
		<div class="input-group-prepend">
  		<span class="input-group-text">Username</span>
  		</div>
		<input type="text" name="setting-username" class="form-control">
		</div>
		<div class="input-group form-group">
		<div class="input-group-prepend">
  		<span class="input-group-text">Database name</span>
  		</div>
		<input type="text" name="setting-database-name" class="form-control">
		</div>
		<div class="input-group form-group">
		<div class="input-group-prepend">
  		<span class="input-group-text">Password</span>
  		</div>
		<input type="password" name="setting-database-password" class="form-control password">
		</div>
		<input type="checkbox" onclick="showpassword(this)"> <span style="margin-left:10px">Show password</span>

		<div style="margin-top:15px;">
		 <div class="input-group form-group">
  	 <label for="setting-tag-position" class="col-sm-3 col-form-label col">Tag position</label>
			<div class="col-sm-9 col">
			<select class="form-select form-control" id="setting-tag-position">
	  	<option value="0">Below the note</option>
	 		<option value="1">Top of the note</option>
			</select>
			</div>
			</div>

		<div class="input-group form-group row">
		
  	<label for="setting-multitag-filter" class="form-check-label col-sm-3 col-form-label col">Allow multiple tag filter</label>
  	<div class="col-sm-9 col">
		<input type="checkbox" name="setting-multitag-filter">
		</div>
			<label for="setting-multitag-filter-behaviour" class="col-sm-3 col-form-label col">Multitag filter behaviour</label>
			<div class="col-sm-9 col">
			<select class="form-select form-control" id="setting-multitag-filter-behaviour">
	  	<option value="0">OR</option>
	 		<option value="1">AND</option>
			</select>
			</div>
		</div>

		</div>
		</form>
		<button type="button" class="btn btn-info option edit">Edit settings</button>
	`;
	
	jQuery(settings_scope+"#settings").html(settingsHTML);
	restoreSettings();
	jQuery(settings_scope+"#settings input").prop('disabled',true);
	jQuery(settings_scope+"#settings select").prop('disabled',true);
}

function editSettings()
{	var extraHTML =`
		<button type="button" class="btn btn-success option save">Save</button>
		<button type="button" class="btn btn-info option restore">Restore</button>
		<button type="button" class="btn btn-danger option cancel"">Cancel</button>
		`;
	jQuery(settings_scope+"#settings").append(extraHTML);
	jQuery(settings_scope+"#settings .btn.edit").hide();
	jQuery(settings_scope+"#settings input").prop('disabled',false);
	jQuery(settings_scope+"#settings select").prop('disabled',false);

}


function saveSettings()
{
	Database.username=jQuery(settings_scope+"#settings input[name=setting-username]").val();
	Database.name=jQuery(settings_scope+"#settings input[name=setting-database-name]").val();
	let newPassword = jQuery(settings_scope+"#settings input[name=setting-database-password]").val();
	if(appPass != newPassword)
	{	
		changePassword(newPassword);
	}

	Database.conf.notesManager.tagsPosition = jQuery(settings_scope+"#setting-tag-position").val();
	Database.conf.notesManager.multitagFilter = jQuery(settings_scope+"#settings input[name=setting-multitag-filter]").prop('checked');
	Database.conf.notesManager.multitagFilterBehaviour = jQuery(settings_scope+"#setting-multitag-filter-behaviour").val();

	initializeSettings();
	message("Settings saved successfully.","success");
}


function restoreSettings()
{
	jQuery(settings_scope+"#settings input[name=setting-username]").val(Database.username);
	jQuery(settings_scope+"#settings input[name=setting-database-name]").val(Database.name);
	jQuery(settings_scope+"#settings input[name=setting-database-password]").val(appPass);
	jQuery(settings_scope+"#setting-tag-position").val(Database.conf.notesManager.tagsPosition);
	jQuery(settings_scope+"#setting-multitag-filter-behaviour").val(Database.conf.notesManager.multitagFilterBehaviour);

	if(Database.conf.notesManager.multitagFilter)
	{
		jQuery(settings_scope+"#settings input[name=setting-multitag-filter]").prop('checked', true);
	}
	else
	{
		jQuery(settings_scope+"#settings input[name=setting-multitag-filter]").prop('checked', false);	
	}

}

function cancelSettings()
{
	initializeSettings();
}


function changePassword(newPassword)
{	console.log("Changing password");
	//Changing passwords
	let passwords = Database.modules.passwordManager.passwords;

	for (var i = passwords.length - 1; i >= 0; i--) {
		passwords[i].password = encrypt_string(newPassword, decrypt_string(appPass, passwords[i].password));
	}

	let notes = Database.modules.notesManager.notes;

	for (var i = notes.length - 1; i >= 0; i--) {
		notes[i].note_html = encrypt_string(newPassword, decrypt_string(appPass, notes[i].note_html));
	}
	let journals = Database.modules.journalManager.journals;
	for (var i = journals.length - 1; i >= 0; i--) {
		journals[i].journal_html = encrypt_string(newPassword, decrypt_string(appPass, journals[i].journal_html));
	}

	appPass = newPassword;
}


/** Functions for dashboard */

function initializeDashboard()
{
	jQuery("#main").attr("data-page","dashboard");
	createTopBar();
	jQuery(dashboard_scope+"#bottom-bar").html("Dashboard (Locker v"+Database.version+")");
	var viewHTML = `
	<div class="alert alert-success" role="alert">
	You have <span class="count">`+Database.modules.passwordManager.passwords.length+` passwords saved.
	</span>
	</div>
	<div class="alert alert-success" role="alert">
	You have <span class="count">`+Database.modules.notesManager.notes.length+` notes saved.
	</span>
	</div>
	<div class="alert alert-success" role="alert">
	You have <span class="count">`+Database.modules.journalManager.journals.length+` journals saved.
	</span>
	</div>`;
	jQuery(dashboard_scope+"#top-bar").html(`
		<div class="top-bar-block option toggle-menu" title="Toggle menu">
		<i class="fas fa-bars"></i>
		</div>
		<div style='line-height:0.8em;padding:calc(20px - 0.5em) 20px;'>Welcome `+Database.username+"</div>");
	jQuery(dashboard_scope+"#view").html(viewHTML);
	jQuery("#side-nav-bar .nav-item").removeClass("active");
	jQuery("#side-nav-bar div[data-target=dashboard]").addClass("active");

}


function getTime(dateString)
{
	var dateParts = dateString.split("/");
// month is 0-based, that's why we need dataParts[1] - 1
var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
return dateObject.getTime();
}


function showpassword(e)
{	
	var x = jQuery(e).closest(".form").find(".password")[0];

  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


//Tag manager functions

function getTags(id)
{
	let tags = [];
	let note = Database.modules.notesManager.tags.filter(function(e){return e.id==id;});
	if(note.length==1)
	{
		tags = note[0].tags;
	}
	return tags.sort();
}

function updateTags(tag_string, id){
	console.log("Updating tags for "+id+" - "+tag_string);
	tag_string =tag_string.toLowerCase().trim();
	tag_string = tag_string.replace(/\s\s+/g, ' '); // To remove multiple white spaces

	if(tag_string.length==0){return false;}

	let tags=tag_string.split(" ").sort();
	if(tags.length>0)
	{
	let note = Database.modules.notesManager.tags.filter(function(e){return e.id == id;});
	if(note.length==1)
	{
		note[0].tags = tags;
	}
	else
	{ console.log("No previous tags found");
		let t = new tag();
		t.id = id;
		t.tags=tags;
		Database.modules.notesManager.tags.push(t);
	}
	}
}

function getUniqueTags(){
	let tags=[];
	let t = Database.modules.notesManager.tags;
	for (var i = 0; i < t.length; i++) {
		for (var j = 0; j < t[i].tags.length; j++) {
			if(!tags.includes(t[i].tags[j]))
			{
				tags.push(t[i].tags[j]);
			}
		}
	}
	return tags.sort();
}


function filterNotes(tags)
{
	return Database.modules.notesManager.notes.filter(function(e){

		let note_tags = getTags(e.id);

		let common = tags.filter(function(a){
		return note_tags.includes(a);
		});

		if(Database.conf.notesManager.multitagFilter && (Database.conf.notesManager.multitagFilterBehaviour == 1))
		{
			if(common.length == tags.length) { return true; }
			else	{	return false;	}
		}
		else
		{
			if(common.length > 0) { return true; }
			else	{	return false;	}
		}
		

	});
}

function getTagViewHTML(tags)
{
	let html = `
	`;
	for (var i = 0; i < tags.length; i++) {
		html+=`<span class="tag" data="`+tags[i]+`">`+tags[i]+`</span>`;
	}

	return html;
}


/* Links for quill module */

/*Custom link function for quill notes*/
function addlink()
{
	console.log("Link clicked");

	selection = quillObject.getSelection(); 


	let modalHTML = `
	<div class="form" id="addlinkForm">
	<input type="text" name="link" class="form-control">
	<label for="linkText" style="margin-top:10px">Link text (optional)</label>
	<input type="text" name="linkText" class="form-control">
	<div class="linkDropdown">
	</div>
	</div>

	`;

	let buttonHTML = `
	<button type="button" class="btn btn-success" onClick="addlinkToEditor()">Enter</button>
	`;

	createModal("Link",modalHTML, buttonHTML);
	showModal();
	jQuery("#addlinkForm input[name=link]").focus();
}

function addlinkToEditor() {
		let link = jQuery("#addlinkForm input[name=link]").val().trim(); 
		let linkText = jQuery("#addlinkForm input[name=linkText]").val().trim(); 
    let selectionText= quillObject.getText(selection.index, selection.length).trim();
    
    if(selectionText.length == 0)
			{
				 if(linkText.length == 0)
					{
						linkText = link;
					}				
			}
			else
			{
				linkText = selectionText;
			}


		console.log(link+"-"+linkText);
		quillObject.deleteText(selection.index, selectionText.length);
		quillObject.insertText(selection.index, linkText, 'link', link);
		console.log(link);
		hideModal();
}

function internalLinkSuggestions(){
	let q= jQuery("#addlinkForm input[name=link]").val().trim();
	let matchingNotes = Database.modules.notesManager.notes.filter(function(e){
		return e.title.toLowerCase().includes(q.toLowerCase());
	});
	matchingNotes.sort();
	jQuery("#addlinkForm .linkDropdown").html("");

	for (var i = 0; i < matchingNotes.length; i++) {
		let t = `<a class="linkSuggestion" data="https://note/`+matchingNotes[i].id+`" onClick=selectInternalLink(this)>`+matchingNotes[i].title+`</a>
		`;
		jQuery("#addlinkForm .linkDropdown").append(t);
	}

}

function selectInternalLink(e)
{
	jQuery("#addlinkForm input[name=link]").val(jQuery(e).attr("data"));
	jQuery("#addlinkForm input[name=linkText]").val(jQuery(e).html());
}

function goToInternalLink(link)
{
	if(state.page!="notes_manager")
	{
		initializeNotesManager();
	}
	
	id= link;
	id=id.replace("https://note/","");
	viewNote(id);
	console.log("Internal link clicked");
}

function colorSelector(color)
{
	jQuery(".color-selector").attr("value", color);
	jQuery(".color-selector").css("background-color",note_colors[color]);
	jQuery(".color-selector, .ql-toolbar, #note-editor").css("border-color",border_colors[color]);
	console.log(note_colors[color]);
	jQuery(".ql-editor").css("background-color",note_colors[color]);
	jQuery(".color-picker").hide();
}

function openColorSelector()
{	
	jQuery(".color-picker").toggle();

}