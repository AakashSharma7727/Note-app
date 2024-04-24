"use strict";
const btnAdd = document.querySelector(".btn_add");
const notes = JSON.parse(localStorage.getItem("notes")) || [];

if (notes) {
  notes.forEach((noteTxt) => addNote(noteTxt));
}

btnAdd.addEventListener("click", () => addNote());

function addNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note-wrapper");
  note.innerHTML = `<textarea>${text || ""}</textarea>
    <div class="operations">
      <button class="edit fas fa-edit">edit</button>
      <button class="delete fas fa-trash-alt">X</button>
    </div>`;

  const deleteBtn = note.querySelector(".delete");
  const editBtn = note.querySelector(".edit");

  deleteBtn.addEventListener("click", () => {
    note.remove();
    saveNotes();
  });

  editBtn.addEventListener("click", () => {
    const textarea = note.querySelector("textarea");
    textarea.contentEditable = true;
    textarea.focus();
    textarea.addEventListener("input", () => {
      saveNotes();
    });
  });

  document.querySelector(".notes").appendChild(note);
}

function saveNotes() {
  const notes = [];
  document.querySelectorAll(".note-wrapper textarea").forEach((textarea) => {
    if (textarea.value.trim()) {
      notes.push(textarea.value);
    }
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}