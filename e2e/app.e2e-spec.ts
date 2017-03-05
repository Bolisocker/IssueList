import { IssueListIrontecPage } from './app.po';

describe('issue-list-irontec App', () => {
  let page: IssueListIrontecPage;

  beforeEach(() => {
    page = new IssueListIrontecPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
