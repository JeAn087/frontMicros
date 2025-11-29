import { useQuery } from '@tanstack/react-query';
import { usuarioService } from '../services/userService';
import type { UsuarioDTO } from '../types/users/response';

export const useUsuarios = () => {
    return useQuery<UsuarioDTO[]>({
        queryKey: ['usuarios'],
        queryFn: async () => {
        const { data } = await usuarioService.getAll();
        return data;
    },
    });
};

export const useUsuario = (id: number) => {
    return useQuery<UsuarioDTO>({
        queryKey: ['usuario', id],
        queryFn: async () => {
            const { data } = await usuarioService.getById(id);
            return data;
    },
    enabled: !!id,
    });
};