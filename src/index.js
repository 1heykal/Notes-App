import {createNote, loadNotes} from './notes'
import {setFilters} from './filters'
import {renderNotes} from './views'
renderNotes()

document.querySelector('#create-note').addEventListener('click', (e) => {
    const hashID = createNote()
    location.assign(`./edit.html#${hashID}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value 
    })
    renderNotes()

})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value 
    })
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        loadNotes()
        renderNotes()
    }
})






