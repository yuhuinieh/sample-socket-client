import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SockectContext } from '@/contexts/SockectContext';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type ChatMessageInputs = {
  message: string;
};
const SendMessage: React.FC = () => {
  const { register, handleSubmit } = useForm<ChatMessageInputs>();
  const { onSendMessage } = useContext(SockectContext);

  const onSubmit: SubmitHandler<ChatMessageInputs> = (data) => {
    // 傳送訊息
    onSendMessage(data.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-2">
        <Textarea
          placeholder="Type your message here."
          {...register('message')}
        />
        <Button type="submit">Send message</Button>
      </div>
    </form>
  );
};

export default SendMessage;
