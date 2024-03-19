import notes from "./defaultData.js";

/**
 * @typedef {import('./utils.js').Note} Note
 */

export default class StorageManager {
  STORAGE_KEY_NOTES = "notes";

  /**
   * Fonction utilitaire pour remplir le storage avec des valeurs par défauts
   * NOTE : CECI EST FOURNI POUR VOUS AIDER AVEC LE CODE DE DÉPART
   * CETTE FONCTION NE DOIT PAS ÊTRE APPELÉE À LA REMISE FINALE
   */
  populate() {
    if (!this.getNotes() || this.getNotes().length === 0) {
      localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(notes)); // On a tjr une clef pour toutes les notes
    }
  }

  /**
   * TODO : Récupère toutes les notes du Storage ou un tableau vide
   * @returns {Array<Note>} les notes du storage
   */
  getNotes() {
    const notes = JSON.parse(localStorage.getItem(this.STORAGE_KEY_NOTES));
    return notes ? notes : [];
  }

  /**
   * TODO : Récupère une note en fonction de son ID
   * @param {string} id identifiant de la note
   * @returns {Note | undefined} la note si trouvée
   */
  getNoteById(id) {
    const note = this.getNotes().find((note) => note.id === id);
    return note !== undefined ? note : undefined;
  }

  /**
   * TODO : Ajoute des notes au storage
   * @param {Array<Note>} notesArray tableau de notes à ajouter
   */
  setNotes(notesArray) {
    let notesTemp = this.getNotes();

    for (let i = 0; i < notesArray.length; i++) {
      notesTemp.push(notesArray[i]);
    }
    localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(notesTemp));
  }

  /**
   * Remplaces les items du storage par notesArray
   * @param {Array<Note>} notesArray tableau de notes à mettre
   */
  addNotes(notesArray) {
    localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(notesArray));
  }

  /**
   * Ajoute une nouvelle note au Storage
   * @param {Note} note note à ajouter
   */
  addNote(note) {
    const notes = this.getNotes() || [];
    notes.push(note);
    localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(notes));
  }

  /**
   * TODO : Supprime une note en fonction de son ID
   * @param {string} id identifiant de la note
   */
  deleteNoteById(id) {
    const notes = this.getNotes();
    const updatedNotes = notes.filter((note) => note.id !== id);

    if (updatedNotes.length !== notes.length) {
      localStorage.setItem(
        this.STORAGE_KEY_NOTES,
        JSON.stringify(updatedNotes)
      );
    }
  }

  /**
   * TODO : Supprime toutes les notes du storage
   */
  deleteAllNotes() {
    localStorage.clear();
  }

  /**
   * TODO : Modifie une note en fonction de son ID
   * @param {string} id identifiant de la note
   * @param {string} content contenu de la note
   * @param {string[]} tags étiquettes de la note
   */
  modifyNoteById(id, content, tags) {
    let notes = this.getNotes();
    let foundNote = notes.find((note) => note.id === id);

    if (foundNote) {
      foundNote.content = content;
      foundNote.tags = tags;
      foundNote.lastEdit = new Date();

      localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(notes));
    }
  }

  changeColorById(id, color) {
    let notes = this.getNotes();
    let foundNote = notes.find((note) => note.id === id);

    if (foundNote) {
      foundNote.color = color;
      foundNote.lastEdit = new Date();

      localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(notes));
    }
  }
  /**
   * TODO : Modifie l'état épinglé de la note en fonction de son ID
   * @param {string} id identifiant de la note
   */
  pinById(id) {
    let notes = this.getNotes();
    let foundNote = notes.find((note) => note.id === id);

    if (foundNote) {
      foundNote.pinned = !foundNote.pinned;
      localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(notes));
    }
  }
}
