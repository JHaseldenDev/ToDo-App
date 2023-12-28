export class Todo {
    constructor(title, description, dueDate, priority, notes = '', checklist = []) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority; // e.g., 'high', 'medium', 'low'
        this.notes = notes;
        this.checklist = checklist; // Array of { item: string, completed: boolean }
    }

    updateTitle(newTitle) {
        this.title = newTitle;
    }

    updateDescription(newDescription) {
        this.description = newDescription;
    }

    setDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    setPriority(newPriority) {
        this.priority = newPriority;
    }

    addNote(note) {
        this.notes += `\n${note}`;
    }

    toggleChecklistItem(index) {
        if (index >= 0 && index < this.checklist.length) {
            this.checklist[index].completed = !this.checklist[index].completed;
        }
    }

    // Additional methods can be added as needed.
}
