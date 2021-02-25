import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'

interface VariablesMailOptions {
	name: string
	title: string
	description: string
	link: string
	user_id: string
}

interface MailOptions {
	to: string
	subject: string
	variables: VariablesMailOptions
	path: string
}

class SendMailService {
	private client: Transporter

	constructor() {
		nodemailer.createTestAccount().then(account => {
			const transporter = nodemailer.createTransport({
				host: account.smtp.host,
				port: account.smtp.port,
				secure: account.smtp.secure,
				auth: {
					user: account.user,
					pass: account.pass
				}
			})

			this.client = transporter
		})
	}

	async execute({ to, subject, variables, path }: MailOptions) {
		const templateFileContent = fs.readFileSync(path).toString('utf8')

		const mailTemplateParse = handlebars.compile(templateFileContent)

		const html = mailTemplateParse(variables)

		const message = await this.client.sendMail({
			to, subject, html, from: 'NPS <noreplay@nps.com>'
		})

		console.log('Message sent: %s', message.messageId)
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
	}
}

export default new SendMailService()