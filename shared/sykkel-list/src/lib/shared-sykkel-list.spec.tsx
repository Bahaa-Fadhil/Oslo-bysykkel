import { render } from '@testing-library/react';

import SharedSykkelList from './shared-sykkel-list';

describe('SharedSykkelList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedSykkelList />);
    expect(baseElement).toBeTruthy();
  });
});
