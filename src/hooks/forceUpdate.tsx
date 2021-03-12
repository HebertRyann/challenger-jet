import React, { useState } from 'react';

export function useForceUpdate() {
  const [value, setValue] = useState(0);
  console.log('update');
  return () => setValue(value => ++value);
}
