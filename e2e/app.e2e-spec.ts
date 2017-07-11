import { IssuelistPage } from './app.po';

describe('issuelist App', () => {
  let page: IssuelistPage;

  beforeEach(() => {
    page = new IssuelistPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
