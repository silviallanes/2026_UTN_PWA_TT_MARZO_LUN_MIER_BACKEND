import ServerError from "../helpers/error.helper.js";
import workspaceMemberRepository from "../repository/member.repository.js";

/* 
Verificar que el cliente sea un miembro del espacio de trabajo
Identificar y guardar en request la membresia del cliente
Verificar que el cliente cumpla con el rol asignado
*/

/* 
delete '/:workspace_id', verifyMemberWorkspaceRoleMiddleware(['OWNER'])
*/


function verifyMemberWorkspaceRoleMiddleware(valid_roles = []) {
    return async function (req, res, next) {
        try {
            const user = req.user; //Que significa? Debe ir luego del authMiddleware y NECESITA tener  el authMiddleware
            const workspaceId = req.params.workspace_id;
            if (!workspaceId) {
                throw new ServerError("Workspace ID is required", 400)
            }
            const member = await workspaceMemberRepository.isMemberPartOfWorkspaceById(
                user.id,
                workspaceId
            )
            if (!member) {
                throw new ServerError("Usuario no pertenece al workspace o no tiene permisos para acceder", 403)
            }
            if(valid_roles.length >= 1 && !valid_roles.includes(member.role)){
                throw new ServerError('Role no valido', 403)
            }

            req.member = member
            next();
        } catch (error) {
            next(error)
        }
    }
}

export default verifyMemberWorkspaceRoleMiddleware;