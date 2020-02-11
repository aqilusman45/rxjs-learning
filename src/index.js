import { Observable } from "rxjs";
import { map } from "rxjs/operators";

// Implementation Similar to Promises

const observable = new Observable((observer)=>{
    setTimeout(() => {
        observer.next({
            msg: "driver found"
        })
    }, 2000);
})

// Similar to Promises Observable Return the value
// at the end of an async function
observable.subscribe((value)=>{
    console.log("promise like",value);
})


// But what really makes rxjs special is that we can subscribe 
// the endpoint and continue to listen its responses

const interval = new Observable((observable)=>{
        let count = 0
        // setinterval runs after each
        const interval = setInterval(() => {
            // observable returns count
            observable.next(count++)
        }, 500);

        return ()=>{
            clearInterval(interval)
        }
})
// we can use operators and pipe them the values before using them
const subscription = interval.pipe(map(value=>value*value)).subscribe(value => console.log(value))


// now to end the connection we must unsubscribe
// the observable

setTimeout(() => {
    subscription.unsubscribe();
}, 3000);
