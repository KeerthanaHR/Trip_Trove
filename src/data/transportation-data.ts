
export interface TransportOption {
  id: string;
  type: 'train' | 'bus';
  name: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  amenities: string[];
}

export const getTransportOptions = (
  from: string,
  to: string,
  type?: 'train' | 'bus'
): TransportOption[] => {
  const options = transportData.filter(option => 
    option.from.toLowerCase() === from.toLowerCase() && 
    option.to.toLowerCase() === to.toLowerCase() &&
    (type ? option.type === type : true)
  );
  
  return options.length > 0 ? options : generateFakeTransportOptions(from, to, type);
};

// This simulates a backend API response for routes where we don't have predefined data
const generateFakeTransportOptions = (
  from: string,
  to: string,
  type?: 'train' | 'bus'
): TransportOption[] => {
  const result: TransportOption[] = [];
  
  // Generate some train options if requested
  if (!type || type === 'train') {
    result.push(
      {
        id: `train-${from}-${to}-1`,
        type: 'train',
        name: `Karnataka Express`,
        from: from,
        to: to,
        departureTime: '07:30',
        arrivalTime: '11:45',
        duration: '4h 15m',
        price: Math.floor(Math.random() * 500) + 300,
        amenities: ['Air Conditioned', 'Catering', 'Charging Points']
      },
      {
        id: `train-${from}-${to}-2`,
        type: 'train',
        name: `Shatabdi Express`,
        from: from,
        to: to,
        departureTime: '14:15',
        arrivalTime: '18:30',
        duration: '4h 15m',
        price: Math.floor(Math.random() * 700) + 500,
        amenities: ['Air Conditioned', 'Catering', 'Charging Points', 'WiFi']
      }
    );
  }
  
  // Generate some bus options if requested
  if (!type || type === 'bus') {
    result.push(
      {
        id: `bus-${from}-${to}-1`,
        type: 'bus',
        name: `KSRTC Airavat`,
        from: from,
        to: to,
        departureTime: '08:00',
        arrivalTime: '12:30',
        duration: '4h 30m',
        price: Math.floor(Math.random() * 300) + 200,
        amenities: ['Air Conditioned', 'USB Charging', 'Reclining Seats']
      },
      {
        id: `bus-${from}-${to}-2`,
        type: 'bus',
        name: `KSRTC Sleeper`,
        from: from,
        to: to,
        departureTime: '22:00',
        arrivalTime: '05:30',
        duration: '7h 30m',
        price: Math.floor(Math.random() * 500) + 400,
        amenities: ['Air Conditioned', 'Sleeper Berths', 'Blankets', 'USB Charging']
      }
    );
  }
  
  return result;
};

// Sample predefined transport data for popular routes
export const transportData: TransportOption[] = [
  // Bangalore to Mysore
  {
    id: 'train-bangalore-mysore-1',
    type: 'train',
    name: 'Shatabdi Express',
    from: 'Bangalore',
    to: 'Mysore',
    departureTime: '11:00',
    arrivalTime: '13:10',
    duration: '2h 10m',
    price: 320,
    amenities: ['Air Conditioned', 'Meal Included', 'Charging Points', 'WiFi']
  },
  {
    id: 'train-bangalore-mysore-2',
    type: 'train',
    name: 'Chamundi Express',
    from: 'Bangalore',
    to: 'Mysore',
    departureTime: '06:15',
    arrivalTime: '09:30',
    duration: '3h 15m',
    price: 150,
    amenities: ['Reserved Seating', 'Catering Available']
  },
  {
    id: 'bus-bangalore-mysore-1',
    type: 'bus',
    name: 'KSRTC Airavat Club Class',
    from: 'Bangalore',
    to: 'Mysore',
    departureTime: '08:00',
    arrivalTime: '11:00',
    duration: '3h 00m',
    price: 280,
    amenities: ['Air Conditioned', 'Reclining Seats', 'USB Charging']
  },
  {
    id: 'bus-bangalore-mysore-2',
    type: 'bus',
    name: 'KSRTC Rajahamsa',
    from: 'Bangalore',
    to: 'Mysore',
    departureTime: '07:30',
    arrivalTime: '10:45',
    duration: '3h 15m',
    price: 230,
    amenities: ['Air Conditioned', 'Reclining Seats']
  },
  
  // Bangalore to Hampi
  {
    id: 'train-bangalore-hampi-1',
    type: 'train',
    name: 'Hampi Express',
    from: 'Bangalore',
    to: 'Hampi',
    departureTime: '22:00',
    arrivalTime: '06:30',
    duration: '8h 30m',
    price: 450,
    amenities: ['Sleeper Berths', 'Pantry Car']
  },
  {
    id: 'bus-bangalore-hampi-1',
    type: 'bus',
    name: 'KSRTC Airavat Sleeper',
    from: 'Bangalore',
    to: 'Hampi',
    departureTime: '21:30',
    arrivalTime: '07:00',
    duration: '9h 30m',
    price: 650,
    amenities: ['Air Conditioned', 'Sleeper Berths', 'Blankets', 'USB Charging']
  },
  
  // Bangalore to Coorg
  {
    id: 'bus-bangalore-coorg-1',
    type: 'bus',
    name: 'KSRTC Airavat',
    from: 'Bangalore',
    to: 'Coorg',
    departureTime: '22:30',
    arrivalTime: '05:00',
    duration: '6h 30m',
    price: 550,
    amenities: ['Air Conditioned', 'Reclining Seats', 'USB Charging']
  },
  {
    id: 'bus-bangalore-coorg-2',
    type: 'bus',
    name: 'KSRTC Rajahamsa',
    from: 'Bangalore',
    to: 'Coorg',
    departureTime: '23:00',
    arrivalTime: '05:45',
    duration: '6h 45m',
    price: 450,
    amenities: ['Air Conditioned', 'Reclining Seats']
  }
];

// Calculate distances between destinations (in km)
export const getDistance = (from: string, to: string): number => {
  const distances: Record<string, Record<string, number>> = {
    "Bangalore": {
      "Mysore": 143,
      "Hampi": 340,
      "Coorg": 265,
      "Badami": 450,
      "Gokarna": 485,
      "Bandipur": 220
    },
    "Mysore": {
      "Bangalore": 143,
      "Coorg": 120,
      "Bandipur": 80,
      "Hampi": 480
    },
    "Hampi": {
      "Bangalore": 340,
      "Badami": 140,
      "Gokarna": 355
    },
    "Coorg": {
      "Bangalore": 265,
      "Mysore": 120
    },
    "Badami": {
      "Bangalore": 450,
      "Hampi": 140
    },
    "Gokarna": {
      "Bangalore": 485,
      "Hampi": 355
    },
    "Bandipur": {
      "Bangalore": 220,
      "Mysore": 80
    }
  };
  
  // Try to get the direct distance
  if (distances[from]?.[to]) {
    return distances[from][to];
  }
  
  // Try reverse lookup
  if (distances[to]?.[from]) {
    return distances[to][from];
  }
  
  // Return a default estimate based on Karnataka geography
  return 300; // average distance in Karnataka
};

// Calculate approximate travel times (in hours)
export const getTravelTime = (
  from: string, 
  to: string, 
  mode: 'car' | 'train' | 'bus'
): number => {
  const distance = getDistance(from, to);
  
  // Average speeds in km/h
  const speeds = {
    car: 60,
    train: 70,
    bus: 50
  };
  
  return Math.round((distance / speeds[mode]) * 10) / 10;
};
