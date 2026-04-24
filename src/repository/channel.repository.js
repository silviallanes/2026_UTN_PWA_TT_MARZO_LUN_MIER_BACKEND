import ChannelDTO from "../dto/channel.dto.js"
import ChannelModel from "../models/channel.model.js"
import ServerError from "../helpers/error.helper.js"

class ChannelRepository {
    async create(workspace_id, name, description) {
        try {
            const channel = await ChannelModel.create({
                fk_id_workspace: workspace_id,
                name,
                description
            })

            // Normalizo el canal
            const normalized_channel = new ChannelDTO(channel)

            return normalized_channel
        } catch (error) {
            throw new ServerError('Error al crear el canal', 500)
        }
    }

    async getAll(workspace_id) {
        try {
            const channels = await ChannelModel.find({ fk_id_workspace: workspace_id })

            // Normalizo los canales
            const normalizedChannels = channels.map(channel => {
                return new ChannelDTO(channel)
            })
            return normalizedChannels
        } catch (error) {
            throw new ServerError('Error al obtener los canales', 500)
        }
    }

    async getById(channel_id) {
        try {
            const channel = await ChannelModel.findOne({ _id: channel_id })

            // Normalizo el canal, solamente si existe
            const normalized_channel = channel && new ChannelDTO(channel)
            return normalized_channel
        } catch (error) {
            throw new ServerError('Error al obtener el canal', 500)
        }
    }

    async softDelete(channel_id) {
        try {
            const channel = await ChannelModel.findByIdAndUpdate(
                channel_id,
                { is_active: false },
                { returnDocument: 'after' }
            )

            // Normalizo el canal
            const normalized_channel = channel && new ChannelDTO(channel)
            return normalized_channel
        } catch (error) {
            throw new ServerError('Error al eliminar el canal (soft)', 500)
        }
    }

    async delete(channel_id) {
        try {
            const channel = await ChannelModel.findByIdAndDelete(
                channel_id
            )

            // Normalizo el canal
            const normalized_channel = channel && new ChannelDTO(channel)
            return normalized_channel
        } catch (error) {
            throw new ServerError('Error al eliminar el canal', 500)
        }
    }
}

const channelRepository = new ChannelRepository()

export default channelRepository