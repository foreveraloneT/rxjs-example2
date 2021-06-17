const { Observable } = require('rxjs')

function ex1() {
  // Like a function which can return multiple times

  const observable = new Observable(subscriber => {
    subscriber.next(1)
    subscriber.next('hello')
    subscriber.next(true)
    subscriber.complete()
  });

  console.log('start');
  observable.subscribe((val => { console.log(val) }))
  console.log('end');
}

function ex2() {
  // And can return value asynchronously

  const observable = new Observable(subscriber => {
    subscriber.next(1)
    subscriber.next('hello')
    subscriber.next(true)
    
    setTimeout(() => {
      subscriber.next('I am from a future !')
      subscriber.complete()
    }, 3000)
  });

  console.log('start')
  observable.subscribe((val => { console.log(val) }))
  console.log('end')
}

function ex3() {
  // And can return forever

  const observable = new Observable(subscriber => {
    setInterval(() => {
      subscriber.next(new Date())
    }, 1000)
  });

  console.log('start')
  observable.subscribe((val => { console.log(val) }))
  console.log('end')
}

function ex4() {
  // You can unsubscribe every time you want

  const observable = new Observable(subscriber => {
    const interval = setInterval(() => {
      subscriber.next(new Date())
    }, 1000)

    return () => {
      console.log('good bye')
      clearInterval(interval)
    }
  });

  const subscription1 = observable.subscribe((val => { console.log('1:', val) }))
  observable.subscribe((val => { console.log('2:', val) }))

  setTimeout(() => {
    subscription1.unsubscribe()
  }, 3100)
}

function ex5_1() {
  // Observer can handle `next`, `complete` and `error` from Observable

  const observable = new Observable(subscriber => {
    subscriber.next(1)
    subscriber.next(2)
    subscriber.next(3)
    subscriber.complete()    
  });

  const observer = {
    next: x => { console.log('next:', x) },
    error: err => { console.log('error:', err) },
    complete: () => { console.log('completed !!!') },
  }

  observable.subscribe(observer)
}

function ex5_2() {
  const observable = new Observable(subscriber => {
    subscriber.next(1)
    subscriber.next(2)
    
    throw new Error('some error')
  });

  const observer = {
    next: x => { console.log('next:', x) },
    error: err => { console.log('error:', err.message) },
    complete: () => { console.log('completed !!!') },
  }

  observable.subscribe(observer)
}


(() => {
  ex1()
  // ex2()
  // ex3()
  // ex4()
  // ex5_1()
  // ex5_2()
})()