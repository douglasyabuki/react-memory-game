import card1 from '../assets/card1.jpg'

export function getImageSrc(value: number): string {
    return (`./assets/card` + value + `.jpg`);
}