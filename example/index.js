import wofftwo from '../wofftwo.js';
import wofftwo2Module from '../wofftwo.wasm';

const module = wofftwo({
    locateFile(path) {
        if (path.endsWith('.wasm')) {
            return wofftwo2Module;
        }
        return path;
    }
});

const convertFromVecToUint8arr=(vec)=>{
    let ttfarr = []
    for (let i = 0; i < vec.size(); i++) {
        ttfarr.push(vec.get(i))

    }
    return ttfarr
}

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
