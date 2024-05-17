import { useGetPortfolioDetails } from "../../../portfolio/useGetPortfolioDetails";

export const usePhotos = () => {
    const breakpoints = [3840, 2400, 1080, 640, 384, 256, 128, 96, 64, 48];

const unsplashLink = (id, width, height) =>
    `https://source.unsplash.com/${id}/${width}x${height}`;

const unsplashPhotos = [
    { id: "8gVv6nxq6gY", width: 1080, height: 800 },
    // ... (rest of the unsplashPhotos)
];

const userId = sessionStorage.getItem("userId");
const token = sessionStorage.getItem("token");
const { portfolioDetails } = useGetPortfolioDetails(token, userId);

const photos = portfolioDetails?.galleryImages.map((photo) => {
    // const width = breakpoints[0];
    // const height = (photo.height / photo.width) * width;

    return {
        src: photo,
        // width,
        // height,
        // srcSet: breakpoints.map((breakpoint) => {
        //     const height = Math.round((photo.height / photo.width) * breakpoint);
        //     return {
        //         src: photo,
        //         width: breakpoint,
        //         height,
        //     };
        // }),
    };
});

return { photos }
}