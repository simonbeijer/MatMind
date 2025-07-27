import { render, screen } from '@testing-library/react';
import Home from '../src/app/page'; // Adjust the import path as necessary

// Mock Next.js router hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock the UserContext
jest.mock('../src/app/context/userContext', () => ({
  UserProvider: ({ children }) => children,
  useUserContext: jest.fn(),
}));

// Mock Next.js Link and Image components
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>;
  };
});

jest.mock('next/image', () => {
  return (props) => {
    const { src, alt, width, height, className } = props;
    return <img src={src} alt={alt} width={width} height={height} className={className} />;
  };
});

// Mock the Header component
jest.mock('../src/app/components/header', () => {
  return function MockHeader(props) {
    return (
      <header data-testid="header">
        {props.isHomepage && (
          <button>Get Started</button>
        )}
      </header>
    );
  };
});

describe('Home Page', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders a Get Started button', () => {
    render(<Home />);
    const getStartedButton = screen.getByRole('button', { name: /Get Started/i });
    expect(getStartedButton).toBeInTheDocument();
  });
});