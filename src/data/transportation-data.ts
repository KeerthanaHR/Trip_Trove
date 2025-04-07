// This file contains sample transportation data for Karnataka destinations

interface DistanceMap {
  [key: string]: { [key: string]: number };
}

// A matrix of approximate distances between major destinations in Karnataka
const distanceMatrix: DistanceMap = {
  "Hampi": {
    "Hampi": 0,
    "Mysore Palace": 450,
    "Badami Cave Temples": 140,
    "Coorg": 500,
    "Gokarna": 280,
    "Bandipur National Park": 520,
    "Jog Falls": 220,
    "Chikmagalur": 320,
    "Murudeshwar": 330,
    "Udupi": 380,
    "Belur": 340,
    "Halebidu": 350,
    "Pattadakal": 130,
    "Aihole": 120,
    "Kudremukh": 370,
    "Kabini": 530
  },
  "Mysore Palace": {
    "Hampi": 450,
    "Mysore Palace": 0,
    "Badami Cave Temples": 480,
    "Coorg": 110,
    "Gokarna": 520,
    "Bandipur National Park": 80,
    "Jog Falls": 370,
    "Chikmagalur": 180,
    "Murudeshwar": 420,
    "Udupi": 350,
    "Belur": 150,
    "Halebidu": 160,
    "Pattadakal": 470,
    "Aihole": 460,
    "Kudremukh": 230,
    "Kabini": 70
  },
  "Badami Cave Temples": {
    "Hampi": 140,
    "Mysore Palace": 480,
    "Badami Cave Temples": 0,
    "Coorg": 530,
    "Gokarna": 250,
    "Bandipur National Park": 540,
    "Jog Falls": 190,
    "Chikmagalur": 350,
    "Murudeshwar": 290,
    "Udupi": 320,
    "Belur": 370,
    "Halebidu": 380,
    "Pattadakal": 30,
    "Aihole": 40,
    "Kudremukh": 390,
    "Kabini": 550
  },
  "Coorg": {
    "Hampi": 500,
    "Mysore Palace": 110,
    "Badami Cave Temples": 530,
    "Coorg": 0,
    "Gokarna": 370,
    "Bandipur National Park": 150,
    "Jog Falls": 300,
    "Chikmagalur": 150,
    "Murudeshwar": 320,
    "Udupi": 240,
    "Belur": 170,
    "Halebidu": 180,
    "Pattadakal": 520,
    "Aihole": 510,
    "Kudremukh": 170,
    "Kabini": 140
  },
  "Gokarna": {
    "Hampi": 280,
    "Mysore Palace": 520,
    "Badami Cave Temples": 250,
    "Coorg": 370,
    "Gokarna": 0,
    "Bandipur National Park": 490,
    "Jog Falls": 130,
    "Chikmagalur": 250,
    "Murudeshwar": 70,
    "Udupi": 150,
    "Belur": 290,
    "Halebidu": 300,
    "Pattadakal": 240,
    "Aihole": 230,
    "Kudremukh": 200,
    "Kabini": 500
  },
  "Bandipur National Park": {
    "Hampi": 520,
    "Mysore Palace": 80,
    "Badami Cave Temples": 540,
    "Coorg": 150,
    "Gokarna": 490,
    "Bandipur National Park": 0,
    "Jog Falls": 360,
    "Chikmagalur": 190,
    "Murudeshwar": 410,
    "Udupi": 330,
    "Belur": 170,
    "Halebidu": 180,
    "Pattadakal": 530,
    "Aihole": 520,
    "Kudremukh": 230,
    "Kabini": 50
  },
  "Jog Falls": {
    "Hampi": 220,
    "Mysore Palace": 370,
    "Badami Cave Temples": 190,
    "Coorg": 300,
    "Gokarna": 130,
    "Bandipur National Park": 360,
    "Jog Falls": 0,
    "Chikmagalur": 170,
    "Murudeshwar": 160,
    "Udupi": 190,
    "Belur": 200,
    "Halebidu": 210,
    "Pattadakal": 180,
    "Aihole": 170,
    "Kudremukh": 150,
    "Kabini": 380
  }
};

// Function to get distance between two destinations
export function getDistance(from: string, to: string): number {
  // Get closest matching names if exact match not found
  const getClosestName = (name: string): string => {
    const names = Object.keys(distanceMatrix);
    
    // First try exact match
    if (names.includes(name)) return name;
    
    // Try case-insensitive match
    const lowerName = name.toLowerCase();
    for (const key of names) {
      if (key.toLowerCase() === lowerName) return key;
    }
    
    // Try matching substring
    for (const key of names) {
      if (key.includes(name) || name.includes(key)) return key;
    }
    
    // If no match, return the first name as fallback
    return names[0];
  };
  
  const fromKey = getClosestName(from);
  const toKey = getClosestName(to);
  
  // If we have a value in our matrix, return it
  if (distanceMatrix[fromKey] && distanceMatrix[fromKey][toKey] !== undefined) {
    return distanceMatrix[fromKey][toKey];
  }
  
  // Otherwise generate a random but reasonable distance
  // This would be replaced by actual distances in a real app
  return Math.floor(Math.random() * 400) + 50;
}

// Function to get estimated travel time based on mode of transport
export function getTravelTime(distance: number, mode: 'car' | 'bus' | 'train'): number {
  const speeds: Record<string, number> = {
    car: 60,  // km/h
    bus: 45,  // km/h
    train: 70 // km/h
  };
  
  return Math.round((distance / speeds[mode]) * 10) / 10; // Hours, rounded to 1 decimal
}

// Transportation options for Karnataka
export const transportationOptions = [
  {
    mode: "Bus",
    description: "KSRTC (Karnataka State Road Transport Corporation) operates extensive bus services connecting all major destinations in Karnataka.",
    advantages: ["Affordable", "Extensive network", "Regular schedules"],
    disadvantages: ["Can be crowded", "Limited legroom on regular services"],
    tips: "For mountainous regions like Coorg and Chikmagalur, opt for the 'Airavat' or 'Club Class' services for more comfort."
  },
  {
    mode: "Train",
    description: "Indian Railways connects major cities in Karnataka. Popular routes include Bengaluru-Mysuru, Bengaluru-Hubballi, and coastal lines.",
    advantages: ["Comfortable for long distances", "Scenic routes", "Affordable"],
    disadvantages: ["Limited connectivity to some tourist spots", "Advance booking recommended"],
    tips: "The Bengaluru-Mysuru route is well-serviced with multiple trains daily. The coastal route from Mangaluru to Karwar offers beautiful views."
  },
  {
    mode: "Car Rental",
    description: "Self-drive car rentals are available in major cities, offering flexibility to explore at your own pace.",
    advantages: ["Flexibility", "Convenience", "Privacy"],
    disadvantages: ["Higher cost", "Navigation challenges in remote areas"],
    tips: "Apps like Zoomcar, Revv, and Myles offer self-drive options. Always keep offline maps downloaded for areas with poor connectivity."
  },
  {
    mode: "Taxi/Cab",
    description: "Taxis and cabs can be hired for intercity travel and local sightseeing in Karnataka.",
    advantages: ["Door-to-door service", "Local driver knowledge", "Convenience"],
    disadvantages: ["Higher cost for solo travelers", "Quality of service can vary"],
    tips: "For hill stations and wildlife reserves, consider booking a 4WD vehicle. Negotiate and fix the rate before starting your journey."
  },
  {
    mode: "Air",
    description: "Karnataka has airports in Bengaluru, Mangaluru, Hubballi, Belagavi, and Mysuru, connecting to various parts of India.",
    advantages: ["Time-saving for long distances", "Comfortable"],
    disadvantages: ["Limited connectivity to smaller destinations", "Higher cost"],
    tips: "Bengaluru airport is the major hub. For visiting North Karnataka destinations like Hampi, flying to Hubballi can save time."
  }
];
