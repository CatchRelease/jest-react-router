import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';

const toRoute = (router, path, { to }) => {
  const route = router
    .find('Route')
    .filterWhere(node => node.prop('path') === path);
  const expected = to.displayName || to.name;

  if (route.length === 0) {
    return {
      message: () => `No route matches ${path}`,
      pass: false
    };
  }

  if (route.props().component !== to) {
    const actual = route.props().component;
    const received = actual.displayName || actual.name;

    const message = `
      ${matcherHint('.toRoute')}

      Expected to route to:
        ${printExpected(expected)}
      Received:
        ${printReceived(received)}
    `;

    return {
      message: () => message,
      pass: false
    };
  }

  return {
    message: () => `Found ${path} routing to ${expected}`,
    pass: true
  };
};

export default toRoute;
