import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'


// Generatethe DOM structure for a note
const generateNoteDOM = (note) => {
    const noteElement = document.createElement('a')
    const statusElement = document.createElement('p')
    const editPageLink = document.createElement('p')


    //setup the note title text
    if (note.title.length > 0) {
        editPageLink.textContent = note.title
    } else {
        editPageLink.textContent = 'Unnamed note'
    }
    editPageLink.classList.add('list-item__title')
    noteElement.appendChild(editPageLink)


    //setup the link
    noteElement.setAttribute('href', `./edit.html#${note.id}`)
    noteElement.classList.add('list-item')

    //setup the status message
    statusElement.textContent = generateLastEdited(note.updatedAt)
    statusElement.classList.add('list-item__subtitle')
    noteElement.appendChild(statusElement)

    return noteElement


}


// Render Application notes
const renderNotes = () => {

    const notesElement = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filterNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase())
        || note.body.toLowerCase().includes(filters.searchText.toLowerCase()))
    notesElement.innerHTML = ''
    if (filterNotes.length > 0) {
        filterNotes.forEach((note) => {
            const noteElement = generateNoteDOM(note)
            notesElement.appendChild(noteElement)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesElement.appendChild(emptyMessage)

    }

}

//
const initilaizeEditPage = (noteID) => {

    const titleElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    const lastEditedElement = document.querySelector('#last-edited')
    const notes = getNotes()
    const note = notes.find((note) => note.id === noteID)

    if (!note) {
        location.assign('./index.html')
    }
    titleElement.value = note.title
    bodyElement.value = note.body
    lastEditedElement.textContent = generateLastEdited(note.updatedAt)

}


// Generate the last edited message
const generateLastEdited = (timestamp) => `Last modified ${moment(timestamp).fromNow()}`

export { generateNoteDOM, renderNotes, generateLastEdited, initilaizeEditPage }