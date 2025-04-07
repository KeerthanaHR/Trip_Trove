
import { allDestinations, Destination } from '@/data/karnataka-destinations';
import { Place } from '@/utils/routeCalculator';

export function destinationsToPlaces(destinationsList: Destination[]): Place[] {
  return destinationsList.map(dest => ({
    id: dest.id,
    name: dest.name,
    lat: dest.location.lat,
    lng: dest.location.lng
  }));
}

export function getDistance(from: string, to: string): number {
  // This is a mock implementation as we don't have actual distance data
  // In a real application, this would call a service like Google Maps Distance Matrix API
  
  // For demonstration purposes, create a distance matrix with some plausible values
  const distanceMatrix: { [key: string]: { [key: string]: number } } = {
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
    }
  };
  
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

export function getAllPlaces(): Place[] {
  return destinationsToPlaces(allDestinations);
}
