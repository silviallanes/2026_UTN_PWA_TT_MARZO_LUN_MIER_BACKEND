import ServerError from "../helpers/error.helper.js"
import workspaceMemberRepository from "../repository/member.repository.js"

class MemberWorkspaceService {
    async getWorkspaces(user_id) {
        //traer la lista de espacios de trabajo relacionados al usuario logueado
        const workspacesList = await workspaceMemberRepository.getWorkspaceListByUserId(user_id)
        return workspacesList
    }
    async create(user_id, workspace_id, role) {
        //Checkear que no exista un membresia para ese usuario
        const result = await workspaceMemberRepository.getByWorkspaceAndUserId(workspace_id, user_id)

        if(result.lenght > 0){
            throw new ServerError('Este miembro ya existe')
        }

        await workspaceMemberRepository.create(workspace_id, user_id, role)
    }

    async getMemberList(workspace_id) {
        try {
            if (!workspace_id) {
                throw new ServerError("Todos los campos son obligatorios", 404)
            }

            return await workspaceMemberRepository.getMemberList(
                workspace_id
            )
        } catch (error) {
            throw error
        }
    }
}

const memberWorkspaceService = new MemberWorkspaceService()

export default memberWorkspaceService