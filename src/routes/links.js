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
       res.redirect('/links'); 
    });

    router.get('/edit/:id', (req,res) => {
        const {id} = req.params;
    });

module.exports = router;