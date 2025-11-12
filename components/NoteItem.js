import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { deleteNote } from "../services/note-service";
import EditNoteModal from "./EditNoteModal";

export default function NoteItem({ note, onEdit, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Format the date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Handle delete confirmation and execution
  const handleDelete = () => {
    // Show confirmation dialog
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            setDeleting(true);
            // Call the deleteNote service function
            await deleteNote(note.$id);
            // Notify parent component if callback exists
            if (onDelete) {
              onDelete(note.$id);
            }
          } catch (error) {
            console.error("Error deleting note:", error);
            Alert.alert("Error", "Failed to delete note. Please try again.");
          } finally {
            setDeleting(false);
          }
        },
      },
    ]);
  };

  // Handle opening the edit modal
  const handleEditPress = () => {
    setEditModalVisible(true);
  };

  // Handle when a note is updated
  const handleNoteUpdated = (updatedNote) => {
    if (onEdit) {
      onEdit(updatedNote);
    }
    setEditModalVisible(false);
  };
  return (
    <View style={styles.noteItem}>
      <TouchableOpacity style={styles.noteContent} onPress={handleEditPress}>
        <Text style={styles.noteTitle}>{note.title || "Untitled"}</Text>
        <Text style={styles.noteDate}>
          Last updated: {formatDate(note.updatedAt)}
        </Text>
        <Text style={styles.noteText} numberOfLines={3}>
          {note.content}
        </Text>
      </TouchableOpacity>

      <View style={styles.noteActions}>
        <TouchableOpacity onPress={handleEditPress}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} disabled={deleting}>
          <Text style={styles.deleteButton}>
            {deleting ? "Deleting..." : "Delete"}
          </Text>
        </TouchableOpacity>
      </View>

      <EditNoteModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onNoteUpdated={handleNoteUpdated}
        note={note}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  noteItem: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  noteContent: {
    flex: 1,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  noteDate: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    color: "#333",
  },
  noteActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  editButton: {
    color: "#3498db",
    marginRight: 15,
  },
  deleteButton: {
    color: "#e74c3c",
  },
});
