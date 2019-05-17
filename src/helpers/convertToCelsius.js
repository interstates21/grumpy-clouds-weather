export default function convertToC(f) {
    let n = Math.floor((5 / 9) * (f - 32));
    return n > 0 ? `+${n}` : n;
}
