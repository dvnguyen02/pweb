const { render, screen } = require('@testing-library/react');
const Projects = require('../projects'); // Adjust the import based on your actual component path

test('hello world!', () => {
	render(<Projects />);
	const linkElement = screen.getByText(/hello world/i);
	expect(linkElement).toBeInTheDocument();
});