import { AngularRxjsD3Page } from './app.po';

describe('angular-rxjs-d3 App', () => {
  let page: AngularRxjsD3Page;

  beforeEach(() => {
    page = new AngularRxjsD3Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
