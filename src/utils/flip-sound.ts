// Setting audio on public to a const
const audio = new Audio ("/card-flip.mp3")

// Exporting the sound player
export const flipSound = () => {
    audio.play();
}