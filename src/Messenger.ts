import Params from './Params';

import * as marked from 'marked';

export class HtmlMessage {
  constructor (public body: string, public statusCode: number = 200) {

  }
}

export default class Messenger {

  constructor (private params: Params) {

  }

  bold (): HtmlMessage {
    return this.toHtml(this.params.boldMd);
  }

  strikethrough (): HtmlMessage {
    return this.toHtml(this.params.strikeMd);
  }

  private toHtml (markdownTemplate: string): HtmlMessage {
    const { message } = this.params;    
    return new HtmlMessage(marked(markdownTemplate.replace('$TEXT', message)));
  }
}