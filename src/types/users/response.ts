export interface UsuarioDTO {
    id: number;
    nombres: string;
    apellidos: string;
    tipoIdentificacion: string;
    noIdentificacion: string;
}

// Para listas paginadas
export type ListaUsuariosResponse = UsuarioDTO[];