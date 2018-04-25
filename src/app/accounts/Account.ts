class ServerDetails {
    server;
    port;
    username;
    password;
}

export class Account {
    email;
    name;
    password;

    pop: ServerDetails;
    smtp: ServerDetails;
}
