const fs = require('fs')
const chalk = require('chalk')

const readNotes = (title) => {
      const notes=loadNotes()
      const readNote = notes.find((note) => note.title === title)
      if (readNote) {
            console.log(chalk.green.inverse(readNote.title)+' '+readNote.body)
      } else {
            console.log(chalk.red('No Notes'))
      }
}

const removeNotes = (title) =>{
      const notes = loadNotes()
      console.log('Removing '+title)
// Check Note Present
      const notesToKeep = notes.filter((note) => note.title !== title )
      // const notesToKeep = notes.filter(function (note) {
      //       return note.title !== title 
      // })
      if (notesToKeep.length == notes.length) {
            console.log(chalk.red.inverse('No Not Found'))
       } else {
            console.log(chalk.green.inverse('Note Removed'))
            saveNotes(notesToKeep)   
      }
   
}

const addNotes =(title, body) => {
      const notes = loadNotes()
      // const duplicateNotes = notes.filter(function (note) {
      //       return note.title == title 
      // })
      
      const duplicateNote = notes.find((note) => note.title === title)
      
      

      if (!duplicateNote) { 
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

const listNotes = () => {
      const notes = loadNotes()
      notes.forEach((note) => {
         console.log(chalk.green.inverse('Title :')+note.title+chalk.green.inverse(' Body :')+note.body)
      })

}

const saveNotes = (notes) => {
      const dataJSON = JSON.stringify(notes)
      fs.writeFileSync('notes.json',dataJSON)
} 

const loadNotes = () => {
      try {
            const dataBuffer = fs.readFileSync('notes.json')
            const dataJSON = dataBuffer.toString()
            return JSON.parse(dataJSON)
      } catch (e) {
            return []
      }
}

module.exports = {
       readNotes: readNotes,
       addNotes: addNotes,
       removeNotes: removeNotes,
       listNotes: listNotes
 }
