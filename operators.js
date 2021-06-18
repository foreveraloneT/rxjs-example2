const { interval, race, of, concat } = require('rxjs')
const { take, map } = require('rxjs/operators')

function ex1() {
  // creation operator example
  const observable = interval(1000)

  observable.subscribe((val) => { console.log(val) })
}

function ex2() {
  // Piping operator example
  const observable = interval(1000) // will emit 0,1,2,3,... every 1000 ms
    .pipe(
      take(4), // take only 4 emitted
      map(i => i * 10),
    )

  observable.subscribe((val) => { console.log(val) })
  // result 0, 10, 20, 30
}

function ex3() {
  // The resulting observable will forward all notifications, including error and completion, from the "winning" source observable
  const o1 = interval(1000).pipe(take(2))
  const o2 = interval(1500).pipe(take(4), map(i => (i + 1) * 100))

  race(o1, o2).subscribe((val) => { console.log(val) })
}

function ex4() {
  const o1 = interval(1000)
  const o2 = of('a', 'b', 'c')

  concat(o1, o2).subscribe((val) => { console.log(val) })
}

(() => {
  // ex1()
  // ex2()
  // ex3()
  ex4()
})()