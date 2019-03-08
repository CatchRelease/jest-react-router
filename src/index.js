import matchers from './matchers';

const jestExpect = global.expect;

if (jestExpect !== undefined) {
  jestExpect.extend(matchers);
} else {
  /* eslint-disable no-console */
  console.error(
    "Unable to find Jest's global expect." +
      '\nPlease check you have added jest-react-router correctly to your jest configuration.' +
      '\nSee https://github.com/CatchRelease/jest-react-router#setup for help.'
  );
  /* eslint-enable no-console */
}
