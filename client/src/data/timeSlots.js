export const generateTimeSlots = () => {
    const today = new Date();
    const slots = [];
    
    // Generate slots for next 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const daySlots = {
        date: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
        times: []
      };
      
      // Generate time slots from 8AM to 6PM with 2 hour intervals
      for (let hour = 8; hour <= 18; hour += 2) {
        const timeString = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
        daySlots.times.push({
          display: timeString,
          value: `${date.toISOString().split('T')[0]}T${hour.toString().padStart(2, '0')}:00:00`
        });
      }
      
      slots.push(daySlots);
    }
    
    return slots;
  };