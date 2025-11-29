import { api } from '../api/client';
import type { UsuarioDTO } from '../types/users/response';

export const usuarioService = {
    getAll: () => api.get<UsuarioDTO[]>('/usuarios'),

    getById: (id: number) => api.get<UsuarioDTO>(`/usuarios/${id}`),
};