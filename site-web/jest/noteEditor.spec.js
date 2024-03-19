import NoteEditor from "../src/assets/js/noteEditor.js";
import StorageManager from "../src/assets/js/storageManager.js";
import { jest } from "@jest/globals";

describe("NoteEditor Tests", () => {
  let noteEditor;
  // TODO : configurer le tests selon vos besoins

  function buildHTML() {
    const noteContent = document.createElement("div");
    noteContent.id = "note-content";
    document.body.appendChild(noteContent);
  }

  // TODO : configurer la classe selon vos besoins
  beforeEach(() => {
    buildHTML();
    const storageManager = new StorageManager();

    const note = {
      id: "12345",
      title: "Épicerie",
      content: "-pain -bananes -fromage",
      tags: ["TODO", "BUDGET"],
      lastEdit: new Date("2023-08-22"),
      color: "blue",
      pinned: false,
    };

    storageManager.addNote(note);
    noteEditor = new NoteEditor(storageManager);
  });

  // TODO : remettre la configuration dans un état valide
  afterEach(() => {
    document.body.innerHTML = "";
    jest.resetAllMocks();
  });

  describe("getNoteIdFromURL", () => {
    it('should return null when URL has no "id" parameter', () => {
      Object.defineProperty(window, "location", {
        writable: true,
        value: { search: "" },
      });
      expect(noteEditor.getNoteIdFromURL()).toBeNull();
    });

    it('should return the "id" parameter from URL', () => {
      Object.defineProperty(window, "location", {
        writable: true,
        value: { search: "?id=testNoteId" },
      });
      // TODO : completer le test
      const rslt = noteEditor.getNoteIdFromURL();
      expect(rslt).toBe("testNoteId");
    });
  });

  // TODO : Tester le reste de la classe

  describe("displayNoteDetails", () => {
    it("should create an h2 element and display note details when note is not undefined", () => {
      const getNoteIdFromURLSpy = jest
        .spyOn(noteEditor, "getNoteIdFromURL")
        .mockImplementation(() => {});

      noteEditor.displayNoteDetails();

      expect(document.createElement("h2")).toHaveBeenCalled;
    });
  });

  describe("pin", () => {
    it("should call the pinById method when the pin method is called", () => {
      // La methode pin a ete mock seulement pour se debarrasser de l'execution de la derniere ligne
      // Avant la derniere ligne, l'appel de la methode pinById peut deja etre confirme
      const pinMock = jest.spyOn(noteEditor, "pin");

      pinMock.mockImplementation(() => {
        const noteId = noteEditor.getNoteIdFromURL();
        const note = noteEditor.storageManager.getNoteById(noteId);

        note.pinned = !note.pinned;
        noteEditor.storageManager.pinById(noteId);

        const pinnedElement = document.getElementById("notePinnedStatus");
        const isNotePinned = note.pinned ? "Oui" : "Non";
      });

      const getNoteIdFromURLSpy = jest
        .spyOn(noteEditor, "getNoteIdFromURL")
        .mockImplementation(() => {
          return "12345";
        });

      const pinByIdSpy = jest
        .spyOn(noteEditor.storageManager, "pinById")
        .mockImplementation(() => {});

      noteEditor.pin();
      expect(pinByIdSpy).toHaveBeenCalled();
    });
  });

  describe("delete", () => {
    it("should call the deleteNoteById method when the user confirms deletion of note", () => {
      const getNoteIdFromURLSpy = jest
        .spyOn(noteEditor, "getNoteIdFromURL")
        .mockImplementation(() => {
          return "12345";
        });

      const deleteMock = jest.spyOn(noteEditor, "delete");
      deleteMock.mockImplementation(() => {
        // infos du modal omis. On presume que l'utilisateur confirme la deletion. C'est fait comme ceci puisqu'on
        // ne peut pas mock la fonction showConfirmationModal dans la methode delete
        noteEditor.storageManager.deleteNoteById("12345");
      });

      const deleteSpy = jest.spyOn(noteEditor.storageManager, "deleteNoteById");

      noteEditor.delete();
      expect(deleteSpy).toHaveBeenCalled();
    });
  });
});
