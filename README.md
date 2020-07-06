# Nodejs + rxjs + typescript - batch processing

### Benchmarks
1. async await (for loop)
* Run 1/3 took 5474ms
* Run 2/3 took 5387ms
* Run 3/3 took 5401ms
* Avg: 5421ms

---

2. promise all
* Run 1/3 took 2756ms
* Run 2/3 took 2784ms
* Run 3/3 took 2733ms
* Avg: 2758ms

---

3. observable (simple)
* Run 1/3 took 2789ms
* Run 2/3 took 2748ms
* Run 3/3 took 2783ms
* Avg: 2773ms

---

4. observable (improved)
* Run 1/3 took 952ms
* Run 2/3 took 948ms
* Run 3/3 took 953ms
* Avg: 951ms


---

5. Comparisons
* promise all vs async awai (for loop) - speed-up: 1.97x
* observable (simple) vs promise all - speed-up: 0.99x
* observable (improved) vs async await (for loop) - speed-up: 5.70x
* observable (improved) vs promise all - speed-up: 2.90x