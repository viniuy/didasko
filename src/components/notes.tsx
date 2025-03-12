"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { toast as sonnerToast, Toaster } from "sonner";
import { Trash, Edit } from "lucide-react";

interface NoteProps {
  id: number;
  date: string;
  content: string;
  subtext?: string;
}

export function Notes() {
  const [notes, setNotes] = useState<NoteProps[]>([  
    { id: 1, date: "2023-02-25", content: "Check Exams (Prelim)", subtext: "BSIT 611" },
    { id: 2, date: "2023-02-25", content: "Prepare lesson plan", subtext: "Topic: React Hooks" },
    { id: 3, date: "2023-02-20", content: "Meeting with Faculty", subtext: "Conference Room 2" },
  ]);

  const [newNote, setNewNote] = useState<NoteProps>({ id: 0, date: "", content: "", subtext: "" });
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null); // Holds ID of note to delete

  // ✅ Add or Update Note (Stack behavior - LIFO)
  const saveNote = () => {
    if (!newNote.date.trim() || !newNote.content.trim()) {
      sonnerToast.error("Please fill in all required fields!");
      return;
    }

    if (editMode) {
      setNotes((prev) => prev.map((note) => (note.id === newNote.id ? newNote : note)));
      sonnerToast.success(`Updated note: "${newNote.content}"`);
    } else {
      const newId = notes.length ? Math.max(...notes.map((note) => note.id)) + 1 : 1;
      setNotes((prev) => [{ ...newNote, id: newId }, ...prev]); // Push new note to the top
      sonnerToast.success(`Added note: "${newNote.content}"`);
    }

    setNewNote({ id: 0, date: "", content: "", subtext: "" });
    setOpen(false);
    setEditMode(false);
  };

  // ✅ Edit Note
  const editNote = (note: NoteProps) => {
    setNewNote(note);
    setEditMode(true);
    setOpen(true);
  };

  // ✅ Open Delete Confirmation
  const confirmDelete = (id: number) => {
    setDeleteId(id);
  };

  // ✅ Delete Note
  const deleteNote = () => {
    if (deleteId === null) return;
    setNotes((prev) => prev.filter((note) => note.id !== deleteId));
    const deletedNote = notes.find((note) => note.id === deleteId);
    if (deletedNote) {
      sonnerToast.error(`Deleted note: "${deletedNote.content}"`);
    }
    setDeleteId(null);
  };

  // ✅ Group Notes by Date (Descending Order)
  const groupedNotes = notes.reduce((acc, note) => {
    acc[note.date] = acc[note.date] ? [...acc[note.date], note] : [note];
    return acc;
  }, {} as Record<string, NoteProps[]>);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">Notes</h2>

      {/* ✅ Scrollable Notes Container */}
      <div className="max-h-[300px] overflow-y-auto space-y-6">
        {Object.entries(groupedNotes).sort(([a], [b]) => b.localeCompare(a)).map(([date, notes]) => (
          <div key={date}>
            <h3 className="text-md font-bold text-gray-700 border-b pb-1 mb-2">{new Date(date).toDateString()}</h3>
            <div className="space-y-3">
              {notes.map((note) => (
                <div key={note.id} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                  <div>
                    <div className="font-medium">{note.content}</div>
                    {note.subtext && <div className="text-xs text-gray-600">{note.subtext}</div>}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => editNote(note)}>
                      <Edit size={16} />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon" className="bg-black text-white hover:bg-gray-800" onClick={() => confirmDelete(note.id)}>
                      <Trash size={16} />
                      </Button>
                      </AlertDialogTrigger>
                      {deleteId === note.id && (
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          </AlertDialogHeader>
                          <p className="text-sm text-gray-600">This action cannot be undone.</p>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={deleteNote} className="bg-red-500 hover:bg-red-600">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      )}
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Note Button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-4 w-full">Add Note</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Note" : "Add a New Note"}</DialogTitle>
          </DialogHeader>

          {/* Date Field */}
          <div className="mb-2">
            <label className="text-sm font-medium text-gray-700">Date <span className="text-red-500">*</span></label>
            <Input type="date" min={new Date().toISOString().split("T")[0]} value={newNote.date} onChange={(e) => setNewNote({ ...newNote, date: e.target.value })} className="disabled:opacity-50" />
          </div>


          {/* Content Field */}
          <div className="mb-2">
            <label className="text-sm font-medium text-gray-700">Note Content <span className="text-red-500">*</span></label>
            <Input type="text" placeholder="Enter note content" value={newNote.content} onChange={(e) => setNewNote({ ...newNote, content: e.target.value })} />
          </div>
          
          {/* Subtext Field (Optional) */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Subtext (Optional)</label>
            <Input
              type="text"
              placeholder="Additional details"
              value={newNote.subtext}
              onChange={(e) => setNewNote({ ...newNote, subtext: e.target.value })}
            />
          </div>

          <Button onClick={saveNote} className="w-full">{editMode ? "Update Note" : "Save Note"}</Button>
        </DialogContent>
      </Dialog>

      <Toaster position="top-right" />
    </div>
  );
}
