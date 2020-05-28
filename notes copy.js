const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
       return 'Your notes'
}

const removeNotes = function (title) {
      const notes = loadNotes()
      console.log('Removing '+title)
// Check Note Present
      const notesToKeep = notes.filter(function (note) {
            return note.title !== title 
      })

      if (notesToKeep.length == notes.length) {
            console.log(chalk.red.inverse('No Not Found'))
       } else {
            console.log(chalk.green.inverse('Note Removed'))
            saveNotes(notesToKeep)   
      }
   
}

const addNotes = function(title, body) {
      const notes = loadNotes()
      const duplicateNotes = notes.filter(function (note) {
            return note.title == title 
      })

      if (duplicateNotes.length === 0 ) { 
            notes.push({
                  title: title,
                  body: body
            })
            saveNotes(notes)  
            console.log(chalk.green.inverse('new notes added'))
      } else {
            console.log(chalk.red.inverse('Note title taken'))
      }

}

const listNotes = function() {
      const notes = loadNotes()
      for (var i = 0 ; i < notes.length ; i++) {
         console.log(chalk.green.inverse('Title :')+notes[i].title+chalk.green.inverse(' Body :')+notes[i].body)
         console.log('')       
      }

}

const saveNotes = function (notes) {
      const dataJSON = JSON.stringify(notes)
      fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = function () {
      try {
            const dataBuffer = fs.readFileSync('notes.json')
            const dataJSON = dataBuffer.toString()
            return JSON.parse(dataJSON)
      } catch (e) {
            return []
      }
}

module.exports = {
       getNotes: getNotes,
       addNotes: addNotes,
       removeNotes: removeNotes,
       listNotes: listNotes
 }
