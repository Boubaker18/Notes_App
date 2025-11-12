import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { createNote } from "../services/note-service";
import { useAuth } from "../src/contexts/AuthContext";

export default function NoteInput({
  visible,
  onClose,
  onSave,
  noteText,
  setNoteText,
  isEditing,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { user } = useAuth();

  // Reset form state
  const resetForm = () => {
    setTitle("");
    setContent("");
    setError(null);
  };

  // Close modal and reset form
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Save the new note
  const handleSave = async () => {
    // Basic form validation
    if (!title.trim() || !content.trim()) {
      setError("Please fill in both title and content");
      return;
    }

    if (!user) {
      setError("You must be logged in to create notes");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Prepare note data with authenticated user's ID
      const noteData = {
        title: title.trim(),
        content: content.trim(),
        userId: user.$id,
      };

      // Call create note service
      const newNote = await createNote(noteData);

      // Reset form and close modal
      resetForm();
      onClose();

      // Notify parent component about the new note
      if (onSave) {
        onSave(newNote);
      }
    } catch (err) {
      console.error("Error creating note:", err);
      setError("Failed to save note. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Note</Text>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TextInput
            style={styles.textInput}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />

          <TextInput
            style={[styles.textInput, styles.contentInput]}
            placeholder="Enter your note content here..."
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleClose}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Saving..." : "Save Note"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
  contentInput: {
    height: 150,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#95a5a6",
  },
  saveButton: {
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
