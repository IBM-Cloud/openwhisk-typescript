import Bold from '../src/Bold';
import Params from '../src/Params';
import Strikethrough from '../src/Strikethrough';

import { expect } from 'chai';

const params = {
  boldMd : '**$TEXT**',
  strikeMd : '~~$TEXT~~',
  message : 'mocha'
} as Params;

describe('cloud-functions-typescript', function () {

  it ('bold', () => {
    expect(Bold(params).html).to.equal(`<p><strong>${params.message}</strong></p>\n`);
  });

  it ('strikethrough', () => {
    expect(Strikethrough(params).html).to.equal(`<p><del>${params.message}</del></p>\n`);
  });

});