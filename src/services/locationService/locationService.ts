import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';

class LocationService {
  subscription: Location.LocationSubscription | null = null;
  listeners = [];

  checkSubscription(): boolean {
    return Boolean(this.subscription);
  }

  async startWatching(): Promise<void> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    console.log('startWatching');

    this.subscription = await Location.watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 15 * 1000,
        distanceInterval: 20
      },
      (location) => {
        console.log('location: ', location);
        this.listeners.forEach((listener) => listener(location));
      }
    );
  }

  stopWatching() {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
  }

  resetService() {
    this.stopWatching();

    if (this.listeners.length) {
      this.listeners = [];
    }
  }

  subscribe(listener: Location.LocationCallback) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

export const locationService = new LocationService();
