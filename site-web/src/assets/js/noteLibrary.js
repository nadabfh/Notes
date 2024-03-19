
/**
 * @typedef {import('./utils.js').Note} Note
 */

import { sort, removeAllChildren} from './utils.js';

export default class NoteLibrary {
  noteList = document.getElementById('notes');
  pinnedNoteList = document.getElementById('pinned-notes');
  ascendingValueComparer = 'newest';
  selectedNote = null;

  constructor(storageManager) {
    this.storageManager = storageManager;
  }
  
  /**
   * TODO : Génère le code HTML pour une note à afficher à l'écran.
   * Ajoute les gestionnaires de click pour les icônes d'épingle, suppression et détails.
   * Ajoute un gestionnaire de click global sur l'élément pour sélectionner/désélectionner la note
   * @param {Note} note note à afficher
   * @returns {HTMLDivElement} élément div parent de l'affichage pour la note
   */
  createHTMLNote(note) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');

    noteDiv.setAttribute("data-id", note.id.toString());
    noteDiv.setAttribute("style", "background-color: " + note.color);

    const pinnedDiv = document.createElement('div');
    pinnedDiv.setAttribute("id", "pinned-icon-spaces");

    const noteTitle = document.createElement('h2');
    noteTitle.innerHTML = note.title;
    pinnedDiv.appendChild(noteTitle);

    let self = this;
    noteDiv.addEventListener("mouseenter", function() {
        const icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-paperclip pin hidden");
        icon.setAttribute("style", "color: white;");
        pinnedDiv.appendChild(icon);

        icon.addEventListener('click', function(event) {
            event.stopPropagation();
            self.pinNote(note.id);
        });
    });

    noteDiv.addEventListener("mouseleave", function() {
        const icon = pinnedDiv.querySelector(".fa-paperclip");
        if (icon) {
            icon.remove();
        }
    });

    noteDiv.appendChild(pinnedDiv);

    const pTags = document.createElement('p');
    let tags = "Tags: " + note.tags.toString();
    pTags.innerHTML = tags;
    noteDiv.appendChild(pTags);

    const modDate = document.createElement('p');
    modDate.setAttribute("class", "date");
    let dateWithoutTime = note.lastEdit.toString().split('T')[0];
    modDate.innerHTML = "Dernière modification: " + dateWithoutTime;
    noteDiv.appendChild(modDate);

    let selectedNoteDiv = null;

    noteDiv.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-button') || event.target.classList.contains('details-button')) {
            return;
        }

        if (selectedNoteDiv !== null) {
            const deleteIcon = selectedNoteDiv.querySelector('.fa-trash-o');
            const detailsIcon = selectedNoteDiv.querySelector('.fa-info');
            if (deleteIcon) {
                deleteIcon.remove();
            }
            if (detailsIcon) {
                detailsIcon.remove();
            }
        }

        if (selectedNoteDiv === this) {
            selectedNoteDiv = null;
            self.selectedNote = null;
            return;
        }

        self.selectedNote = note;

        const deleteIcon = document.createElement('i');
        deleteIcon.setAttribute("class", "delete-button fa fa-trash-o");
        this.appendChild(deleteIcon);

        deleteIcon.addEventListener('click', function(event) {
            event.stopPropagation();
            self.deleteNote(note.id);
        });

        const detailsButtonIcon = document.createElement('i');
        detailsButtonIcon.setAttribute("class", "details-button fa fa-info");

        const detailsLink = document.createElement('a'); 
        detailsLink.href = "./detail.html?id=" + note.id;
        detailsLink.appendChild(detailsButtonIcon);
        this.appendChild(detailsLink);

        selectedNoteDiv = this;
    });
    return noteDiv;
}

  /**
   * Ajoute ou retire la classe 'hidden' aux éléments
   * @param {{deleteIcon: HTMLElement, detailsIcon: HTMLElement}} noteNodeElements contient les icônes de suppression et détails
   *
  */
  selectNote(noteNodeElements) {
    noteNodeElements.deleteIcon.classList.toggle('hidden');
    noteNodeElements.detailsIcon.classList.toggle('hidden');
  }

  /**
   * TODO : Génère le HTML pour toutes les notes dans les 2 listes en fonction de l'attribut "pinned" de chaque note.
   * TODO : Vous NE POUVEZ PAS utiliser une boucle for() classique pour cette fonction
   * @param {Array<Note>} notes notes à afficher dans la page
   */
  generateHTMLNotes(notes) {
    if (notes && Array.isArray(notes)) {
      notes.forEach((note) => {
        if (note.pinned == true) {
          this.pinnedNoteList.appendChild(this.createHTMLNote(note));
        } else {
          this.noteList.appendChild(this.createHTMLNote(note));
        }
      });
    }
  }

  /**
   * TODO : Met à jour les listes des notes affichées dans la page
   * @param {Array<Note>} notes notes à afficher dans la page
   */
  updateListsInterface(notes) {

    removeAllChildren(this.noteList);
    removeAllChildren(this.pinnedNoteList);
    
    this.generateHTMLNotes(notes);
  }

  /**
   * TODO : Ajoute une note à une des listes.
   * La note est ajoutée au début ou à la fin de la liste en fonction de l'option de tri choisie dans la page
   * @param {Note} note note à ajouter
   * @param {HTMLElement} listElement liste (Notes Épinglées ou Notes) à modifier
   */
  addNoteToList(note, listElement) {
    this.storageManager.addNote(note);
    const noteElement = this.createHTMLNote(note);
    const isSortedByNewest = this.ascendingValueComparer === 'newest';

    if (isSortedByNewest) {
      listElement.insertBefore(noteElement, listElement.firstChild);
    } else {
      listElement.appendChild(noteElement);
    }

    this.updateListsInterface(this.storageManager.getNotes());
  }
  /**
   * TODO : Supprime une note en fonction de son ID et met à jour la vue
   * @param {string} id identifiant de la note
   */
  deleteNote(id) {
    this.storageManager.deleteNoteById(id);
    this.updateListsInterface(this.storageManager.getNotes());
  }

  /**
   * TODO : Modifie l'état épinglé de la note en fonction de son ID et met à jour la vue
   * @param {string} id identifiant de la note
   */
  pinNote(id) {
    this.storageManager.pinById(id);
    this.updateListsInterface(this.storageManager.getNotes());
  }

  /**
   * TODO : Supprime toutes les notes du site et met à jour la vue
   */
  deleteAll() {
    this.storageManager.deleteAllNotes();
    this.updateListsInterface(this.storageManager.getNotes());
  }
}
