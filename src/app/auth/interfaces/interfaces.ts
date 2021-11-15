export interface AuthResponse {
    ok:      boolean;
    usuario?: Usuario;
    token?:   string;
    errors?: Errors;
}

export interface Usuario {
    _id:      string;
    nombre:   string;
    correo?:   string;
    password?: string;
    __v?:      number;
}

export interface Errors {
    password?: Password;
}

export interface Password {
    value:    string;
    msg:      string;
    param:    string;
    location: string;
}
