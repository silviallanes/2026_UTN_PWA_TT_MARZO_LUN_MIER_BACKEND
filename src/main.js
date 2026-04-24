import ENVIRONMENT from "./config/environment.config.js"
import connectMongoDB from "./config/mongoDB.config.js"
/* import User from "./models/user.model.js"
import Workspace from "./models/workspace.model.js" */
import WorkspaceMember from "./models/workspaceMember.model.js"
import workspaceMemberRepository from "./repository/member.repository.js"
import userRepository from "./repository/user.repository.js"
import workspaceRepository from "./repository/workspace.repository.js"
import express, { response } from 'express';
import healthRouter from "./routes/health.router.js"
import authRouter from "./routes/auth.router.js"
import mailerTransporter from "./config/mailer.config.js"
import cors from 'cors'
import authMiddleware from "./middlewares/authMiddleware.js"
import workspaceRouter from "./routes/workspace.router.js"
import errorHandlerMiddleware from "./middlewares/error.Handler.middleware.js"
import ServerError from "./helpers/error.helper.js"


connectMongoDB()

const app = express()
//app.use(cors())

const allowedDomains = [
    'http://localhost:5173', //frontend local
    '2026-utn-pwa-tt-marzo-lun-mier-fron.vercel.app' //frontend deploy
]
app.use(cors({
    origin: (origin, callback) => {
        if (!origin && ENVIRONMENT.MODE === 'dev') {
            callback(null, true)
        }
        else if (allowedDomains.includes(origin)) {
            callback(null, true)
        } else {
            callback(new ServerError('No autorizado', 403))
        }
    }
}))

app.use(express.json())

/* 
Delegamos las consultas que vengan sobre '/api/health' al healthRouter
*/
app.use('/api/health', healthRouter)
app.use('/api/auth', authRouter)
app.use('/api/workspace', workspaceRouter)

app.get(
    '/api/test',
    authMiddleware,
    (request, response, next) => {
        try {
            const { user } = request

            if (true) {
                return next(new ServerError('Error interno X', 400))
            }

            response.send('ok, vos sos: ' + user.id)
        }
        catch (error) {
            next(error)
        } S

    }
)

app.use(
    errorHandlerMiddleware
)

app.listen(
    ENVIRONMENT.PORT,
    () => {
        console.log('La aplicacion se esta escuchando en el puerto ' + ENVIRONMENT.PORT)
    }
)


/* mailerTransporter.sendMail(
    {
        from: ENVIRONMENT.MAIL_USER,
        to: ENVIRONMENT.MAIL_USER, //Aca va a donde quieren enviar
        subject: 'Test de envio de email',
        html: '<h1>Si recibis este email, el sistema de envio de emails funciona correctamente</h1>'
    }
)
 */


//workspaceRepository.create('test', 'lorem', '', true)

//workspaceMemberRepository.create('69c1a7a7f5505d11801c0778', '69b1d51bf91f9031fa4f2d04', 'owner')
