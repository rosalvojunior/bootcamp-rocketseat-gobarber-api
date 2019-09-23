import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class CancelletionMail {
  get key() {
    return 'CancelletionMail';
  }

  async handle({ data }){
    const { appointment } = data;
    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancelletion',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date), "dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new CancelletionMail();
