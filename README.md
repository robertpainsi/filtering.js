# filtering.js

### \> Under construction \<

This library is currently usable but still under construction. The filtering algorithm is fully implemented but design and tests need improvement, and options and callbacks need to be added. This may change the API interface in the future.

### What is filtering.js?

! Explain

![Preview](https://github.com/robertpainsi/filtering.js/blob/main/assets/preview.gif?raw=true)<br>
*(Source: [readme-preview.html](https://github.com/robertpainsi/filtering.js/blob/main/examples/readme-preview.html))*


### Performance?


- Having _100 items_ in _4 groups_ with a total of _24 filters_, filtering takes 3ms in worst case.
- Having _1000 items_ in _4 groups_ with a total of _49 filters_, filtering takes 15ms in worst case.

! Add table to show how the number of items, groups and filters affect the overall runtime.

! Difference to other libraries?

- :zap: fast by using ES6 features supported by modern browsers
- :ant: 5.7kB small
- :baby: Easy to set up and use
- :battery: Parse filter structure and items directly from HTML

! How to use?

! Initialize
- Parsed from html 
  - state selected/active/disabled
- JavaScript object

! Filter
- Trigger
- Pre-filter

! API
- Options
- Result
- Functions
- Callbacks
