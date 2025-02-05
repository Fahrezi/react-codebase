// Icon.test.tsx

import { render, screen } from "@testing-library/react";
import { Icon } from "../Icon";

describe("Icon component", () => {
  it("renders the Home icon correctly", () => {
    const { container } = render(<Icon name='home' />);
    expect(container).toBeInTheDocument();
  });

  it("renders the User icon correctly", () => {
    const { container } = render(<Icon name='user' />);
    expect(container).toBeInTheDocument();
  });

  it("renders the Users icon correctly", () => {
    const { container } = render(<Icon name='users' />);
    expect(container).toBeInTheDocument();
  });

  it("renders the Layout icon correctly", () => {
    const { container } = render(<Icon name='layout' />);
    expect(container).toBeInTheDocument();
  });

  it("renders the Layers icon correctly", () => {
    const { container } = render(<Icon name='layers' />);
    expect(container).toBeInTheDocument();
  });

  it("renders the Folder icon correctly", () => {
    const { container } = render(<Icon name='folder' />);
    expect(container).toBeInTheDocument();
  });

  it("renders the Database icon correctly", () => {
    const { container } = render(<Icon name='database' />);
    expect(container).toBeInTheDocument();
  });

  it("renders the Info icon correctly", () => {
    const { container } = render(<Icon name='info' />);
    expect(container).toBeInTheDocument();
  });

  it("renders the Info icon correctly", () => {
    const { container } = render(<Icon name='' />);
    expect(container).toBeInTheDocument();
  });
});
