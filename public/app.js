const API_URL = "/api/notes";

const notesContainer = document.getElementById("notes-container");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const noteForm = document.getElementById("note-form");

const noteId = document.getElementById("note-id");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const categoryInput = document.getElementById("category");

// Load all notes
async function loadNotes() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }

    const notes = await response.json();

    loading.style.display = "none";
    errorMessage.textContent = "";

    renderNotes(notes);
  } catch (error) {
    console.error(error);

    loading.style.display = "none";

    errorMessage.textContent =
      "Unable to load notes. Please make sure the server is running.";
  }
}

// Render notes
function renderNotes(notes) {
  notesContainer.innerHTML = "";

  if (notes.length === 0) {
    notesContainer.innerHTML = `
      <div class="message">
        No notes found. Create your first note!
      </div>
    `;
    return;
  }

  notes.forEach((note) => {
    const card = document.createElement("article");

    card.className = "note-card";

    const date = new Date(note.created_at);

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    card.innerHTML = `
      <span class="note-category">
        ${escapeHTML(note.category)}
      </span>

      <h3>
        ${escapeHTML(note.title)}
      </h3>

      <p>
        ${escapeHTML(note.content)}
      </p>

      <div class="note-footer">
        <span class="note-date">
          ${formattedDate}
        </span>

        <div class="note-actions">
          <button
            class="action-btn"
            onclick="editNote(${note.id})"
          >
            Edit
          </button>

          <button
            class="action-btn delete-btn"
            onclick="deleteNote(${note.id})"
          >
            Delete
          </button>
        </div>
      </div>
    `;

    notesContainer.appendChild(card);
  });
}

// Open modal for creating a note
function openModal() {
  noteForm.reset();

  noteId.value = "";
  modalTitle.textContent = "Create Note";

  modal.classList.add("active");
}

// Close modal
function closeModal() {
  modal.classList.remove("active");
}

// Create / Update note
noteForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = noteId.value;

  const noteData = {
    title: titleInput.value.trim(),
    content: contentInput.value.trim(),
    category: categoryInput.value,
  };

  try {
    const response = await fetch(id ? `${API_URL}/${id}` : API_URL, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    closeModal();

    await loadNotes();
  } catch (error) {
    console.error(error);

    alert(error.message);
  }
});

// Edit note
async function editNote(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch note");
    }

    const note = await response.json();

    noteId.value = note.id;
    titleInput.value = note.title;
    contentInput.value = note.content;
    categoryInput.value = note.category;

    modalTitle.textContent = "Edit Note";

    modal.classList.add("active");
  } catch (error) {
    console.error(error);

    alert("Unable to load note.");
  }
}

// Delete note
async function deleteNote(id) {
  const confirmed = confirm("Are you sure you want to delete this note?");

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete note");
    }

    await loadNotes();
  } catch (error) {
    console.error(error);

    alert(error.message);
  }
}

// Prevent HTML injection
function escapeHTML(value) {
  const div = document.createElement("div");

  div.textContent = value;

  return div.innerHTML;
}

// Close modal when clicking outside
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Initial load
loadNotes();
