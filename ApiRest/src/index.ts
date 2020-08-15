import app from "./app";

import './database';

function main() {
    app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();



// import { createServer, Server } from "http";

// class Servidor {
//     private server: Server;
    
//     constructor(){
//         this.app = express();
//         this.settings();
//         this.router();
//         this.server = createServer(this.app);
//     }

// }