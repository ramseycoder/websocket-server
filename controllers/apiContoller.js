const {apiRequest} = require('../requests/apiRequest');

exports.setNewChat = async (req,res) => {
  const resu = await  apiRequest.setNewCoursChat(req.body);
  if(resu.etat){
      res.json(resu);
  }
};

exports.setNewForum = async (req,res) => {
    const resu = await  apiRequest.setNewForum(req.body);
    if(resu.etat){
        res.json(resu);
    }
};

exports.getChatMessages = async (req,res) => {
    const resu = await  apiRequest.getChatMessages(req.body);
    if(resu.etat){
        res.json(resu);
    }
};

exports.getForumMessages = async (req,res) => {
    const resu = await  apiRequest.getForumMessages(req.body);
    if(resu.etat){
        res.json(resu);
    }
};
