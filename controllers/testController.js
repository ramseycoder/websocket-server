const {apiRequest} = require('../requests/apiRequest');
exports.profLogin = (req,res)=>{
    res.render('testst/profLogin');
};

exports.profLoginPost = (req,res)=>{
    let username = "rameaux";
    let password = "javascript";
    if(req.body.username === username && req.body.password === password){
        res.redirect('/test/prof/home');
    }
};

exports.profHome = (req,res)=>{
    res.render('testst/profHome');
};

/// partie user

exports.indexUser = async (req,res) => {
 /*   const resuOne = await apiRequest.getChatMessages({nom_classe:"Lycée Lauraine/6eme", nom_matiere:"Mathématiques", title_chat:"Les Fonctions"});
    if(resuOne.etat){
        res.render('users/index',{messages: resuOne.data});
    } */
 res.render('users/index');
};

exports.userForums = async (req,res) => {
    const resuOne = await apiRequest.getClasseForums({nom_classe:"Lycée Lauraine/6eme"});
    if(resuOne.etat){
        res.render('users/forum',{forums:resuOne.data});
    }
};

exports.forumChat = async (req,res) => {
   const resuOne = await apiRequest.getForumMessages(req.params.id);
   if(resuOne.etat){
       res.render('users/forumChat',{data:resuOne.data});
   }
};
