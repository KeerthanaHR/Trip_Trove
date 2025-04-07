
// A simple implementation of a route calculation algorithm
// In a real application, this would use a more sophisticated algorithm like Dijkstra's

import { getDistance } from '@/data/transportation-data';

export interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

// Renamed to match the import in SchoolCollegeTrips.tsx
export function optimizeRoute(places: Place[]): Place[] {
  // If fewer than 3 places, just return the original order
  if (places.length < 3) return places;
  
  // Start with the first place as fixed
  const startPlace = places[0];
  const placesToVisit = places.slice(1);
  
  // Simple nearest neighbor algorithm
  const optimizedRoute: Place[] = [startPlace];
  let currentPlace = startPlace;
  
  while (placesToVisit.length > 0) {
    let nearestIndex = 0;
    let shortestDistance = Infinity;
    
    // Find the nearest unvisited place
    for (let i = 0; i < placesToVisit.length; i++) {
      const distance = getDistance(currentPlace.name, placesToVisit[i].name);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestIndex = i;
      }
    }
    
    // Add the nearest place to our route
    const nextPlace = placesToVisit[nearestIndex];
    optimizedRoute.push(nextPlace);
    currentPlace = nextPlace;
    
    // Remove the visited place from the unvisited list
    placesToVisit.splice(nearestIndex, 1);
  }
  
  return optimizedRoute;
}

export function calculateTotalDistance(route: Place[]): number {
  if (route.length < 2) return 0;
  
  let totalDistance = 0;
  for (let i = 0; i < route.length - 1; i++) {
    totalDistance += getDistance(route[i].name, route[i + 1].name);
  }
  
  return totalDistance;
}

export function estimateTotalTravelTime(route: Place[], mode: 'car' | 'train' | 'bus'): number {
  // Average speeds in km/h
  const speeds: Record<string, number> = {
    car: 60,
    train: 70,
    bus: 50
  };
  
  const distance = calculateTotalDistance(route);
  return Math.round((distance / speeds[mode]) * 10) / 10;
}
