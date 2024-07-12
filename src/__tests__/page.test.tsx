import { useGetProducts, useSaveProduct, useGetProduct } from '@/modules/home/hooks';
import { render, screen } from '@testing-library/react';
import Page from '../app/page';
import { wrapper } from '@/lib/tests';
import userEvent from '@testing-library/user-event';
import { Product } from '@/schemas';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useIsFetching: jest.fn(() => 0),
}));

jest.mock('@/modules/home/hooks', () => ({
  useGetProducts: jest.fn(),
  useSaveProduct: jest.fn(),
  useGetProduct: jest.fn(),
}));

describe('HomePage', () => {
  const useGetProductsMock = useGetProducts as jest.MockedFunction<
    typeof useGetProducts
  >;
  const useSaveProductMock = useSaveProduct as jest.MockedFunction<
    typeof useSaveProduct
  >;
  const useGetProductMock = useGetProduct as jest.MockedFunction<
    typeof useGetProduct
  >;

  beforeEach(() => {
    useGetProductsMock.mockReturnValue({
      data: [] as Product[],
    } as any);
    useSaveProductMock.mockReturnValue({
      mutate: jest.fn(),
    } as any);
    useGetProductMock.mockReturnValue({
      data: {} as Product,
    } as any);
  });

  afterEach(() => {
    useGetProductsMock.mockReset();
    useSaveProductMock.mockReset();
    useGetProductMock.mockReset();
  });

  it('should render a table with default texts', async () => {
    render(await Page(), { wrapper });

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('A list of products.')).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add product' })).toBeInTheDocument();
  });

  it('should render a table with data', async () => {
    useGetProductsMock.mockReturnValue({
      data: [
        {
          id: '1',
          name: 'Apple',
          price: 10,
        },
        {
          id: '2',
          name: 'Banana',
          price: 20,
        },
      ] as Product[],
    } as any);

    render(await Page(), { wrapper });

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('should render a loading indicator', async () => {
    useGetProductsMock.mockReturnValue({
      isLoading: true,
    } as any);

    render(await Page(), { wrapper });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveAttribute('aria-busy', 'true');
  });

  it('should filter products', async () => {
    useGetProductsMock.mockReturnValue({
      data: [
        {
          id: '1',
          name: 'Apple',
          price: 10,
        },
        {
          id: '2',
          name: 'Banana',
          price: 20,
        },
      ] as Product[],
    } as any);

    render(await Page(), { wrapper });

    await userEvent.type(screen.getByRole('searchbox'), 'Banana{enter}');

    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });
});
