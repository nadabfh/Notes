import { createNoteObject, sort } from './utils.js';

/**
 * @typedef {import('./utils.js').Note} Note
 */

export default class MainPageEventsController {
  constructor(noteLibrary) {
    this.noteLibrary = noteLibrary;
  }

  /**
   * TODO : Ouvre la modale du formulaire de création
   */
  openModalListener() {

    const createNoteButton = document.getElementById('createNoteButton');

    const dialog = document.getElementById("createNoteModal");

    createNoteButton.addEventListener('click', () => {
      dialog.showModal();
    })

  }

  /**
   * TODO : Ferme la modale du formulaire de création
   */
  closeModalListener() {

    const closeNoteButton = document.getElementById('closeModal');

    const dialog = document.getElementById("createNoteModal");

    closeNoteButton.addEventListener('click', () => {   
      dialog.close();
    })
  }

  /**
   * TODO : Gère l'événement de la soumission du formulaire.
   * Sauvegarde la nouvelle note et met à jour le rendu de la page
   */
  submitListener() {
    
    const currentObj = this;
    const noteForm = document.getElementById('noteForm');
    const submitButton = noteForm.querySelector('button[type="submit"]');
    const dialog = document.getElementById("createNoteModal");

    submitButton.addEventListener("click", function() {
      const newNote = currentObj.getNoteDetailsFromModal();

      const sortOrderDropDown = document.getElementById("sort-order");
      const selectedValue = sortOrderDropDown.value;
      const listElement = selectedValue === 'newest' ? currentObj.noteLibrary.pinnedNoteList : currentObj.noteLibrary.noteList;

      if (!listElement) {
        console.error("listElement is null or undefined!");
        return;
     }
     
      currentObj.noteLibrary.addNoteToList(newNote, listElement);

      dialog.close();
    });
  }

  /**
   * TODO : Récupère les informations du formulaire et génère un objet Note
   * @returns {Note} la note définie dans le formulaire
   */
  getNoteDetailsFromModal() {
    const inputTitle = document.getElementById("noteTitle").value;
    const inputContent = document.getElementById("noteContent").value;
    const inputTags = document.getElementById("noteTags").value;
    const inputColor = document.getElementById("noteColor").value;
    const inputPinState = document.getElementById("notePinned").checked;

    //verification tag
    var tagsArray = inputTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    const formattedTags = tagsArray.join(', ');

    if (inputTitle.trim() === "" || inputContent.trim() === "") {
      return -1;
    }

    return createNoteObject(inputTitle, inputContent, formattedTags, inputColor, inputPinState);
  }

  /**
   * TODO : Trie les notes dans la page en fonction de l'option choisie dans le menu déroulant
   */
  sortListener() {
    const currentObject = this;
    var sortOrderDropDown = document.getElementById("sort-order");

    sortOrderDropDown.addEventListener("change", function(){
      const selectedValue = this.value;
      currentObject.noteLibrary.ascendingValueComparer = selectedValue;
      let notes = currentObject.noteLibrary.storageManager.getNotes();
      sort(notes, selectedValue); 
  
      currentObject.noteLibrary.updateListsInterface(notes);
    });
  }

  /**
   * TODO : Gère l'événement de click pour la suppression de toutes les notes
   */
  deleteAllListener() {
    const deletteButton = document.getElementById("delete-all-button");
    const currentObject = this;
    deletteButton.addEventListener("click", function(){
      currentObject.noteLibrary.deleteAll();
    });
  }

  /**
   * TODO : Gère les événements de clavier pour les raccourcis "P" et "Delete"
   * Les événements sont ignorés s'il n'y a pas de note sélectionnée
   */
  addKeyBoardEvents() {
    const currentObj = this;
      document.addEventListener("keydown", function(event){
        if(event.key == "p"){
          currentObj.noteLibrary.pinNote(currentObj.noteLibrary.selectedNote.id);
        }
        if(event.key == "Delete"){
          currentObj.noteLibrary.deleteNote(currentObj.noteLibrary.selectedNote.id);
        }
      });
  }

  /**
   * TODO : Configure la gestion de la modale et formulaire de création
   */
  manageModal() {
    this.openModalListener();
    this.submitListener();
    this.closeModalListener();
  }

  listenToAllEvents() {
    this.manageModal();
    this.addKeyBoardEvents();
    this.deleteAllListener();
    this.sortListener();
  }
}