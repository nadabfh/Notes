import StorageManager from './storageManager.js';

/**
 * @typedef {import('./utils.js').Note} Note
 */

export default class NoteEditor {
  /**
   * TODO : configurer l'attribut de la classe
   * @param {StorageManager} storageManager gestionnaire du LocalStorage
   */
  constructor(storageManager) {
    this.storageManager = storageManager;
  }

  /**
   * Récupère l'attribut "id" à partir de l'URL de la page
   * @returns {string | null} l'identifiant de la note
   */
  getNoteIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }

  /**
   * TODO : Affiche les informations de la note en générant le HTML nécessaire.
   * Si l'id dans l'URL est invalide, affiche "La note demandée n'existe pas."
   * La note est récupéré du LocalStorage
   */
  displayNoteDetails() {
    const noteId = this.getNoteIdFromURL();
    const note = this.storageManager.getNoteById(noteId);
    let noteContent = document.getElementById("note-content");

    if(note !== undefined){
      const title = document.createElement("h2");
      const date = document.createElement("p");

      const tagsContainer = document.createElement('div');
      const tagsTitle = document.createElement('p');
      const tagsValue = document.createElement('p');

      tagsValue.setAttribute("contenteditable", "true");

      const colorContainer = document.createElement('div');
      const colorTitle = document.createElement('p');
      const colorValue = document.createElement('p');
      
      const colorPicker = document.createElement('input');
      colorPicker.setAttribute('type', 'color');
      colorPicker.value = note.color;
      colorPicker.style.display = 'none';
      colorContainer.appendChild(colorPicker);
      
      colorValue.addEventListener('click', function() {
        colorPicker.click();
      });

      colorPicker.addEventListener('input', function() {
        const newColor = colorPicker.value;
        colorValue.style.backgroundColor = newColor;
        colorValue.innerHTML = newColor;
      });

      const pinned = document.createElement("p");
      pinned.setAttribute("id", "notePinnedStatus");

      const noteDetailsContainer = document.createElement('div');
      const contentTitle = document.createElement("p");
      const content = document.createElement("textarea");

      title.innerHTML = note.title;
      let dateWithoutTime = note.lastEdit.toString().split('T')[0];
      date.innerHTML = "Date de la dernière modification: " + dateWithoutTime;

      tagsContainer.style.display = 'flex';
      tagsTitle.innerHTML = "Tags :";
      tagsContainer.appendChild(tagsTitle);

      if (Array.isArray(note.tags)) {
          tagsValue.innerHTML = note.tags.join(', ');
      } else {
        tagsValue.innerHTML = note.tags.toString();
      }

      tagsContainer.appendChild(tagsValue);
      tagsValue.setAttribute("id", "tags");

      colorContainer.style.display = 'flex';
      colorTitle.innerHTML = "Couleur : ";
      colorContainer.appendChild(colorTitle);
      colorValue.innerHTML = note.color;
      colorValue.style.backgroundColor = note.color;
      colorContainer.appendChild(colorValue);


      const isNotePinned = note.pinned ? 'Oui' : 'Non';
      pinned.innerHTML = "Épinglée : " + isNotePinned;

      noteDetailsContainer.style.display= 'inline-grid';
      contentTitle.innerHTML = "Contenu :";
      noteDetailsContainer.appendChild(contentTitle);
      content.innerHTML = note.content;
      noteDetailsContainer.appendChild(content);
      content.setAttribute("id", "noteContent");

      noteContent.appendChild(title);
      noteContent.appendChild(date);
      noteContent.appendChild(tagsContainer);
      noteContent.appendChild(colorContainer);
      noteContent.appendChild(pinned);
      noteContent.appendChild(noteDetailsContainer);
    }
    else{
      const notFoundMessage = document.createElement('p');
      notFoundMessage.innerHTML = "La note demandée n'existe pas.";
      noteContent.appendChild(notFoundMessage);
    }
  }

  /**
   * TODO : Modifie l'état épinglé de la note et la sauvegarde.
   * Modifie l'affichage de l'état épingé dans la page.
   */
  pin() {
    const noteId = this.getNoteIdFromURL();
    const note = this.storageManager.getNoteById(noteId);

    note.pinned = !note.pinned;
    this.storageManager.pinById(noteId);

    const pinnedElement = document.getElementById("notePinnedStatus");
    const isNotePinned = note.pinned ? 'Oui' : 'Non';
    pinnedElement.innerHTML = "Épinglée : " + isNotePinned;
  }

  /**
   * TODO : Affiche une modale de confirmation.
   * Supprime la note si l'utilisateur confirme et redirige vers la page principale.
   */
  delete() {
    const self = this;
    const noteId = this.getNoteIdFromURL();
    function showConfirmationModal(message, callback) {
      const modal = document.createElement('div');
      modal.classList.add('modal');
  
      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');
  
      const messageElement = document.createElement('p');
      messageElement.textContent = message;
  
      const confirmButton = document.createElement('button');
      confirmButton.textContent = 'Confirmer';
      confirmButton.addEventListener('click', () => {
          callback(true); 
          confirmButton.href = "./index.html"
          modal.remove();
      });
  
      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Annuler';
      cancelButton.addEventListener('click', () => {
          callback(false);
          modal.remove();
      });
  
      modalContent.appendChild(messageElement);
      modalContent.appendChild(confirmButton);
      modalContent.appendChild(cancelButton);
      modal.appendChild(modalContent);
  
      document.body.appendChild(modal);
  }
  
  showConfirmationModal('Êtes-vous sûr de vouloir supprimer cette note ?', (confirmed) => {
      if (confirmed) {
          self.storageManager.deleteNoteById(noteId);
          window.location.href = "./index.html";
      }
  });
  }
}

/**
 * TODO : Ajoute un gestionnaire de click sur le bouton de sauvegarde.
 * Gère la modification de la note en fonction des éléments HTML modifiés dans la page.
 * @param {NoteEditor} noteEditor gestionnaire d'édition de la note
 * @param {StorageManager} storageManager gestionnaire du LocalStorage
 */
function saveChangesByIdListener(noteEditor, storageManager) {
  const noteId = noteEditor.getNoteIdFromURL();
  const saveButton = document.getElementById('save-button');

  saveButton.addEventListener("click", function() {
      const contentElement = document.getElementById('noteContent');
      const content = contentElement.value;

      const tagElement = document.getElementById('tags');
      const tag = tagElement.textContent;
      let tagsArray = tag.split(',');
      tagsArray = tagsArray
          .map(tag => tag.trim())
          .filter(tag => tag !== "");
      const formattedTags = tagsArray.join(', ');

      const selectedColor = document.querySelector('input[type="color"]').value;
      storageManager.modifyNoteById(noteId, content, formattedTags);
      storageManager.changeColorById(noteId, selectedColor);
  });
}
/**
 * TODO : Ajoute un gestionnaire pour les événements de clavier pour les raccourcis "P" et "Delete".
 * Les raccourcis sont ignorés si les étiquettes ou le contenu ont le focus de la page.
 * @param {NoteEditor} noteEditor gestionnaire d'édition de la note
 */
function addKeyBoardEvents(noteEditor) {
  document.addEventListener("keydown", function(event){
      const isEditableElement = event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || 
                                event.target.isContentEditable;

      if(isEditableElement) {
        return;
      }

      if(event.key == "p"){
        noteEditor.pin();
      }
      if(event.key == "Delete"){
        noteEditor.delete();
      }
  });
}

window.onload = () => {
  const storageManager = new StorageManager();
  const noteEditor = new NoteEditor(storageManager);

  noteEditor.displayNoteDetails();

  saveChangesByIdListener(noteEditor, storageManager);
  addKeyBoardEvents(noteEditor);
}