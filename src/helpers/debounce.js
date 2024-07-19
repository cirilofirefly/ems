export default function(fn, wait = 0) {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer); 
        }

        const context = this;

        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
  };
}
