const fs = require('fs')
const chalk = require('chalk');
const yargs = require('yargs')
const notes = require('./notes.js')


// customize yargs version
yargs.version('1.1.0')

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
      title: {
          describe: 'Note Title',
          demandOption: true,
          type: 'string'
      } , 
      body: {
          describe: 'Note body',
          demandOption: true,
          type: 'string'
      }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body)
    }
})

// create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
          describe: 'Note Title',
          demandOption: true,
          type: 'string'  
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title)
    }
})

// create read note
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Read Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})

// create list note
yargs.command({
    command: 'list',
    describe: 'list note',
    handler(argv) {
        notes.listNotes() 
    }
})
// add, remove, read, list  

yargs.parse()



