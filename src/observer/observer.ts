type Subscriber = (msg: string) => void;

class Observer {
    private subscribers: Subscriber[] = [];
    subscribe(subscriber: (msg: string) => void) {
        this.subscribers.push(subscriber); // receives the subscriber function
    }

    // Method to publish updates to all subscribers
    notify(msg: string) {
        this.subscribers.forEach(subscriber => subscriber(msg));
    }
}

// Create a single instance of Observer
export const counterObserver = new Observer();
