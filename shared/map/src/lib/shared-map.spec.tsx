import { render } from '@testing-library/react';

import SharedMap from './shared-map';

describe('SharedMap', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedMap />);
    expect(baseElement).toBeTruthy();
  });
});
