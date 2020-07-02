//ruta para almacenar los enlaces.
const express = require('express');
const router = express.Router();

const pool = require('../database'); //importacion de la bd.

router.get('/add', (req,res) => {
    //res.send('form'); escribe 'Form' en el html.
    res.render('links/add');
});

router.post('/add', async (req,res) => {
    //console.log(req.body);
    //Destructuring el objeto enviado
    const { title, url, description } = req.body;
    //el objeto newLink se crea para ser vinculado con los usuarios.
    const newLink = {
        title,
        url,
        description,
        user_id:2
    };
    //console.log(newLink);
    await pool.query('INSERT INTO links set ?', [newLink]);
    /*await dice que la peticion puede tardar, y cuando se complete siga con el resto.
    NO PUEDE HABER await SIN async.
    */
   //Se guarda un mensaje.
   req.flash('success', 'Link guardado correctamente'); //COMO SE USA FLASH DESD EUN MIDDLEWARE SE ACCEDE CON EL ATRIBUTO 'req'.

   //syntaxis de flash = flash(nombreMensaje,mensaje);

    res.redirect('/links'); //desppues de la insercion en Query te redirecciona al listado de links.
});

router.get('/', async (req,res) => {
    const links = await pool.query('SELECT * FROM links');
    res.render('links/list', {links}); //se pasa el objeto que recibio los links del query.
})
    //SINTAXIS DE EXPRESS PARA AGARRAR UN ID DE LA URI.
    router.get('/delete/:id', async (req,res) => {
        // res.send('DELETED');
        const {id} = req.params;
        await pool.query('DELETE FROM links WHERE `id` = ?',[id]);

        req.flash('success', 'Link removido correctamente');
       res.redirect('/links'); 
    });
    //la lógica detrás de la edición es sacar id, después consultar los campos con el id, pintarlos y dejar que lo edite.
    router.get('/edit/:id', async (req,res) => {
        const {id} = req.params;
        const links = await pool.query('SELECT * FROM links WHERE `id` = ?',[id]);
        res.render('./links/edit',{links: links[0]});
    });
    router.post('/edit/:id', async (req,res) => {
        const  { id } = req.params;
        const {title, description, url} = req.body;
        const updtLink = {
            title,
            description,
            url
        }
        await pool.query('UPDATE links set ? WHERE id = ?', [updtLink, id]);
        req.flash('success', 'Link actualizado correctamente');
        res.redirect('/links');
    });

module.exports = router;