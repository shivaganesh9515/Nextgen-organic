'use client';

import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { DeliverySlot } from '../../lib/types';
import { Button } from '../ui/Button';

interface DeliverySlotSelectorProps {
  onSelectSlot: (slot: DeliverySlot) => void;
}

export const DeliverySlotSelector: React.FC<DeliverySlotSelectorProps> = ({ onSelectSlot }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Generate next 7 days
  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  // Time slots (every 2 hours from 8 AM to 8 PM)
  const timeSlots = [
    '08:00 - 10:00',
    '10:00 - 12:00',
    '12:00 - 14:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
    '18:00 - 20:00',
  ];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const slot: DeliverySlot = {
        id: `${selectedDate}-${selectedTime}`,
        date: selectedDate,
        time: selectedTime,
        fee: selectedTime.includes('08:00') ? 0 : 20, // Free delivery for morning slots
      };
      onSelectSlot(slot);
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Select Delivery Slot</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date Selection */}
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Date
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {getNextDays().map((date, index) => {
              const dateStr = date.toISOString().split('T')[0];
              const isSelected = selectedDate === dateStr;
              const isToday = index === 0;
              
              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`p-2 text-center rounded-md border ${
                    isSelected 
                      ? 'bg-primary-600 text-white border-primary-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  aria-label={`Select delivery date: ${date.toLocaleDateString()}`}
                >
                  <div className="text-xs font-medium">
                    {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-sm">
                    {date.getDate()}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Time Selection */}
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Time
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 text-center rounded-md border ${
                    isSelected 
                      ? 'bg-primary-600 text-white border-primary-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  aria-label={`Select delivery time: ${time}`}
                >
                  {time}
                  {time.includes('08:00') && (
                    <div className="text-xs text-green-600">(Free Delivery)</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Button
          onClick={handleConfirm}
          disabled={!selectedDate || !selectedTime}
          className="w-full"
        >
          Confirm Delivery Slot
        </Button>
      </div>
    </div>
  );
};