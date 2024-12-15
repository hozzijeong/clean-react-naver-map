// HelloWorld.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';

const Test = () => {
	return <div>hello, world!</div>;
};

test('renders Hello, World! text', () => {
	render(<Test />);

	const helloWorldElement = screen.getByText(/hello, world!/i);

	expect(helloWorldElement).toBeTruthy();
});
