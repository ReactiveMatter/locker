# Locker
This is an offline html app to save your passwords, personal notes and journals.

[Run this app on github](https://reactivematter.github.io/locker/locker.html)

## Modules
* Password manager
* Notes manager - Save any information
* Journal manager -  Structured notes for journals

## Features
* Works offline
* Single page html app - easy to store
* AES-128 encryption ([based on SJCL library](https://bitwiseshiftleft.github.io/sjcl/))
* Easy export and import
* [Quill visual editor](https://quilljs.com/)

## Futher development
I developed this app for personal use. Currently it serving my needs fully, hence I do not intend to develop it further. If you like the concept and want to develop it further, you are welcome to fork it.

**Change log**
* Version 7.2 (22.10.2023)
  * Added custom note:// urls for internal links
* Version 7.1 (12.10.2023)
  * Minor UI changes for mobile
* Version 7 (27.05.2023)
  * Journal content can be seen in the list of journal entries.
  * Added config option to remember this setting
* Version 6
  * Made UI changes and refactored password display code to make it faster
  * Journal can be searched with human readable date and UI is improved
* Version 5
  * Added more colors for notes and refactored colors code
* Version 4
  * Added visited notes trace bar
  * Added favorite page feature
  * Added search box in the top bar in notes
* Version 3: Introduced note colors
* Version 2: 
  * Introduced tags to organise notes
  * Notes can be linked together


**Things that are not available**
* Full content search for notes (currently only titles are searched)
