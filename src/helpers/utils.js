/**
 * Utils
 */

/**
 * Wait
 * 
 * Inline setTimeout, used with `await`
 */
export const wait = (ms) => {
  return new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });
};
