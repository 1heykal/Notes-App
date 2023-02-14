import {initilaizeEditPage, generateLastEdited} from './views'
import { updateNote, removeNote } from './notes'


const noteID = location.hash.substring(1)
const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const lastEditedElement = document.querySelector('#last-edited')


initilaizeEditPage(noteID)

titleElement.addEventListener('input', (e) => {
  const note =  updateNote(noteID,{
        title: e.target.value
    })
    lastEditedElement.textContent = generateLastEdited(note.updatedAt)
})

bodyElement.addEventListener('input', (e) => {
    const note =  updateNote(noteID,{
        body: e.target.value
    })
    lastEditedElement.textContent = generateLastEdited(note.updatedAt)
})

document.querySelector('#remove-note').addEventListener('click', function (e) {
    removeNote(noteID)
    location.assign('./index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initilaizeEditPage(noteID)
    }
})