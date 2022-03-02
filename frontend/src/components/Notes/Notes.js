import React from 'react';
import './Notes.css';
import  Note from './Note/Note';
import NewNote from './NewNote/NewNote';
import Modal from 'react-modal';
import EditNote from '../EditNote/EditNote';
//const axios = require('axios'); tak też można załadować axios
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
/////
const instance =  axios.create({
  baseURL: 'https://szczecin.herokuapp.com/'
});

/////
class Notes extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            notes: [ ],
            showEditModal: false,
            editNote: {}
        };
    }
    //jest to metoda(funkcja) która uruchomi się jeden raz na samym początku gdy komponent
    //został zamontowany tutaj uruchomimy funkcję -- fetchNotes()
    componentDidMount() {
      this.fetchNotes();
    }
    /// pobiera notatki funkcja -- fetchNotes(), axios- biblioteka do pobierania request
    ///  ma dużo fajnych fetcherów pobieramy notatki i łączymy się z API
    ///axios najpierw podajemy typ request np: -get
   async fetchNotes() {
     const res = await instance.get('/notes');
     const notes = res.data;
     this.setState({notes:notes});
     console.log(res);
    }
    /////
    async deleteNote(id) {
        console.log('usuwanie notatki numer :', id);
        const notes = [...this.state.notes]
        .filter(note => note._id !== id);
       await instance.delete('/notes/'+id);
         this.setState({notes:notes});
         NotificationManager.warning('Notatkę usunięto');
    }
      ///////
    async addNote(note) {
        const notes = [...this.state.notes];
       //// dodawanie notatki do backend a póżniej na frontend
       try {
        const res = await instance.post('/notes', note);
        const newNote = res.data;
         //////dodanie do frontendu
          notes.push(newNote);
          this.setState({notes:notes});
          NotificationManager.info('Notatkę dodano');
       } catch (err) {
        NotificationManager.error(err.response.data.message);


       }

    }
    ////
     async editNote(note){
        ////edit backend
        await instance.put('/notes/' + note._id, note);
        ///edit frontend
        const notes = [...this.state.notes];
        const index = notes.findIndex(x => x._id === note._id);
        if(index >=0){
            notes[index] = note;
        this.setState({notes:notes});
        NotificationManager.info('Notatkę poprawiono');
        }
        this.toggleModal();
      }
      /////
      toggleModal() {
        this.setState({showEditModal:!this.state.showEditModal});
      }
      editNoteHandler(note) {
        this.toggleModal();
        this.setState({ editNote: note });
      }


////////////Add ariaHideApp={false} to Modal attributes. rozwiązanie worning
/////Warning: react-modal: App element is not defined. Please use `Modal.setAppElement(el)` or set `appElement={el}`
    render() {

        return (

            <div>
            <NotificationContainer/>
               <p>Moje notatki:</p>
               <NewNote
                 onAdd={(note) => this.addNote(note)}
               />

               <Modal
               ariaHideApp={false}
               isOpen={this.state.showEditModal}
               contentLabel = "Edytuj notatkę">
               <EditNote
                 title = {this.state.editNote.title}
                 body = {this.state.editNote.body}
                 id = {this.state.editNote._id}
                 onEdit={note => this.editNote(note)}
               />
                <button
                onClick={() => this.toggleModal( NotificationManager.info('Notatkę anulowano'))}
                >Anuluj</button>

               </Modal>

               {this.state.notes.map(note => (
               <Note
               key = {note._id}
               title={note.title}
               body={note.body}
               id={note._id}
               onEdit={(note) => this.editNoteHandler(note)}
               onDelete={(id) => this.deleteNote(id)}
               />
               ))}

            </div>
        );
    }

}
export default Notes ;

