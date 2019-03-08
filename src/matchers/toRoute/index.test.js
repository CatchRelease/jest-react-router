import React from 'react';
import { shallow } from 'enzyme';

import toRoute from '.';

expect.extend({ toRoute });

const Route = () => null;
const MyComponent = () => null;
const OtherComponent = () => null;

const router = shallow(
  <div>
    <Route path="/sign_in" component={MyComponent} />
  </div>
);

describe('.toRoute', () => {
  it('passes when a matching route is found', () => {
    expect(router).toRoute('/sign_in', { to: MyComponent });
  });

  it('fails when a route is not found at all', () => {
    expect(() =>
      expect(router).toRoute('/missing', { to: MyComponent })
    ).toThrowErrorMatchingSnapshot();
  });

  it('fails when a route is found with a different component', () => {
    expect(() =>
      expect(router).toRoute('/sign_in', { to: OtherComponent })
    ).toThrowErrorMatchingSnapshot();
  });
});

describe('.not.toRoute', () => {
  it('passes when a route is not found', () => {
    expect(router).not.toRoute('/missing', { to: MyComponent });
  });

  it('passes when a route exists for a different component', () => {
    expect(router).not.toRoute('/sign_in', { to: OtherComponent });
  });

  it('fails when a route is found', () => {
    expect(() =>
      expect(router).not.toRoute('/sign_in', { to: MyComponent })
    ).toThrowErrorMatchingSnapshot();
  });
});
