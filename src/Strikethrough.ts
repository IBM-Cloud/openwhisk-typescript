import Messenger , { HtmlMessage }from './Messenger';
import Params from './Params';

export default function main(params: Params): HtmlMessage {
  const messenger = new Messenger(params);
  return messenger.strikethrough();
}

(<any>global).main = main;  // required when using webpack