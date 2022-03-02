const Note = require('../../db/models/note');

//obiekt przerabiamy na class będzie ładniej wyglądało
class NoteActions {

    //zapisywanie nowej notatki
   async saveNote(req, res){
        const title = req.body.title;
        const body = req.body.body;
        let note;
        try{
             note = new Note({
                title:title,
                 body:body
             });
             await note.save();
        }catch(err){
            return res.status(422).json({message:err.message});
        }
        res.status(201).json(note);
    }

    //pobieranie notatek
    //obsługa błędów w end point
    async getAllNotes(req, res){
        let doc;
        try {
         doc = await Note.find({});
        }catch (err) {
            return res.status(500).json({message:err.message});
        }
       // res.send('Api działa');
       res.status(200).json(doc);
    }
    //pobieranie notatki
   async getNote(req, res){
       const id =  req.params.id;
       const note = await Note.findOne({_id: id});
       res.status(200).json(note);
    }

    //aktualizowanie notatki
   async updateNote(req, res){
        const id =  req.params.id;
        const title = req.body.title;
        const body = req.body.body;
        const note = await Note.findOne({_id: id});
        note.title = title;
        note.body = body;
        await note.save();

        res.status(201).json(note);
    }

     //usuwanie notatki
   async deleteNote(req, res){
        const id = req.params.id;
        await Note.deleteOne({_id: id});//podaje id do _id które tu pobieram
        res.sendStatus(204);//status 204 mówi że wszystko zostało wykonane i nie przyjmuje już nic więcej
    }                   //żadna treść nie jest już zwracana
}
module.exports = new NoteActions();