import Messenger , { HtmlMessage }from './Messenger';
import Params from './Params';

export default function main(params: Params): Object {
  const { foo } = params;
  return { payload: foo };
}

(<any>global).main = main;  // required when using webpack