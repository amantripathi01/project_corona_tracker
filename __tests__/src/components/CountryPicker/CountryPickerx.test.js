// Test generated by RoostGPT for test reactUnitTesting9Jan using AI Type Open AI and AI Model gpt-4-1106-preview


import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Countries from 'src/components/CountryPicker/CountryPicker';
import { fetchCountries } from 'src/api';

// Mock the API module
jest.mock('src/api', () => ({
  fetchCountries: jest.fn()
}));

describe('Countries Picker Component', () => {
  const mockHandleCountryChange = jest.fn();

  beforeEach(() => {
    fetchCountries.mockClear();
    mockHandleCountryChange.mockClear();
  });

  test('renders without crashing', () => {
    const { getByRole } = render(<Countries handleCountryChange={mockHandleCountryChange} />);
    expect(getByRole('combobox')).toBeInTheDocument();
  });

  test('initially has an empty option set as the default value', () => {
    const { getByRole } = render(<Countries handleCountryChange={mockHandleCountryChange} />);
    expect(getByRole('combobox')).toHaveValue('');
  });

  test('calls fetchCountries on mount and populates the countries', async () => {
    const countries = ['USA', 'Canada', 'Australia'];
    fetchCountries.mockResolvedValueOnce(countries);

    const { getByRole, getAllByRole } = render(<Countries handleCountryChange={mockHandleCountryChange} />);
    await waitFor(() => expect(fetchCountries).toHaveBeenCalledTimes(1));
    
    await waitFor(() => {
      const options = getAllByRole('option');
      expect(options).toHaveLength(countries.length + 1); // +1 for default 'United States' option
      expect(options[1]).toHaveTextContent('USA');
      expect(options[2]).toHaveTextContent('Canada');
      expect(options[3]).toHaveTextContent('Australia');
    });
  });

  test('calls handleCountryChange when a country is selected', async () => {
    const countries = ['USA', 'Canada', 'Australia'];
    fetchCountries.mockResolvedValueOnce(countries);

    const { getByRole } = render(<Countries handleCountryChange={mockHandleCountryChange} />);
    await waitFor(() => expect(fetchCountries).toHaveBeenCalled());
    
    fireEvent.change(getByRole('combobox'), { target: { value: 'Canada' } });
    expect(mockHandleCountryChange).toHaveBeenCalledWith('Canada');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

