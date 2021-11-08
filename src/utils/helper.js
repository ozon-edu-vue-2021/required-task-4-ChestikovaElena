export function debounce(f, t) {
  const calls = {};
  return function(args) {
    if (calls.lastCallTimer) {
      clearTimeout(calls.lastCallTimer);
    }

    calls.lastCallTimer = setTimeout(() => f(args), t);
  };
}
