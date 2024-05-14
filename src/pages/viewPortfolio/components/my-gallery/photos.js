const breakpoints = [3840, 2400, 1080, 640, 384, 256, 128, 96, 64, 48];

const unsplashLink = (id, width, height) =>
    `https://source.unsplash.com/${id}/${width}x${height}`;

const unsplashPhotos = [
    { id: "8gVv6nxq6gY", width: 1080, height: 800 },
    // ... (rest of the unsplashPhotos)
];

const photos = unsplashPhotos.map((photo) => {
    const width = breakpoints[0];
    const height = (photo.height / photo.width) * width;

    return {
        src: unsplashLink(photo.id, width, height),
        width,
        height,
        srcSet: breakpoints.map((breakpoint) => {
            const height = Math.round((photo.height / photo.width) * breakpoint);
            return {
                src: unsplashLink(photo.id, breakpoint, height),
                width: breakpoint,
                height,
            };
        }),
    };
});

// function Gallery() {
//     return (
//         <div>
//             {photos.map((photo, index) => (
//                 <img
//                     key={index}
//                     src={photo.src}
//                     width={photo.width}
//                     height={photo.height}
//                     alt={`Unsplash Photo ${index}`}
//                 />
//             ))}
//         </div>
//     );
// }

export default photos;
