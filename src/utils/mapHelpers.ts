
import { Destination } from "@/data/karnataka-destinations";
import { Place } from "@/utils/routeCalculator";

// Convert Destination objects to Place objects required by route calculator functions
export function destinationsToPlaces(destinations: Destination[]): Place[] {
  return destinations.map(destination => ({
    id: destination.id,
    name: destination.name,
    lat: destination.location.lat,
    lng: destination.location.lng
  }));
}

// Helper function to get the distance between two places by name
export function getDistance(from: string, to: string): number {
  // This is a simplified version - in a real app you'd have actual distance data
  // These are rough estimates of distances between popular Karnataka destinations in km
  const distances: Record<string, Record<string, number>> = {
    "Bangalore": {
      "Hampi": 340,
      "Mysore Palace": 145,
      "Badami Cave Temples": 450,
      "Coorg": 260,
      "Gokarna": 480,
      "Bandipur National Park": 220
    },
    "Hampi": {
      "Bangalore": 340,
      "Mysore Palace": 420,
      "Badami Cave Temples": 140,
      "Coorg": 560,
      "Gokarna": 320,
      "Bandipur National Park": 520
    },
    "Mysore Palace": {
      "Bangalore": 145,
      "Hampi": 420,
      "Badami Cave Temples": 530,
      "Coorg": 120,
      "Gokarna": 560,
      "Bandipur National Park": 80
    },
    "Badami Cave Temples": {
      "Bangalore": 450,
      "Hampi": 140,
      "Mysore Palace": 530,
      "Coorg": 640,
      "Gokarna": 280,
      "Bandipur National Park": 610
    },
    "Coorg": {
      "Bangalore": 260,
      "Hampi": 560,
      "Mysore Palace": 120,
      "Badami Cave Temples": 640,
      "Gokarna": 420,
      "Bandipur National Park": 160
    },
    "Gokarna": {
      "Bangalore": 480,
      "Hampi": 320,
      "Mysore Palace": 560,
      "Badami Cave Temples": 280,
      "Coorg": 420,
      "Bandipur National Park": 630
    },
    "Bandipur National Park": {
      "Bangalore": 220,
      "Hampi": 520,
      "Mysore Palace": 80,
      "Badami Cave Temples": 610,
      "Coorg": 160,
      "Gokarna": 630
    }
  };
  
  // Check if we have the distance data
  if (distances[from] && distances[from][to]) {
    return distances[from][to];
  } else if (distances[to] && distances[to][from]) {
    return distances[to][from];
  } else {
    // Return an estimate if specific distance isn't available
    return 200; // Default fallback distance in km
  }
}
