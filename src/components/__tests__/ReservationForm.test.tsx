import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import ReservationForm from '../ReservationForm';

describe('ReservationForm Seating Selections & Validation', () => {
  it('renders Step 1 with dining party sizes, date picker, and time slots', () => {
    render(<ReservationForm />);
    expect(screen.getByText('Dining Party Size')).toBeDefined();
    expect(screen.getByText('Preferred Date')).toBeDefined();
    expect(screen.getByText('Seating Time')).toBeDefined();
  });

  it('fails Step 1 validation when submitting without selecting Date & Time', async () => {
    render(<ReservationForm />);
    const detailsButton = screen.getByText('Seating Details');
    
    fireEvent.click(detailsButton);
    
    expect(await screen.findByText('Please select a dining date.')).toBeDefined();
    expect(screen.getByText('Please select a preferred seating time.')).toBeDefined();
  });

  it('fails Step 1 validation when selecting a date in the past', async () => {
    render(<ReservationForm />);
    const dateInput = screen.getByLabelText('Preferred Date');
    
    // Set date to yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    fireEvent.change(dateInput, { target: { value: yesterday.toISOString().split('T')[0] } });
    
    const detailsButton = screen.getByText('Seating Details');
    fireEvent.click(detailsButton);
    
    expect(await screen.findByText('Dining date must be today or in the future.')).toBeDefined();
  });

  it('advances to Step 2 when Date, Time and Guests are valid', async () => {
    render(<ReservationForm />);
    const dateInput = screen.getByLabelText('Preferred Date');
    const todayStr = new Date().toISOString().split('T')[0];
    
    fireEvent.change(dateInput, { target: { value: todayStr } });
    
    // Click time slot '18:30'
    const timeButton = screen.getByText('18:30');
    fireEvent.click(timeButton);
    
    const detailsButton = screen.getByText('Seating Details');
    fireEvent.click(detailsButton);
    
    // Verify Step 2 is rendered
    expect(await screen.findByText('Full Name')).toBeDefined();
    expect(screen.getByText('Email Address')).toBeDefined();
  });

  it('fails Step 2 validation when contact details are missing or malformed', async () => {
    render(<ReservationForm />);
    const dateInput = screen.getByLabelText('Preferred Date');
    const todayStr = new Date().toISOString().split('T')[0];
    
    fireEvent.change(dateInput, { target: { value: todayStr } });
    fireEvent.click(screen.getByText('18:30'));
    fireEvent.click(screen.getByText('Seating Details'));
    
    // Submit Step 2 directly
    const submitButton = await screen.findByText('Confirm Reservation');
    fireEvent.click(submitButton);
    
    expect(await screen.findByText('Full Name is required.')).toBeDefined();
    expect(screen.getByText('Email address is required.')).toBeDefined();
    expect(screen.getByText('Phone number is required.')).toBeDefined();
  });

  it('accepts successful bookings when contact details are completely valid', async () => {
    const handleSuccess = vi.fn();
    render(<ReservationForm onSuccess={handleSuccess} />);
    
    // Step 1
    fireEvent.change(screen.getByLabelText('Preferred Date'), { target: { value: new Date().toISOString().split('T')[0] } });
    fireEvent.click(screen.getByText('18:30'));
    fireEvent.click(screen.getByText('Seating Details'));
    
    // Step 2
    fireEvent.change(await screen.findByLabelText('Full Name'), { target: { value: 'Kojo Mensah' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'kojo@accra.com' } });
    fireEvent.change(screen.getByLabelText('Contact Phone Number'), { target: { value: '+233 55 123 4567' } });
    
    fireEvent.click(screen.getByText('Confirm Reservation'));
    
    await waitFor(() => {
      expect(screen.getByText('Canopy Table Secured')).toBeDefined();
    });
    
    expect(handleSuccess).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Kojo Mensah',
      email: 'kojo@accra.com',
      phone: '+233 55 123 4567'
    }));
  });
});
