# websocket-server

## Lancement
modifier l'ip du serveur dans le fichier se trouvant dans views/users/index.ejs 


```
const ws = new WebSocket('ws://192.168.43.156:8090');
  ```
  
  changez l'ip par l'address du post en question
  
  
  ## explication du model
  
   Vue que nous gérons seuelement la partie chat, nous avons simuler un modéle comme suit:
      .le modéle établissements
      . le modéle classes,
      . le modèle tchat
      
      
  chaque tchat  est lié a un cours 
  chaque classe est lié a un établissement 
      
      
      * pour enregistrer un tchat on prend en compte la matière , le titre du cours et un tableau[] de message.
       [
        username de l'élève,
        message
       ]
      nb: besoin de l'id du cours ( vous devez nous l'envoyer ) *
      
  
  
  réviser les fichiers du dossier models pour plus de compréhension, merci
