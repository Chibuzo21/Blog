import Dog1 from "../../../public/images/dog1.png";
import Dog2 from "../../../public/images/dog2.png";
import Dog3 from "../../../public/images/dog3.png";
import Dog4 from "../../../public/images/dog4.png";
import Image from "next/image";
export default function Photos() {
  const images1 = [Dog1, Dog2];
  const images2 = [Dog3, Dog4];

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-5">My Photos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {images1.map((image, index) => (
          // object cover is used to specify how an image, video, or other media should be resized to fit its container, the image scales to fit to completely fill the div. if the aspect ratio of the image doesn't match the container, the image is cropped, ensuring no blank spaces are available
          <div key={index} className="h-60 md:h-96 overflow-hidden relative">
            <Image
              src={image}
              className="object-cover w-full h-full"
              alt="Picture of a Dog"
              placeholder="blur"
              // placeholder is used to create a placeholder before the image is downloaded completely, in this example, blur effect is shown before the images completes loading.
              quality={50}
              // quality is the image quality you can increase or decrease its quality, also the higher the quality the higher the bandwidth(image size) and vice versa
              priority={true}
              // priority means that these are the images that will be loaded first before the next ones
              fill
              // fill ensures the image covers its parent container, for it to work, the parent container must be given a position of "relative"
              sizes="(max-width:768px) 100vw,50vw"
              // sizes is used to create responsive images. so at screen of 768px and below its width will be 100vw, anything more than that will have a width of 50vw, for th
            />
          </div>
        ))}
        {images2.map((image, index) => (
          // object cover is used to specify how an image, video, or other media should be resized to fit its container, the image scales to fit to completely fill the div. if the aspect ratio of the image doesn't match the container, the image is cropped, ensuring no blank spaces are available
          <div key={index} className="h-60 md:h-96 overflow-hidden relative">
            <Image
              src={image}
              className="object-cover w-full h-full"
              alt="Picture of a Dog"
              fill
              // fill ensures the image covers its parent container, for it to work, the parent container must be given a position of "relative"
              sizes="(max-width:768px) 100vw,50vw"
              // sizes is used to create responsive images. so at screen of 768px and below its width will be 100vw, anything more than that will have a width of 50vw, for th
            />
          </div>
        ))}
      </div>
    </main>
  );
}
