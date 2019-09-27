# woff2-wasm
WebAssembly build of [woff2](https://github.com/google/woff2) 

- this version works on the web , look at the example folder that uses webpack and node's modules .
- this only supports converting from woff2 to ttf for now .
#Example
--------
```js
module.onRuntimeInitialized = () => {
    fetch('Arial.woff2').then((x) => {
        x.arrayBuffer().then(buffer => {
            let viewBuf = new Uint8Array(buffer)
            const ttfbuff = module.woff2_dec(viewBuf, viewBuf.byteLength);
           const ttfarr= convertFromVecToUint8arr(ttfbuff)
           console.log("ttf font as uint8array!: ")
            console.log(ttfarr)
        })
        })
    }
```
