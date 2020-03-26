const Ets = require('../models/etablissements.model');
const Classe = require('../models/classe.model');
const CoursChat = require('../models/coursChat.model');
const Forum = require('../models/forum.model');

exports.apiRequest = class {

    static setNewCoursChat(data){
        return new Promise(async next => {
            await Ets.findOne({name:data.nom_ets}).then(async resp => {
                if(resp !== null){
                    await Classe.findOne({name:data.nom_ets+'/'+data.nom_classe}).then(async resp2 => {
                        if(resp2 !== null){
                            const newCoursChat = await new CoursChat({
                               subject: data.nom_matiere,
                               title: data.title_chat,
                               messages: []
                            });
                            newCoursChat.save().then(resp3 => {
                                resp2.chats.push(resp3._id);
                                resp2.save().then(s => {
                                    next({etat:true,data:s});
                                })
                            })
                        }else{
                            const newClasse = new Classe({
                               name:data.nom_ets+'/'+data.nom_classe
                            });
                            newClasse.save().then(async resp3 => {
                                resp.classes.push(resp3._id);
                                resp.save().then(async d => {
                                    const newCoursChat = await new CoursChat({
                                        subject: data.nom_matiere,
                                        title: data.title_chat,
                                        messages: []
                                    });
                                    newCoursChat.save().then(resp4 => {
                                        resp3.chats.push(resp4._id);
                                        resp3.save().then(s => {
                                            next({etat:true,data:s});
                                        })
                                    })
                                });

                            });
                        }
                    }).catch(err => {
                        next({etat:false, err:err});
                    })
                }else{
                    const newEts = await new Ets({
                        name: data.nom_ets
                    });
                    newEts.save().then(async resp2 => {
                       const newClasse = await new Classe({
                           name: data.nom_ets+'/'+data.nom_classe
                       });
                       newClasse.save().then(async resp3 => {
                          resp2.classes.push(resp3._id);
                          resp2.save().then(async d => {
                             const newCoursChat = await new CoursChat({
                                 subject: data.nom_matiere,
                                 title:data.title_chat,
                                 messages:[]
                             });
                             newCoursChat.save().then(resp4 => {
                                resp3.chats.push(resp4._id);
                                resp3.save().then(s => {
                                    next({etat:true,data:s});
                                })
                             });
                          });
                       });
                    });
                }
            }).catch(err =>  {
                next({etat:false, err:err})
            })
        });
    }


    static setNewForum(data){
        return new Promise(async next =>  {
           const newForum = await new Forum({
               subject: data.nom_matiere,
               title: data.title_chat,
               messages: [],
           });
           newForum.save().then(async s =>  {
               const classe = await Classe.findOne({name:data.nom_ets+'/'+data.nom_classe}).then(r => r);
               classe.forums.push(s._id);
               classe.save().then(r => {
                   next({etat:true,data:r});
               });
           });
        });
    }


    static getChatMessages(data){
        return new Promise(async next =>  {
          const classe = await Classe.findOne({name:data.nom_classe}).populate('chats').then(r => r);
          for (const chat of classe.chats) {
             if(chat.subject === data.nom_matiere && chat.title === data.title_chat){
                 await CoursChat.findById(chat._id).then(s => {
                     next({etat:true,data:s.messages});
                 });
             }
          }
        });
    }

    static getForumMessages(id){
        return new Promise(async next =>  {
            await Forum.findById(id).then(r => {
                next({etat:true, data:r})
            })
          /*  const classe = await Classe.findOne({name:data.nom_ets+'/'+data.nom_classe}).populate('forums').then(r => r);
            for (const forum of classe.forums) {
                if(forum.subject === data.nom_matiere && forum.title === data.title_chat){
                    await Forum.findById(forum._id).then(s => {
                        next({etat:true,data:s.messages});
                    });
                }
            } */
        });
    }

    static getClasseForums(data){
        return new Promise(async next => {
           await Classe.findOne({name:data.nom_classe}).populate('forums').then(s =>  {
               next({etat:true, data: s.forums});
           });
        });
    }

    static setChatMessage(data){
        return new Promise(async next => {
            await Classe.findOne({name:data.nom_classe}).populate('chats').then(async r => {
                 for(const chat of r.chats){
                     if(chat.subject === data.nom_matiere && chat.title === data.title_chat){
                         const ch = await CoursChat.findById(chat._id).then(s => s);
                         ch.messages.push({
                             user_name: data.username,
                             message: data.message
                         });
                         ch.save().then(e => {
                             next({etat:true,data:e});
                         })
                     }
                 }
            })
        })
    }

    static setForumMessage(data){
        return new Promise(async next => {
            const m = await Forum.findById(data.forum_id).then(r => r);
            m.messages.push({
                user_name: data.username,
                message: data.message
            });
            m.save().then(s => {
                next({etat:true, data:s});
            })
           /* await Classe.findOne({name:data.nom_classe}).populate('forums').then(async r => {
                for(const forum of r.forums){
                    if(forum.subject === data.subject && forum.title === data.title_chat){
                        const fo = await Forum.findById(forum._id).then(s => s);
                        fo.messages.push({
                            user_name: data.username,
                            message: data.message
                        });
                        fo.save().then(e => {
                            next({etat:true,data:e});
                        })
                    }
                }
            })*/
        })
    }
};
